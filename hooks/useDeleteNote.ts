import { useCallback, useRef, useState } from 'react';

import { deleteNote } from '@/lib/data/notes';
import { getErrorMessage } from '@/lib/utils/errors';

interface UseDeleteNoteOptions {
  onSuccess?: () => void | Promise<void>;
}

interface UseDeleteNoteResult {
  remove: (noteId: string) => Promise<boolean>;
  deletingNoteId: string | null;
  error: string | null;
  clearError: () => void;
}

export function useDeleteNote(options: UseDeleteNoteOptions = {}): UseDeleteNoteResult {
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const onSuccessRef = useRef(options.onSuccess);
  onSuccessRef.current = options.onSuccess;

  const remove = useCallback(async (noteId: string): Promise<boolean> => {
    setDeletingNoteId(noteId);
    setError(null);

    try {
      await deleteNote(noteId);
      await onSuccessRef.current?.();
      return true;
    } catch (err) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setDeletingNoteId(null);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { remove, deletingNoteId, error, clearError };
}
