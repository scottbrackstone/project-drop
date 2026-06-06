import { useCallback, useState } from 'react';

import { transcribeAudio } from '@/lib/transcription/transcribeAudio';
import { getErrorMessage } from '@/lib/utils/errors';
import type { TranscriptionResult } from '@/types/ai';

interface UseTranscribeRecordingResult {
  transcribe: (audioUri: string) => Promise<TranscriptionResult | null>;
  transcribing: boolean;
  error: string | null;
  clearError: () => void;
}

export function useTranscribeRecording(): UseTranscribeRecordingResult {
  const [transcribing, setTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transcribe = useCallback(async (audioUri: string): Promise<TranscriptionResult | null> => {
    setTranscribing(true);
    setError(null);

    try {
      return await transcribeAudio(audioUri);
    } catch (err) {
      setError(getErrorMessage(err));
      return null;
    } finally {
      setTranscribing(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { transcribe, transcribing, error, clearError };
}
