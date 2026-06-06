import { useCallback } from 'react';

import { createProject } from '@/lib/data/projects';
import type { CreateProjectInput, Project } from '@/types/project';

export function useCreateProject() {
  const create = useCallback(async (input: CreateProjectInput): Promise<Project> => {
    return createProject(input);
  }, []);

  return { create };
}
