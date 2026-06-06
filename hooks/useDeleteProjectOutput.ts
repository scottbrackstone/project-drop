import { useCallback, useRef, useState } from 'react';

import { deleteProjectOutput } from '@/lib/data/reports';
import { getErrorMessage } from '@/lib/utils/errors';

interface UseDeleteProjectOutputOptions {
  onSuccess?: () => void | Promise<void>;
}

interface UseDeleteProjectOutputResult {
  remove: (outputId: string) => Promise<boolean>;
  deletingOutputId: string | null;
  error: string | null;
  clearError: () => void;
}

export function useDeleteProjectOutput(
  options: UseDeleteProjectOutputOptions = {},
): UseDeleteProjectOutputResult {
  const [deletingOutputId, setDeletingOutputId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const onSuccessRef = useRef(options.onSuccess);
  onSuccessRef.current = options.onSuccess;

  const remove = useCallback(async (outputId: string): Promise<boolean> => {
    setDeletingOutputId(outputId);
    setError(null);

    try {
      await deleteProjectOutput(outputId);
      await onSuccessRef.current?.();
      return true;
    } catch (err) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setDeletingOutputId(null);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { remove, deletingOutputId, error, clearError };
}
