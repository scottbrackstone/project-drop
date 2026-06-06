import { formatDateTime, formatRelativeDate } from '@/lib/utils/dates';
import { isScopedWindowEmpty } from '@/lib/utils/outputScope';
import type { ProjectContextBundle } from '@/types/projectOutput';
import type { NoteWithTags } from '@/types/note';

export function noteBody(note: NoteWithTags): string {
  return note.cleanedNote ?? note.rawTranscript ?? note.summary ?? '';
}

export function formatScopeHeader(context: ProjectContextBundle): string[] {
  const lines = [`Project: ${context.project.name}`, `Scope: ${context.scopeLabel}`];
  if (context.scopeFallbackHint) {
    lines.push(context.scopeFallbackHint);
  }
  return lines;
}

export function emptyScopeMessage(context: ProjectContextBundle): string | null {
  if (!isScopedWindowEmpty(context.notes, context.tasks, context.decisions)) {
    return null;
  }
  return `No activity found for ${context.scopeLabel.toLowerCase()}.`;
}

export function formatNoteLine(note: NoteWithTags): string {
  const body = noteBody(note);
  const date = formatRelativeDate(note.createdAt);
  const tags = note.tags.length > 0 ? ` [${note.tags.join(', ')}]` : '';
  const summary = note.summary ? `${note.summary} — ` : '';
  return `• ${date}: ${summary}${body}${tags}`;
}

export function formatNoteSection(context: ProjectContextBundle): string[] {
  if (context.notes.length === 0) return ['No notes in this scope.'];
  return context.notes.map(formatNoteLine);
}

export function formatGeneratedAt(): string {
  return formatDateTime(new Date().toISOString());
}
