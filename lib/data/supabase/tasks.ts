import { getSupabaseClient } from '@/lib/supabase/client';
import { toAppError } from '@/lib/utils/errors';
import type { Task, TaskRow } from '@/types/task';
import { mapTaskRow } from '@/types/task';

export async function supabaseListOpenTasksByProject(projectId: string): Promise<Task[]> {
  const { data, error } = await getSupabaseClient()
    .from('tasks')
    .select('*')
    .eq('project_id', projectId)
    .eq('status', 'open')
    .order('created_at', { ascending: false });

  if (error) throw toAppError(error);
  return (data as TaskRow[]).map(mapTaskRow);
}

export async function supabaseInsertTasks(
  projectId: string,
  noteId: string,
  items: { title: string; dueDate: string | null }[],
): Promise<Task[]> {
  if (items.length === 0) return [];

  const rows = items.map((item) => ({
    project_id: projectId,
    note_id: noteId,
    title: item.title,
    status: 'open',
    due_date: item.dueDate,
  }));

  const { data, error } = await getSupabaseClient()
    .from('tasks')
    .insert(rows)
    .select('*');

  if (error) throw toAppError(error);
  return (data as TaskRow[]).map(mapTaskRow);
}

export async function supabaseCompleteTask(taskId: string): Promise<Task> {
  const { data, error } = await getSupabaseClient()
    .from('tasks')
    .update({ status: 'done' })
    .eq('id', taskId)
    .select('*')
    .single();

  if (error) throw toAppError(error);
  return mapTaskRow(data as TaskRow);
}
