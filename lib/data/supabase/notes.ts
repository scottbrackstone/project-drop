import { supabaseInsertDecisions } from '@/lib/data/supabase/decisions';
import { supabaseGetTagNamesForNotes, supabaseLinkTagsToNote } from '@/lib/data/supabase/tags';
import { supabaseInsertTasks } from '@/lib/data/supabase/tasks';
import { getOptionalUserId } from '@/lib/supabase/auth';
import { getSupabaseClient } from '@/lib/supabase/client';
import { toDueDateOrNull } from '@/lib/utils/dates';
import { toAppError } from '@/lib/utils/errors';
import type { ProcessedNote } from '@/types/ai';
import type {
  CreateTextNoteOptions,
  CreateTextNoteResult,
  NoteRow,
  NoteWithTags,
} from '@/types/note';
import { mapNoteRow } from '@/types/note';

export async function supabaseListNotesByProject(projectId: string): Promise<NoteWithTags[]> {
  const { data, error } = await getSupabaseClient()
    .from('notes')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) throw toAppError(error);

  const notes = (data as NoteRow[]).map(mapNoteRow);
  const tagMap = await supabaseGetTagNamesForNotes(notes.map((note) => note.id));

  return notes.map((note) => ({
    ...note,
    tags: tagMap.get(note.id) ?? [],
  }));
}

export async function supabaseCreateTextNote(
  projectId: string,
  rawTranscript: string,
  processed: ProcessedNote,
  options: CreateTextNoteOptions = {},
): Promise<CreateTextNoteResult> {
  const userId = await getOptionalUserId();
  const audioUri = options.audioUri ?? null;
  const hasAudio = Boolean(audioUri);

  const { data, error } = await getSupabaseClient()
    .from('notes')
    .insert({
      project_id: projectId,
      user_id: userId,
      raw_transcript: rawTranscript,
      cleaned_note: processed.cleanedNote,
      summary: processed.summary,
      audio_url: audioUri,
      source: hasAudio ? 'voice' : 'text',
    })
    .select('*')
    .single();

  if (error) throw toAppError(error);

  const note = mapNoteRow(data as NoteRow);

  const createdTasks = await supabaseInsertTasks(
    projectId,
    note.id,
    processed.tasks.map((task) => ({
      title: task.title,
      dueDate: toDueDateOrNull(task.dueDate),
    })),
  );

  const createdDecisions = await supabaseInsertDecisions(
    projectId,
    note.id,
    processed.decisions.map((decision) => ({
      title: decision.title,
      reasoning: decision.reasoning,
    })),
  );

  const tags = await supabaseLinkTagsToNote(projectId, note.id, processed.tags);

  return {
    ...note,
    tags,
    taskCount: createdTasks.length,
    decisionCount: createdDecisions.length,
  };
}
