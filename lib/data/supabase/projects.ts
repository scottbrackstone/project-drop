import { getOptionalUserId } from '@/lib/supabase/auth';
import { getSupabaseClient } from '@/lib/supabase/client';
import { toAppError } from '@/lib/utils/errors';
import type { CreateProjectInput, Project, ProjectRow } from '@/types/project';
import { mapProjectRow } from '@/types/project';

export async function supabaseListProjects(): Promise<Project[]> {
  const { data, error } = await getSupabaseClient()
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw toAppError(error);
  return (data as ProjectRow[]).map(mapProjectRow);
}

export async function supabaseGetProject(id: string): Promise<Project | null> {
  const { data, error } = await getSupabaseClient()
    .from('projects')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw toAppError(error);
  return data ? mapProjectRow(data as ProjectRow) : null;
}

export async function supabaseCreateProject(input: CreateProjectInput): Promise<Project> {
  const userId = input.userId ?? (await getOptionalUserId());

  const { data, error } = await getSupabaseClient()
    .from('projects')
    .insert({
      name: input.name,
      description: input.description,
      user_id: userId,
      status: 'active',
    })
    .select('*')
    .single();

  if (error) throw toAppError(error);
  return mapProjectRow(data as ProjectRow);
}

export async function supabaseDeleteProject(projectId: string): Promise<void> {
  const { error } = await getSupabaseClient().from('projects').delete().eq('id', projectId);

  if (error) throw toAppError(error);
}
