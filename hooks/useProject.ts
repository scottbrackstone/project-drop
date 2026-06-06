import { useCallback } from 'react';

import { getProject } from '@/lib/data/projects';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import type { Project } from '@/types/project';

interface UseProjectResult {
  project: Project | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useProject(projectId: string | undefined): UseProjectResult {
  const fetcher = useCallback(async () => {
    if (!projectId) return null;
    return getProject(projectId);
  }, [projectId]);

  const { data, loading, error, refresh } = useAsyncResource(fetcher, {
    enabled: Boolean(projectId),
  });

  return { project: data, loading, error, refresh };
}
