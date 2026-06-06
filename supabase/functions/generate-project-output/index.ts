import { createClient } from 'npm:@supabase/supabase-js@2';

import {
  ConfigurationError,
  getDeepSeekApiKey,
  getDeepSeekModel,
} from './providerConfig.ts';
import {
  OUTPUT_SYSTEM_PROMPT,
  buildUserPrompt,
  isValidOutputMode,
  type OutputModeName,
} from './prompts.ts';
import { generateWithDeepSeek } from './providers/deepseek.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateProjectOutputRequest {
  project?: {
    id?: unknown;
    name?: unknown;
    description?: unknown;
  };
  mode?: unknown;
  scope?: unknown;
  context?: {
    notes?: unknown;
    tasks?: unknown;
    decisions?: unknown;
    scopeFrom?: unknown;
    scopeTo?: unknown;
    scopeLabel?: unknown;
    scopeFallbackHint?: unknown;
  };
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function validateRequest(body: GenerateProjectOutputRequest): {
  mode: OutputModeName;
  contextJson: string;
} {
  const project = body.project;
  const projectId = typeof project?.id === 'string' ? project.id.trim() : '';
  const projectName = typeof project?.name === 'string' ? project.name.trim() : '';

  if (!projectId || !projectName) {
    throw new Error('Invalid project payload.');
  }

  const mode = typeof body.mode === 'string' ? body.mode.trim() : '';
  if (!isValidOutputMode(mode)) {
    throw new Error('Invalid output mode.');
  }

  const scope = typeof body.scope === 'string' ? body.scope.trim() : 'full';
  const context = body.context ?? {};

  const contextJson = JSON.stringify(
    {
      project: {
        id: projectId,
        name: projectName,
        description: typeof project?.description === 'string' ? project.description : null,
      },
      mode,
      scope,
      scopeLabel: typeof context.scopeLabel === 'string' ? context.scopeLabel : scope,
      scopeFallbackHint:
        typeof context.scopeFallbackHint === 'string' ? context.scopeFallbackHint : null,
      notes: Array.isArray(context.notes) ? context.notes : [],
      tasks: Array.isArray(context.tasks) ? context.tasks : [],
      decisions: Array.isArray(context.decisions) ? context.decisions : [],
      scopeFrom: typeof context.scopeFrom === 'string' ? context.scopeFrom : null,
      scopeTo: typeof context.scopeTo === 'string' ? context.scopeTo : null,
    },
    null,
    2,
  );

  return { mode, contextJson };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, 405);
  }

  try {
    const authHeader = req.headers.get('Authorization');
    const apiKeyHeader = req.headers.get('apikey');

    if (!authHeader && !apiKeyHeader) {
      return jsonResponse({ error: 'Missing authorization credentials.' }, 401);
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !anonKey) {
      return jsonResponse({ error: 'Supabase environment is not configured.' }, 500);
    }

    // MVP: allow anon-key invokes without a signed-in user. Tighten before production.
    if (authHeader) {
      const userClient = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authHeader } },
      });
      await userClient.auth.getUser();
    }

    const body = (await req.json()) as GenerateProjectOutputRequest;
    const { mode, contextJson } = validateRequest(body);

    const result = await generateWithDeepSeek({
      apiKey: getDeepSeekApiKey(),
      model: getDeepSeekModel(),
      systemPrompt: OUTPUT_SYSTEM_PROMPT,
      userPrompt: buildUserPrompt(mode, contextJson),
    });

    return jsonResponse({
      title: result.title,
      content: result.content,
      source: 'remote',
    });
  } catch (error) {
    if (error instanceof ConfigurationError) {
      return jsonResponse({ error: error.message }, 503);
    }

    const message = error instanceof Error ? error.message : 'Unexpected output generation error.';
    return jsonResponse({ error: message }, 500);
  }
});
