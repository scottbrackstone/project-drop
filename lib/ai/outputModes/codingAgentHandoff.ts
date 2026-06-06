import {
  emptyScopeMessage,
  formatGeneratedAt,
  formatNoteSection,
  formatScopeHeader,
  noteBody,
} from '@/lib/ai/outputModes/shared';
import type { GeneratedProjectOutput, ProjectContextBundle } from '@/types/projectOutput';

const NOT_PROVIDED = 'Not provided in project context.';

function section(title: string, body: string[]): string[] {
  return [title, '-'.repeat(title.length), ...body, ''];
}

export function formatCodingAgentHandoffOutput(
  context: ProjectContextBundle,
): GeneratedProjectOutput {
  const emptyMessage = emptyScopeMessage(context);
  const lines = [...formatScopeHeader(context), `Generated: ${formatGeneratedAt()}`, ''];

  if (emptyMessage) {
    lines.push(emptyMessage);
  } else {
    lines.push(
      ...section('Project context', [
        `Name: ${context.project.name}`,
        context.project.description
          ? `Description: ${context.project.description}`
          : 'Description: Not provided in project context.',
      ]),
    );

    const statusLines =
      context.notes.length > 0
        ? [`${context.notes.length} note(s) in scope.`, ...formatNoteSection(context).slice(0, 5)]
        : ['No notes in this scope.'];

    lines.push(...section('Current status', statusLines));

    const worksLines = context.notes
      .map((note) => note.summary ?? noteBody(note))
      .filter(Boolean)
      .slice(0, 3)
      .map((line) => `• ${line}`);

    lines.push(
      ...section('What works', worksLines.length > 0 ? worksLines : [NOT_PROVIDED]),
    );
    lines.push(...section('Files/areas changed', [NOT_PROVIDED]));
    lines.push(
      ...section(
        'Known issues',
        context.tasks.length > 0
          ? context.tasks.map((task) => `• ${task.title}`)
          : [NOT_PROVIDED],
      ),
    );

    const nextTask = context.tasks[0]?.title ?? NOT_PROVIDED;
    lines.push(...section('Current next task', [`• ${nextTask}`]));

    lines.push(
      ...section('Rules to follow', [
        '• Use only provided project context.',
        '• Do not invent files, commits, or implementation details.',
        '• Preserve existing decisions and tasks.',
        '• Mention uncertainty when context is thin.',
      ]),
    );

    lines.push(...section('Do not change', [NOT_PROVIDED]));

    const testPlan =
      context.tasks.length > 0
        ? context.tasks.slice(0, 5).map((task) => `• Verify: ${task.title}`)
        : ['• Smoke test core project flows from captured notes.'];

    lines.push(...section('Manual test plan', testPlan));
    lines.push(...section('Recent commits/details', [NOT_PROVIDED]));
  }

  return {
    title: `Coding agent handoff — ${context.project.name}`,
    content: lines.join('\n'),
    mode: 'coding_agent_handoff',
    scope: context.scope,
  };
}
