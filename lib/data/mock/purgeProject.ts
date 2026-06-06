import { mockPurgeDecisionsByProject } from '@/lib/data/mock/decisions';
import { mockPurgeNotesByProject } from '@/lib/data/mock/notes';
import { mockPurgeReportsByProject } from '@/lib/data/mock/reports';
import { mockPurgeTagsByProject } from '@/lib/data/mock/tags';
import { mockPurgeTasksByProject } from '@/lib/data/mock/tasks';

export function mockPurgeProject(projectId: string): void {
  mockPurgeNotesByProject(projectId);
  mockPurgeTasksByProject(projectId);
  mockPurgeDecisionsByProject(projectId);
  mockPurgeTagsByProject(projectId);
  mockPurgeReportsByProject(projectId);
}
