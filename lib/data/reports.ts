import {
  mockCreateProjectOutput,
  mockGetLastProjectOutputAt,
  mockGetProjectOutput,
  mockListProjectOutputs,
} from '@/lib/data/mock/reports';
import {
  supabaseCreateProjectOutput,
  supabaseGetLastProjectOutputAt,
  supabaseGetProjectOutput,
  supabaseListProjectOutputs,
} from '@/lib/data/supabase/reports';
import { withDataProvider } from '@/lib/data/withProvider';
import type { CreateProjectOutputInput } from '@/types/projectOutput';
import type { ProjectOutput } from '@/types/report';

export async function listProjectOutputs(projectId: string): Promise<ProjectOutput[]> {
  return withDataProvider(
    () => mockListProjectOutputs(projectId),
    () => supabaseListProjectOutputs(projectId),
  );
}

export async function getProjectOutput(id: string): Promise<ProjectOutput | null> {
  return withDataProvider(
    () => mockGetProjectOutput(id),
    () => supabaseGetProjectOutput(id),
  );
}

export async function getLastProjectOutputAt(projectId: string): Promise<string | null> {
  return withDataProvider(
    () => mockGetLastProjectOutputAt(projectId),
    () => supabaseGetLastProjectOutputAt(projectId),
  );
}

export async function createProjectOutput(input: CreateProjectOutputInput): Promise<ProjectOutput> {
  return withDataProvider(
    () => mockCreateProjectOutput(input),
    () => supabaseCreateProjectOutput(input),
  );
}
