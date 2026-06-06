import { createClient } from 'npm:@supabase/supabase-js@2';

import {
  ConfigurationError,
  getTranscriptionProvider,
  getVoiceTranscriptionBucket,
  resolveProviderCredentials,
} from './providerConfig.ts';
import { transcribeWithMistral } from './providers/mistral.ts';
import { transcribeWithOpenAi } from './providers/openai.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MIME_BY_EXTENSION: Record<string, string> = {
  m4a: 'audio/mp4',
  mp4: 'audio/mp4',
  caf: 'audio/x-caf',
  wav: 'audio/wav',
  webm: 'audio/webm',
  '3gp': 'audio/3gpp',
};

interface TranscribeAudioRequest {
  bucket?: unknown;
  path?: unknown;
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function getMimeType(extension: string): string {
  return MIME_BY_EXTENSION[extension] ?? 'audio/mp4';
}

function isValidStoragePath(path: string): boolean {
  return path.length > 0 && !path.startsWith('/') && !path.includes('..');
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
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !serviceRoleKey || !anonKey) {
      return jsonResponse({ error: 'Supabase environment is not configured.' }, 500);
    }

    const body = (await req.json()) as TranscribeAudioRequest;
    const bucket = typeof body.bucket === 'string' ? body.bucket.trim() : '';
    const path = typeof body.path === 'string' ? body.path.trim() : '';
    const allowedBucket = getVoiceTranscriptionBucket();

    if (bucket !== allowedBucket) {
      return jsonResponse({ error: 'Invalid storage bucket.' }, 400);
    }

    if (!isValidStoragePath(path)) {
      return jsonResponse({ error: 'Invalid storage path.' }, 400);
    }

    // MVP: allow anon-key invokes without a signed-in user. If a session exists,
    // getUser() may resolve a user id for future path scoping; otherwise continue
    // as anonymous (matches client upload paths under anonymous/).
    if (authHeader) {
      const userClient = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authHeader } },
      });
      await userClient.auth.getUser();
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    const { data: audioFile, error: downloadError } = await adminClient.storage
      .from(bucket)
      .download(path);

    if (downloadError || !audioFile) {
      return jsonResponse(
        { error: downloadError?.message ?? 'Could not download audio file from storage.' },
        404,
      );
    }

    const provider = getTranscriptionProvider();
    const { apiKey, model } = resolveProviderCredentials(provider);
    const extension = path.split('.').pop()?.toLowerCase() ?? 'm4a';
    const mimeType = getMimeType(extension);
    const audioBytes = await audioFile.arrayBuffer();

    const input = {
      bytes: audioBytes,
      fileName: `audio.${extension}`,
      mimeType,
      model,
      apiKey,
    };

    const text =
      provider === 'mistral'
        ? await transcribeWithMistral(input)
        : await transcribeWithOpenAi(input);

    return jsonResponse({ text, source: 'remote' });
  } catch (error) {
    if (error instanceof ConfigurationError) {
      return jsonResponse({ error: error.message }, 503);
    }

    const message = error instanceof Error ? error.message : 'Unexpected transcription error.';
    return jsonResponse({ error: message }, 500);
  }
});
