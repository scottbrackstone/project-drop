import { useCallback } from 'react';

import { listProjects } from '@/lib/data/projects';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import type { Project } from '@/types/project';

interface UseProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useProjects(): UseProjectsResult {
  const fetcher = useCallback(() => listProjects(), []);

  const { data, loading, error, refresh } = useAsyncResource(fetcher);

  return {
    projects: data ?? [],
    loading,
    error,
    refresh,
  };
}
