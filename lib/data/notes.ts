import { processNote } from '@/lib/ai/processNote';
import {
  mockCreateTextNote,
  mockDeleteNote,
  mockListNotesByProject,
} from '@/lib/data/mock/notes';
import {
  supabaseCreateTextNote,
  supabaseDeleteNote,
  supabaseListNotesByProject,
} from '@/lib/data/supabase/notes';
import { withDataProvider } from '@/lib/data/withProvider';
import { validateNoteTranscript } from '@/lib/utils/validation';
import type { CreateTextNoteOptions, CreateTextNoteResult, NoteWithTags } from '@/types/note';

export async function listNotesByProject(projectId: string): Promise<NoteWithTags[]> {
  return withDataProvider(
    () => mockListNotesByProject(projectId),
    () => supabaseListNotesByProject(projectId),
  );
}

export async function createTextNote(
  projectId: string,
  transcript: string,
  options: CreateTextNoteOptions = {},
): Promise<CreateTextNoteResult> {
  const rawTranscript = validateNoteTranscript(transcript);
  const processed = await processNote(rawTranscript);

  return withDataProvider(
    () => mockCreateTextNote(projectId, rawTranscript, processed, options),
    () => supabaseCreateTextNote(projectId, rawTranscript, processed, options),
  );
}

export async function deleteNote(noteId: string): Promise<void> {
  return withDataProvider(
    () => mockDeleteNote(noteId),
    () => supabaseDeleteNote(noteId),
  );
}
