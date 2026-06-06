import { mockListNotesByProject } from '@/lib/data/mock/notes';
import { supabaseListNotesByProject } from '@/lib/data/supabase/notes';
import { withDataProvider } from '@/lib/data/withProvider';
import type { Note } from '@/types/note';

export async function listNotesByProject(projectId: string): Promise<Note[]> {
  return withDataProvider(
    () => mockListNotesByProject(projectId),
    () => supabaseListNotesByProject(projectId),
  );
}
