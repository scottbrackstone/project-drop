import { mockPurgeProject } from '@/lib/data/mock/purgeProject';
import { AppError } from '@/lib/utils/errors';
import type { CreateProjectInput, Project } from '@/types/project';
import { generateId } from '@/lib/utils/id';
import { validateProjectDescription, validateProjectName } from '@/lib/utils/validation';

const projects = new Map<string, Project>();

export function mockListProjects(): Project[] {
  return Array.from(projects.values()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function mockGetProject(id: string): Project | null {
  return projects.get(id) ?? null;
}

export function mockCreateProject(input: CreateProjectInput): Project {
  const now = new Date().toISOString();
  const project: Project = {
    id: generateId(),
    userId: input.userId ?? null,
    name: validateProjectName(input.name),
    description: validateProjectDescription(input.description),
    status: 'active',
    createdAt: now,
    updatedAt: now,
  };

  projects.set(project.id, project);
  return project;
}

export function mockDeleteProject(projectId: string): void {
  if (!projects.has(projectId)) {
    throw new AppError('Project not found.');
  }

  mockPurgeProject(projectId);
  projects.delete(projectId);
}

export function mockResetProjects(): void {
  projects.clear();
}
