import { useCallback, useRef, useState } from 'react';

import { createTextNote } from '@/lib/data/notes';
import { getErrorMessage } from '@/lib/utils/errors';
import type { CreateTextNoteResult } from '@/types/note';

interface UseCreateTextNoteOptions {
  onSuccess?: (result: CreateTextNoteResult) => void | Promise<void>;
}

interface UseCreateTextNoteResult {
  create: (transcript: string) => Promise<CreateTextNoteResult | null>;
  submitting: boolean;
  error: string | null;
  clearError: () => void;
}

export function useCreateTextNote(
  projectId: string | undefined,
  options: UseCreateTextNoteOptions = {},
): UseCreateTextNoteResult {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onSuccessRef = useRef(options.onSuccess);
  onSuccessRef.current = options.onSuccess;

  const create = useCallback(
    async (transcript: string): Promise<CreateTextNoteResult | null> => {
      if (!projectId) return null;

      setSubmitting(true);
      setError(null);

      try {
        const result = await createTextNote(projectId, transcript);
        await onSuccessRef.current?.(result);
        return result;
      } catch (err) {
        setError(getErrorMessage(err));
        return null;
      } finally {
        setSubmitting(false);
      }
    },
    [projectId],
  );

  const clearError = useCallback(() => setError(null), []);

  return { create, submitting, error, clearError };
}
