import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

import { getProject } from '@/lib/data/projects';
import {
  clearRecentProjectId,
  loadRecentProjectId,
} from '@/lib/settings/recentProject';
import { getErrorMessage } from '@/lib/utils/errors';
import type { Project } from '@/types/project';

interface UseRecentProjectResult {
  recentProject: Project | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useRecentProject(): UseRecentProjectResult {
  const [recentProject, setRecentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const projectId = await loadRecentProjectId();
      if (!projectId) {
        setRecentProject(null);
        return;
      }

      const project = await getProject(projectId);
      if (!project) {
        await clearRecentProjectId();
        setRecentProject(null);
        return;
      }

      setRecentProject(project);
    } catch (err) {
      setError(getErrorMessage(err));
      setRecentProject(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );

  return { recentProject, loading, error, refresh };
}
