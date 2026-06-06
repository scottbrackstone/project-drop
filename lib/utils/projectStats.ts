export function formatProjectStatsLine(noteCount: number, openTaskCount: number): string {
  const notesLabel = noteCount === 1 ? 'note' : 'notes';
  const tasksLabel = openTaskCount === 1 ? 'task' : 'tasks';
  return `${noteCount} ${notesLabel} · ${openTaskCount} open ${tasksLabel}`;
}
