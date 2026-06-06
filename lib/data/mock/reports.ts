import { generateId } from '@/lib/utils/id';
import type { CreateProjectOutputInput } from '@/types/projectOutput';
import type { ProjectOutput } from '@/types/report';

const reports = new Map<string, ProjectOutput>();

export function mockListProjectOutputs(projectId: string): ProjectOutput[] {
  return Array.from(reports.values())
    .filter((report) => report.projectId === projectId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function mockGetProjectOutput(id: string): ProjectOutput | null {
  return reports.get(id) ?? null;
}

export function mockGetLastProjectOutputAt(projectId: string): string | null {
  const projectReports = mockListProjectOutputs(projectId);
  return projectReports[0]?.createdAt ?? null;
}

export function mockCreateProjectOutput(input: CreateProjectOutputInput): ProjectOutput {
  const now = new Date().toISOString();
  const output: ProjectOutput = {
    id: generateId(),
    projectId: input.projectId,
    title: input.title,
    content: input.content,
    mode: input.mode,
    scope: input.scope,
    scopeFrom: input.scopeFrom ?? null,
    scopeTo: input.scopeTo ?? null,
    createdAt: now,
  };

  reports.set(output.id, output);
  return output;
}
