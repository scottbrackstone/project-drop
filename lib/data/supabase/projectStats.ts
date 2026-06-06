import { getSupabaseClient } from '@/lib/supabase/client';
import { toAppError } from '@/lib/utils/errors';
import type { ProjectWithStats } from '@/types/project';
import { supabaseListProjects } from '@/lib/data/supabase/projects';

function countByProjectId(rows: { project_id: string }[] | null): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const row of rows ?? []) {
    counts[row.project_id] = (counts[row.project_id] ?? 0) + 1;
  }

  return counts;
}

export async function supabaseListProjectsWithStats(): Promise<ProjectWithStats[]> {
  const projects = await supabaseListProjects();
  if (projects.length === 0) return [];

  const projectIds = projects.map((project) => project.id);
  const client = getSupabaseClient();

  const [notesResult, tasksResult] = await Promise.all([
    client.from('notes').select('project_id').in('project_id', projectIds),
    client
      .from('tasks')
      .select('project_id')
      .in('project_id', projectIds)
      .eq('status', 'open'),
  ]);

  if (notesResult.error) throw toAppError(notesResult.error);
  if (tasksResult.error) throw toAppError(tasksResult.error);

  const noteCounts = countByProjectId(notesResult.data as { project_id: string }[]);
  const taskCounts = countByProjectId(tasksResult.data as { project_id: string }[]);

  return projects.map((project) => ({
    ...project,
    noteCount: noteCounts[project.id] ?? 0,
    openTaskCount: taskCounts[project.id] ?? 0,
  }));
}
