import {
  emptyScopeMessage,
  formatGeneratedAt,
  formatScopeHeader,
  noteBody,
} from '@/lib/ai/outputModes/shared';
import type { GeneratedProjectOutput, ProjectContextBundle } from '@/types/projectOutput';

export function formatMeetingUpdateOutput(context: ProjectContextBundle): GeneratedProjectOutput {
  const emptyMessage = emptyScopeMessage(context);
  const lines = [
    ...formatScopeHeader(context),
    `Generated: ${formatGeneratedAt()}`,
    '',
  ];

  if (emptyMessage) {
    lines.push(emptyMessage);
  } else {
    lines.push(`Update: ${context.project.name}`);
    lines.push('');
    lines.push('Summary');
    lines.push('-------');

    if (context.notes.length === 0) {
      lines.push('No new notes to report for this period.');
    } else {
      const highlights = context.notes
        .map((note) => note.summary ?? noteBody(note))
        .filter(Boolean)
        .slice(0, 5);
      for (const highlight of highlights) {
        lines.push(`• ${highlight}`);
      }
    }

    lines.push('');
    lines.push('Next steps');
    lines.push('----------');
    if (context.tasks.length === 0) {
      lines.push('• No open tasks flagged for follow-up.');
    } else {
      const topTasks = context.tasks.slice(0, 5);
      for (const task of topTasks) {
        const due = task.dueDate ? ` by ${task.dueDate}` : '';
        lines.push(`• ${task.title}${due}`);
      }
    }

    lines.push('');
    lines.push('Decisions');
    lines.push('---------');
    if (context.decisions.length === 0) {
      lines.push('• No decisions recorded in this period.');
    } else {
      for (const decision of context.decisions.slice(0, 5)) {
        lines.push(`• ${decision.title}`);
      }
    }
  }

  return {
    title: `Meeting update — ${context.project.name}`,
    content: lines.join('\n'),
    mode: 'meeting_update',
    scope: context.scope,
  };
}
