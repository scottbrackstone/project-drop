import type { NoteWithTags } from '@/types/note';

export function formatNoteForCopy(note: NoteWithTags, includeTranscript: boolean): string {
  const lines = ['# Note', ''];

  if (note.summary?.trim()) {
    lines.push(note.summary.trim(), '');
  }

  if (note.cleanedNote?.trim()) {
    lines.push(note.cleanedNote.trim());
  }

  const transcript = note.rawTranscript?.trim();
  const cleaned = note.cleanedNote?.trim();
  const shouldIncludeTranscript =
    Boolean(transcript && transcript !== cleaned) &&
    (includeTranscript || !cleaned);

  if (shouldIncludeTranscript && transcript) {
    if (lines.at(-1) !== '') lines.push('');
    lines.push('Transcript:', transcript);
  }

  if (note.tags.length > 0) {
    lines.push('', `Tags: ${note.tags.join(', ')}`);
  }

  return lines.join('\n').trim();
}
