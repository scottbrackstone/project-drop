import { mockListOpenTasksByProject } from '@/lib/data/mock/tasks';
import { supabaseListOpenTasksByProject } from '@/lib/data/supabase/tasks';
import { withDataProvider } from '@/lib/data/withProvider';
import type { Task } from '@/types/task';

export async function listOpenTasksByProject(projectId: string): Promise<Task[]> {
  return withDataProvider(
    () => mockListOpenTasksByProject(projectId),
    () => supabaseListOpenTasksByProject(projectId),
  );
}
