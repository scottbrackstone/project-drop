import { mockClearNoteIdFromDecisions, mockInsertDecisions } from '@/lib/data/mock/decisions';
import {
  mockGetTagNamesForNote,
  mockLinkTagsToNote,
  mockUnlinkNoteTags,
} from '@/lib/data/mock/tags';
import { mockClearNoteIdFromTasks, mockInsertTasks } from '@/lib/data/mock/tasks';
import { AppError } from '@/lib/utils/errors';
import { getOptionalUserId } from '@/lib/supabase/auth';
import { toDueDateOrNull } from '@/lib/utils/dates';
import { generateId } from '@/lib/utils/id';
import type { ProcessedNote } from '@/types/ai';
import type {
  CreateTextNoteOptions,
  CreateTextNoteResult,
  Note,
  NoteWithTags,
} from '@/types/note';

const notes = new Map<string, Note>();

export function mockCountNotesByProject(projectId: string): number {
  return Array.from(notes.values()).filter((note) => note.projectId === projectId).length;
}

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
  options: CreateTextNoteOptions = {},
): Promise<CreateTextNoteResult> {
  const now = new Date().toISOString();
  const userId = await getOptionalUserId();
  const audioUri = options.audioUri ?? null;
  const hasAudio = Boolean(audioUri);

  const note: Note = {
    id: generateId(),
    projectId,
    userId,
    rawTranscript,
    cleanedNote: processed.cleanedNote,
    summary: processed.summary,
    audioUrl: audioUri,
    source: hasAudio ? 'voice' : 'text',
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

export function mockDeleteNote(noteId: string): void {
  if (!notes.has(noteId)) {
    throw new AppError('Note not found.');
  }

  mockUnlinkNoteTags(noteId);
  mockClearNoteIdFromTasks(noteId);
  mockClearNoteIdFromDecisions(noteId);
  notes.delete(noteId);
}

export function mockPurgeNotesByProject(projectId: string): void {
  for (const [id, note] of notes.entries()) {
    if (note.projectId === projectId) {
      mockUnlinkNoteTags(id);
      notes.delete(id);
    }
  }
}
