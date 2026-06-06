import type { TranscriptionResult } from '@/types/ai';

export const MOCK_TRANSCRIPT_TEXT =
  'Mock transcript for testing. Replace this with what you actually said before saving this voice note.';

export function mockTranscribeAudio(_audioUri: string): TranscriptionResult {
  return {
    transcript: MOCK_TRANSCRIPT_TEXT,
    source: 'mock',
  };
}
