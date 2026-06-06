import {
  emptyScopeMessage,
  formatGeneratedAt,
  formatNoteSection,
  formatScopeHeader,
} from '@/lib/ai/outputModes/shared';
import type { GeneratedProjectOutput, ProjectContextBundle } from '@/types/projectOutput';

export function formatReportOutput(context: ProjectContextBundle): GeneratedProjectOutput {
  const emptyMessage = emptyScopeMessage(context);
  const lines = [...formatScopeHeader(context), `Generated: ${formatGeneratedAt()}`, ''];

  if (emptyMessage) {
    lines.push(emptyMessage);
  } else {
    lines.push('Background', '----------');
    lines.push(context.project.description ?? 'No project description provided.');
    lines.push('');
    lines.push('Timeline', '--------');
    if (context.notes.length === 0) {
      lines.push('No dated notes in this scope.');
    } else {
      lines.push(...formatNoteSection(context));
    }
    lines.push('');
    lines.push('Findings', '--------');
    lines.push(
      context.notes.length > 0
        ? `${context.notes.length} note(s) captured in this scope.`
        : 'No findings recorded in this scope.',
    );
    lines.push('');
    lines.push('Tasks', '-----');
    if (context.tasks.length === 0) {
      lines.push('No open tasks in this scope.');
    } else {
      for (const task of context.tasks) {
        const due = task.dueDate ? ` (due ${task.dueDate})` : '';
        lines.push(`• ${task.title}${due}`);
      }
    }
    lines.push('');
    lines.push('Decisions', '---------');
    if (context.decisions.length === 0) {
      lines.push('No decisions recorded in this scope.');
    } else {
      for (const decision of context.decisions) {
        const reasoning = decision.reasoning ? ` — ${decision.reasoning}` : '';
        lines.push(`• ${decision.title}${reasoning}`);
      }
    }
    lines.push('');
    lines.push('Outstanding items', '-----------------');
    lines.push(
      context.tasks.length > 0
        ? `${context.tasks.length} open task(s) remain.`
        : 'No outstanding tasks in this scope.',
    );
    lines.push('');
    lines.push('Recommendations', '---------------');
    lines.push('Review open tasks and unresolved notes before the next project update.');
  }

  return {
    title: `Report — ${context.project.name}`,
    content: lines.join('\n'),
    mode: 'report',
    scope: context.scope,
  };
}
