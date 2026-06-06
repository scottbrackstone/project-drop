import {
  emptyScopeMessage,
  formatGeneratedAt,
  formatNoteSection,
  formatScopeHeader,
} from '@/lib/ai/outputModes/shared';
import type { GeneratedProjectOutput, ProjectContextBundle } from '@/types/projectOutput';

export function formatSnapshotOutput(context: ProjectContextBundle): GeneratedProjectOutput {
  const emptyMessage = emptyScopeMessage(context);
  const lines = [
    ...formatScopeHeader(context),
    `Generated: ${formatGeneratedAt()}`,
    '',
  ];

  if (emptyMessage) {
    lines.push(emptyMessage);
  } else {
    lines.push('Overview', '--------');
    if (context.project.description) {
      lines.push(context.project.description);
      lines.push('');
    }
    lines.push(`Notes (${context.notes.length})`);
    lines.push(...formatNoteSection(context));
    lines.push('');
    lines.push(`Open tasks (${context.tasks.length})`);
    if (context.tasks.length === 0) {
      lines.push('No open tasks in this scope.');
    } else {
      for (const task of context.tasks) {
        const due = task.dueDate ? ` (due ${task.dueDate})` : '';
        lines.push(`• ${task.title}${due}`);
      }
    }
    lines.push('');
    lines.push(`Decisions (${context.decisions.length})`);
    if (context.decisions.length === 0) {
      lines.push('No decisions in this scope.');
    } else {
      for (const decision of context.decisions) {
        lines.push(`• ${decision.title}`);
      }
    }
  }

  return {
    title: `Project snapshot — ${context.project.name}`,
    content: lines.join('\n'),
    mode: 'snapshot',
    scope: context.scope,
  };
}
