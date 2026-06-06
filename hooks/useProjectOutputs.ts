import { useCallback } from 'react';

import { listProjectOutputs } from '@/lib/data/reports';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import type { ProjectOutput } from '@/types/report';

interface UseProjectOutputsResult {
  outputs: ProjectOutput[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useProjectOutputs(projectId: string | undefined): UseProjectOutputsResult {
  const fetcher = useCallback(async () => {
    if (!projectId) return [];
    return listProjectOutputs(projectId);
  }, [projectId]);

  const { data, loading, error, refresh } = useAsyncResource(fetcher, {
    enabled: Boolean(projectId),
  });

  return {
    outputs: data ?? [],
    loading,
    error,
    refresh,
  };
}
