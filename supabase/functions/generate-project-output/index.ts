import { createClient } from 'npm:@supabase/supabase-js@2';

import { ConfigurationError, getDeepSeekApiKey, getDeepSeekModel } from './providerConfig.ts';
import { OUTPUT_SYSTEM_PROMPT, buildUserPrompt } from './prompts.ts';
import { generateWithDeepSeek } from './providers/deepseek.ts';
import { GuardrailError, type GuardrailErrorCode } from './errors.ts';
import {
  enforceRateLimits,
  getRequestFingerprint,
  recordUsageEvent,
} from './rateLimit.ts';
import { validateAndPrepareRequest } from './validation.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function errorResponse(code: GuardrailErrorCode, message: string, status: number): Response {
  return jsonResponse({ error: { code, message } }, status);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return errorResponse('INVALID_REQUEST', 'Project output request was invalid. Please try again.', 405);
  }

  try {
    const authHeader = req.headers.get('Authorization');
    const apiKeyHeader = req.headers.get('apikey');

    if (!authHeader && !apiKeyHeader) {
      return errorResponse('INVALID_REQUEST', 'Project output request was invalid. Please try again.', 401);
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !serviceRoleKey || !anonKey) {
      return errorResponse(
        'PROVIDER_ERROR',
        'The AI provider could not generate this output. Please try again.',
        500,
      );
    }

    // MVP: allow anon-key invokes without a signed-in user. Tighten before production.
    if (authHeader) {
      const userClient = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authHeader } },
      });
      await userClient.auth.getUser();
    }

    const body = await req.json();
    const validated = validateAndPrepareRequest(body);
    const fingerprintHash = await getRequestFingerprint(req);
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    await enforceRateLimits(adminClient, fingerprintHash, validated.estimatedChars);

    const result = await generateWithDeepSeek({
      apiKey: getDeepSeekApiKey(),
      model: getDeepSeekModel(),
      systemPrompt: OUTPUT_SYSTEM_PROMPT,
      userPrompt: buildUserPrompt(validated.mode, validated.contextJson),
    });

    await recordUsageEvent(adminClient, fingerprintHash, validated.estimatedChars);

    return jsonResponse({
      title: result.title,
      content: result.content,
      source: 'remote',
    });
  } catch (error) {
    if (error instanceof GuardrailError) {
      const status = error.code === 'RATE_LIMITED' ? 429 : error.code === 'REQUEST_TOO_LARGE' ? 413 : 400;
      return errorResponse(error.code, error.message, status);
    }

    if (error instanceof ConfigurationError) {
      return errorResponse(
        'PROVIDER_ERROR',
        'The AI provider could not generate this output. Please try again.',
        503,
      );
    }

    console.error('generate-project-output error:', error);
    return errorResponse(
      'PROVIDER_ERROR',
      'The AI provider could not generate this output. Please try again.',
      502,
    );
  }
});
