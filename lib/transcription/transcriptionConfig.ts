import { isSupabaseConfigured } from '@/lib/data/provider';

export const DEFAULT_TRANSCRIPTION_BUCKET = 'voice-transcription';

export function getTranscriptionBucket(): string {
  const configured = process.env.EXPO_PUBLIC_TRANSCRIPTION_BUCKET?.trim();
  return configured || DEFAULT_TRANSCRIPTION_BUCKET;
}

/**
 * Remote transcription is available when public Supabase client config exists.
 * Mock mode is used when URL or anon key are missing.
 */
export function isTranscriptionConfigured(): boolean {
  return isSupabaseConfigured();
}
