import {
  emptyScopeMessage,
  formatGeneratedAt,
  formatNoteSection,
  formatScopeHeader,
  noteBody,
} from '@/lib/ai/outputModes/shared';
import type { GeneratedProjectOutput, ProjectContextBundle } from '@/types/projectOutput';

const OPEN_LOOP_PATTERNS = [
  /\?/,
  /\b(unclear|unsure|not sure|tbd|blocked|blocker|risk|follow[- ]?up|confirm|missing|unanswered|need to decide|open question)\b/i,
];

function collectOpenLoops(context: ProjectContextBundle): string[] {
  const seen = new Set<string>();
  const loops: string[] = [];

  for (const note of context.notes) {
    const text = noteBody(note);
    if (!text) continue;

    for (const line of text.split(/\n+/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.length < 8) continue;
      if (!OPEN_LOOP_PATTERNS.some((pattern) => pattern.test(trimmed))) continue;

      const key = trimmed.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      loops.push(trimmed);
    }
  }

  for (const task of context.tasks) {
    const line = `Open task: ${task.title}`;
    if (!seen.has(line.toLowerCase())) {
      seen.add(line.toLowerCase());
      loops.push(line);
    }
  }

  return loops;
}

export function formatOpenLoopsOutput(context: ProjectContextBundle): GeneratedProjectOutput {
  const emptyMessage = emptyScopeMessage(context);
  const lines = [...formatScopeHeader(context), `Generated: ${formatGeneratedAt()}`, ''];

  if (emptyMessage) {
    lines.push(emptyMessage);
  } else {
    const loops = collectOpenLoops(context);

    lines.push('Open loops', '----------');
    if (loops.length === 0) {
      lines.push('No unresolved items detected in this scope.');
      lines.push('');
      lines.push('Notes reviewed');
      lines.push('--------------');
      lines.push(...formatNoteSection(context));
    } else {
      for (const loop of loops) {
        lines.push(`• ${loop}`);
      }
    }
  }

  return {
    title: `Open loops — ${context.project.name}`,
    content: lines.join('\n'),
    mode: 'open_loops',
    scope: context.scope,
  };
}
