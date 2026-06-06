import { getSupabaseClient } from '@/lib/supabase/client';
import { toAppError } from '@/lib/utils/errors';
import type { Note, NoteRow } from '@/types/note';
import { mapNoteRow } from '@/types/note';

export async function supabaseListNotesByProject(projectId: string): Promise<Note[]> {
  const { data, error } = await getSupabaseClient()
    .from('notes')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) throw toAppError(error);
  return (data as NoteRow[]).map(mapNoteRow);
}
