import { useCallback } from 'react';

import { listOpenTasksByProject } from '@/lib/data/tasks';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import type { Task } from '@/types/task';

interface UseProjectTasksResult {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useProjectTasks(projectId: string | undefined): UseProjectTasksResult {
  const fetcher = useCallback(async () => {
    if (!projectId) return [];
    return listOpenTasksByProject(projectId);
  }, [projectId]);

  const { data, loading, error, refresh } = useAsyncResource(fetcher, {
    enabled: Boolean(projectId),
  });

  return {
    tasks: data ?? [],
    loading,
    error,
    refresh,
  };
}
