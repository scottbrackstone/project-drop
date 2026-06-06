import { processNote } from '@/lib/ai/processNote';
import { mockCreateTextNote, mockListNotesByProject } from '@/lib/data/mock/notes';
import {
  supabaseCreateTextNote,
  supabaseListNotesByProject,
} from '@/lib/data/supabase/notes';
import { withDataProvider } from '@/lib/data/withProvider';
import { validateNoteTranscript } from '@/lib/utils/validation';
import type { CreateTextNoteResult, NoteWithTags } from '@/types/note';

export async function listNotesByProject(projectId: string): Promise<NoteWithTags[]> {
  return withDataProvider(
    () => mockListNotesByProject(projectId),
    () => supabaseListNotesByProject(projectId),
  );
}

export async function createTextNote(
  projectId: string,
  transcript: string,
): Promise<CreateTextNoteResult> {
  const rawTranscript = validateNoteTranscript(transcript);
  const processed = await processNote(rawTranscript);

  return withDataProvider(
    () => mockCreateTextNote(projectId, rawTranscript, processed),
    () => supabaseCreateTextNote(projectId, rawTranscript, processed),
  );
}
