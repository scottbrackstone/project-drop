import {
  mockCreateProject,
  mockDeleteProject,
  mockGetProject,
  mockListProjects,
} from '@/lib/data/mock/projects';
import {
  supabaseCreateProject,
  supabaseDeleteProject,
  supabaseGetProject,
  supabaseListProjects,
} from '@/lib/data/supabase/projects';
import { withDataProvider } from '@/lib/data/withProvider';
import {
  validateProjectDescription,
  validateProjectName,
} from '@/lib/utils/validation';
import type { CreateProjectInput, Project } from '@/types/project';

function normalizeCreateInput(input: CreateProjectInput): CreateProjectInput {
  return {
    ...input,
    name: validateProjectName(input.name),
    description: validateProjectDescription(input.description),
  };
}

export async function listProjects(): Promise<Project[]> {
  return withDataProvider(mockListProjects, supabaseListProjects);
}

export async function getProject(id: string): Promise<Project | null> {
  return withDataProvider(
    () => mockGetProject(id),
    () => supabaseGetProject(id),
  );
}

export async function createProject(input: CreateProjectInput): Promise<Project> {
  const normalized = normalizeCreateInput(input);
  return withDataProvider(
    () => mockCreateProject(normalized),
    () => supabaseCreateProject(normalized),
  );
}

export async function deleteProject(projectId: string): Promise<void> {
  return withDataProvider(
    () => mockDeleteProject(projectId),
    () => supabaseDeleteProject(projectId),
  );
}
