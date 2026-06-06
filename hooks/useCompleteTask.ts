import { useCallback, useRef, useState } from 'react';

import { completeTask } from '@/lib/data/tasks';
import { getErrorMessage } from '@/lib/utils/errors';
import type { Task } from '@/types/task';

interface UseCompleteTaskOptions {
  onSuccess?: (task: Task) => void | Promise<void>;
}

interface UseCompleteTaskResult {
  complete: (taskId: string) => Promise<Task | null>;
  completingTaskId: string | null;
  error: string | null;
  clearError: () => void;
}

export function useCompleteTask(options: UseCompleteTaskOptions = {}): UseCompleteTaskResult {
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const onSuccessRef = useRef(options.onSuccess);
  onSuccessRef.current = options.onSuccess;

  const complete = useCallback(async (taskId: string): Promise<Task | null> => {
    setCompletingTaskId(taskId);
    setError(null);

    try {
      const task = await completeTask(taskId);
      await onSuccessRef.current?.(task);
      return task;
    } catch (err) {
      setError(getErrorMessage(err));
      return null;
    } finally {
      setCompletingTaskId(null);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { complete, completingTaskId, error, clearError };
}
