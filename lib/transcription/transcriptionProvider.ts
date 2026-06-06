import { uploadAudioForTranscription } from '@/lib/transcription/audioUpload';
import { getSupabaseClient } from '@/lib/supabase/client';
import { AppError, toAppError } from '@/lib/utils/errors';
import type { TranscriptionResult } from '@/types/ai';

export { isTranscriptionConfigured } from '@/lib/transcription/transcriptionConfig';

interface TranscribeAudioEdgeSuccess {
  text: string;
  source: 'remote';
}

interface TranscribeAudioEdgeFailure {
  error: string;
}

function parseEdgeResponse(data: unknown): TranscriptionResult {
  if (!data || typeof data !== 'object') {
    throw new AppError('Transcription failed: empty response from server.');
  }

  if ('error' in data && typeof (data as TranscribeAudioEdgeFailure).error === 'string') {
    throw new AppError((data as TranscribeAudioEdgeFailure).error);
  }

  const success = data as TranscribeAudioEdgeSuccess;
  const text = success.text?.trim();
  if (!text) {
    throw new AppError('Transcription returned empty text.');
  }

  return {
    transcript: text,
    source: 'remote',
  };
}

/**
 * Uploads audio to Supabase Storage and invokes the transcribe-audio Edge Function.
 * Throws on failure — callers should not silently fall back to mock when configured.
 */
export async function transcribeWithRemote(audioUri: string): Promise<TranscriptionResult> {
  const { bucket, path } = await uploadAudioForTranscription(audioUri);

  const { data, error } = await getSupabaseClient().functions.invoke('transcribe-audio', {
    body: { bucket, path },
  });

  if (error) {
    throw toAppError(error);
  }

  return parseEdgeResponse(data);
}
