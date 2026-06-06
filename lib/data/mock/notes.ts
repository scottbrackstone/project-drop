import { mockInsertDecisions } from '@/lib/data/mock/decisions';
import { mockGetTagNamesForNote, mockLinkTagsToNote } from '@/lib/data/mock/tags';
import { mockInsertTasks } from '@/lib/data/mock/tasks';
import { getOptionalUserId } from '@/lib/supabase/auth';
import { toDueDateOrNull } from '@/lib/utils/dates';
import { generateId } from '@/lib/utils/id';
import type { ProcessedNote } from '@/types/ai';
import type { CreateTextNoteResult, Note, NoteWithTags } from '@/types/note';

const notes = new Map<string, Note>();

export function mockListNotesByProject(projectId: string): NoteWithTags[] {
  return Array.from(notes.values())
    .filter((note) => note.projectId === projectId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((note) => ({
      ...note,
      tags: mockGetTagNamesForNote(note.id),
    }));
}

export async function mockCreateTextNote(
  projectId: string,
  rawTranscript: string,
  processed: ProcessedNote,
): Promise<CreateTextNoteResult> {
  const now = new Date().toISOString();
  const userId = await getOptionalUserId();

  const note: Note = {
    id: generateId(),
    projectId,
    userId,
    rawTranscript,
    cleanedNote: processed.cleanedNote,
    summary: processed.summary,
    audioUrl: null,
    source: 'text',
    createdAt: now,
    updatedAt: now,
  };

  notes.set(note.id, note);

  const createdTasks = mockInsertTasks(
    projectId,
    note.id,
    processed.tasks.map((task) => ({
      title: task.title,
      dueDate: toDueDateOrNull(task.dueDate),
    })),
  );

  const createdDecisions = mockInsertDecisions(
    projectId,
    note.id,
    processed.decisions.map((decision) => ({
      title: decision.title,
      reasoning: decision.reasoning,
    })),
  );

  const tags = mockLinkTagsToNote(projectId, note.id, processed.tags);

  return {
    ...note,
    tags,
    taskCount: createdTasks.length,
    decisionCount: createdDecisions.length,
  };
}
