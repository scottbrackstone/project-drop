import { mockTranscribeAudio } from '@/lib/transcription/mockTranscriber';
import {
  isTranscriptionConfigured,
  transcribeWithRemote,
} from '@/lib/transcription/transcriptionProvider';
import type { TranscriptionResult } from '@/types/ai';

export async function transcribeAudio(audioUri: string): Promise<TranscriptionResult> {
  const trimmedUri = audioUri.trim();
  if (!trimmedUri) {
    throw new Error('A recording is required before transcription.');
  }

  if (isTranscriptionConfigured()) {
    return transcribeWithRemote(trimmedUri);
  }

  return mockTranscribeAudio(trimmedUri);
}
