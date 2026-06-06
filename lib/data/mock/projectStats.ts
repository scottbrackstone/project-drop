import { mockCountNotesByProject } from '@/lib/data/mock/notes';
import { mockListProjects } from '@/lib/data/mock/projects';
import { mockCountOpenTasksByProject } from '@/lib/data/mock/tasks';
import type { ProjectWithStats } from '@/types/project';

export function mockListProjectsWithStats(): ProjectWithStats[] {
  return mockListProjects().map((project) => ({
    ...project,
    noteCount: mockCountNotesByProject(project.id),
    openTaskCount: mockCountOpenTasksByProject(project.id),
  }));
}
