import {
  emptyScopeMessage,
  formatGeneratedAt,
  formatScopeHeader,
  noteBody,
} from '@/lib/ai/outputModes/shared';
import { extractDecisionsFromText } from '@/lib/ai/extractDecisionsFromText';
import { formatRelativeDate } from '@/lib/utils/dates';
import type { GeneratedProjectOutput, ProjectContextBundle } from '@/types/projectOutput';

export function formatDecisionsLogOutput(context: ProjectContextBundle): GeneratedProjectOutput {
  const emptyMessage = emptyScopeMessage(context);
  const lines = [
    ...formatScopeHeader(context),
    `Generated: ${formatGeneratedAt()}`,
    '',
  ];

  if (emptyMessage) {
    lines.push(emptyMessage);
  } else {
    lines.push('Recorded decisions', '-------------------');
    if (context.decisions.length === 0) {
      lines.push('No saved decisions in this scope.');
    } else {
      for (const decision of context.decisions) {
        const date = formatRelativeDate(decision.createdAt);
        const reasoning = decision.reasoning ? `\n  Reasoning: ${decision.reasoning}` : '';
        lines.push(`• ${date}: ${decision.title}${reasoning}`);
      }
    }

    lines.push('');
    lines.push('Mentioned in notes', '------------------');
    const noteDecisions = context.notes.flatMap((note) => {
      const text = noteBody(note);
      return extractDecisionsFromText(text).map((item) => ({
        date: formatRelativeDate(note.createdAt),
        title: item.title,
      }));
    });

    if (noteDecisions.length === 0) {
      lines.push('No decision phrases found in notes.');
    } else {
      for (const item of noteDecisions) {
        lines.push(`• ${item.date}: ${item.title}`);
      }
    }
  }

  return {
    title: `Decisions log — ${context.project.name}`,
    content: lines.join('\n'),
    mode: 'decisions_log',
    scope: context.scope,
  };
}
