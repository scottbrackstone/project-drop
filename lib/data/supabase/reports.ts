import { getSupabaseClient } from '@/lib/supabase/client';
import { toAppError } from '@/lib/utils/errors';
import type { CreateProjectOutputInput } from '@/types/projectOutput';
import type { ProjectOutput, ReportRow } from '@/types/report';
import { mapReportRow } from '@/types/report';

export async function supabaseListProjectOutputs(projectId: string): Promise<ProjectOutput[]> {
  const { data, error } = await getSupabaseClient()
    .from('reports')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) throw toAppError(error);
  return (data as ReportRow[]).map(mapReportRow);
}

export async function supabaseGetProjectOutput(id: string): Promise<ProjectOutput | null> {
  const { data, error } = await getSupabaseClient()
    .from('reports')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw toAppError(error);
  if (!data) return null;
  return mapReportRow(data as ReportRow);
}

export async function supabaseGetLastProjectOutputAt(projectId: string): Promise<string | null> {
  const { data, error } = await getSupabaseClient()
    .from('reports')
    .select('created_at')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw toAppError(error);
  if (!data) return null;
  return (data as { created_at: string }).created_at;
}

export async function supabaseCreateProjectOutput(
  input: CreateProjectOutputInput,
): Promise<ProjectOutput> {
  const { data, error } = await getSupabaseClient()
    .from('reports')
    .insert({
      project_id: input.projectId,
      title: input.title,
      content: input.content,
      mode: input.mode,
      scope: input.scope,
      scope_from: input.scopeFrom ?? null,
      scope_to: input.scopeTo ?? null,
    })
    .select('*')
    .single();

  if (error) throw toAppError(error);
  return mapReportRow(data as ReportRow);
}
