import { useCallback } from 'react';

import { listProjectsWithStats } from '@/lib/data/projects';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import type { ProjectWithStats } from '@/types/project';

interface UseProjectsResult {
  projects: ProjectWithStats[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useProjects(): UseProjectsResult {
  const fetcher = useCallback(() => listProjectsWithStats(), []);

  const { data, loading, error, refresh } = useAsyncResource(fetcher);

  return {
    projects: data ?? [],
    loading,
    error,
    refresh,
  };
}
