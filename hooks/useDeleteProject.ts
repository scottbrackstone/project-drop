import { useCallback, useRef, useState } from 'react';

import { deleteProject } from '@/lib/data/projects';
import { getErrorMessage } from '@/lib/utils/errors';

interface UseDeleteProjectOptions {
  onSuccess?: () => void | Promise<void>;
}

interface UseDeleteProjectResult {
  remove: (projectId: string) => Promise<boolean>;
  deleting: boolean;
  error: string | null;
  clearError: () => void;
}

export function useDeleteProject(options: UseDeleteProjectOptions = {}): UseDeleteProjectResult {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onSuccessRef = useRef(options.onSuccess);
  onSuccessRef.current = options.onSuccess;

  const remove = useCallback(async (projectId: string): Promise<boolean> => {
    setDeleting(true);
    setError(null);

    try {
      await deleteProject(projectId);
      await onSuccessRef.current?.();
      return true;
    } catch (err) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setDeleting(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { remove, deleting, error, clearError };
}
