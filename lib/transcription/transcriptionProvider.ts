import type { TranscriptionResult } from '@/types/ai';

/**
 * Future: true when a Supabase Edge Function transcription endpoint is available.
 * Stage 4C keeps this false — no API keys on device.
 */
export function isTranscriptionConfigured(): boolean {
  return false;
}

/**
 * Future: invoke Supabase Edge Function with audio reference.
 * Stage 4C returns null so transcribeAudio falls back to mock.
 */
export async function transcribeWithRemote(_audioUri: string): Promise<TranscriptionResult | null> {
  return null;
}
