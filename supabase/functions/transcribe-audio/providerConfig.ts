export type TranscriptionProviderName = 'mistral' | 'openai';

const DEFAULT_PROVIDER: TranscriptionProviderName = 'mistral';
const DEFAULT_MISTRAL_MODEL = 'voxtral-mini-latest';
const DEFAULT_OPENAI_MODEL = 'whisper-1';
const DEFAULT_BUCKET = 'voice-transcription';

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export function getTranscriptionProvider(): TranscriptionProviderName {
  const value = Deno.env.get('TRANSCRIPTION_PROVIDER')?.trim().toLowerCase() ?? DEFAULT_PROVIDER;

  if (value === 'mistral' || value === 'openai') {
    return value;
  }

  throw new ConfigurationError(`Unknown TRANSCRIPTION_PROVIDER: ${value}`);
}

export function getVoiceTranscriptionBucket(): string {
  return Deno.env.get('VOICE_TRANSCRIPTION_BUCKET')?.trim() || DEFAULT_BUCKET;
}

export interface ProviderCredentials {
  apiKey: string;
  model: string;
}

export function resolveProviderCredentials(
  provider: TranscriptionProviderName,
): ProviderCredentials {
  if (provider === 'mistral') {
    const apiKey = Deno.env.get('MISTRAL_API_KEY');
    if (!apiKey) {
      throw new ConfigurationError('MISTRAL_API_KEY is not configured on the server.');
    }

    const model = Deno.env.get('MISTRAL_TRANSCRIPTION_MODEL')?.trim() || DEFAULT_MISTRAL_MODEL;
    return { apiKey, model };
  }

  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) {
    throw new ConfigurationError('OPENAI_API_KEY is not configured on the server.');
  }

  const model = Deno.env.get('OPENAI_TRANSCRIPTION_MODEL')?.trim() || DEFAULT_OPENAI_MODEL;
  return { apiKey, model };
}
