import {
  emptyScopeMessage,
  formatGeneratedAt,
  formatScopeHeader,
  noteBody,
} from '@/lib/ai/outputModes/shared';
import { extractTasksFromText } from '@/lib/ai/extractTasksFromText';
import type { GeneratedProjectOutput, ProjectContextBundle } from '@/types/projectOutput';

function impliedTasksFromNotes(context: ProjectContextBundle): string[] {
  const seen = new Set<string>();
  const titles: string[] = [];

  for (const note of context.notes) {
    const text = noteBody(note);
    if (!text) continue;

    for (const task of extractTasksFromText(text)) {
      const key = task.title.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      const due = task.dueDate ? ` (${task.dueDate})` : '';
      titles.push(`${task.title}${due}`);
    }
  }

  return titles;
}

export function formatNextActionsOutput(context: ProjectContextBundle): GeneratedProjectOutput {
  const emptyMessage = emptyScopeMessage(context);
  const lines = [
    ...formatScopeHeader(context),
    `Generated: ${formatGeneratedAt()}`,
    '',
  ];

  if (emptyMessage) {
    lines.push(emptyMessage);
  } else {
    lines.push('Open tasks', '-----------');
    if (context.tasks.length === 0) {
      lines.push('No open tasks in this scope.');
    } else {
      for (const task of context.tasks) {
        const due = task.dueDate ? ` (due ${task.dueDate})` : '';
        lines.push(`• ${task.title}${due}`);
      }
    }

    const implied = impliedTasksFromNotes(context);
    lines.push('');
    lines.push('Mentioned in notes', '------------------');
    if (implied.length === 0) {
      lines.push('No additional actions mentioned in notes.');
    } else {
      for (const title of implied) {
        lines.push(`• ${title}`);
      }
    }
  }

  return {
    title: `Next actions — ${context.project.name}`,
    content: lines.join('\n'),
    mode: 'next_actions',
    scope: context.scope,
  };
}
