import type { ExtractedTask } from '@/types/ai';

const TASK_PATTERNS: RegExp[] = [
  /\bremember to\s+(.+?)(?:[.!?]|$)/i,
  /\bneed to\s+(.+?)(?:[.!?]|$)/i,
  /\btodo[:\s]+(.+?)(?:[.!?]|$)/i,
  /\bfollow up(?:\s+with)?\s+(.+?)(?:[.!?]|$)/i,
  /\bmake sure(?:\s+to)?\s+(.+?)(?:[.!?]|$)/i,
  /\bnext[,:]?\s+(.+?)(?:[.!?]|$)/i,
  /\bshould\s+(.+?)(?:[.!?]|$)/i,
];

function normaliseTaskTitle(raw: string): string {
  const trimmed = raw.trim().replace(/\s+/g, ' ');
  if (!trimmed) return '';
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
}

function extractDueHint(text: string): string | null {
  const match = text.match(/\b(tomorrow|today|next week|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i);
  return match?.[1] ?? null;
}

export function extractTasksFromText(transcript: string): ExtractedTask[] {
  const tasks: ExtractedTask[] = [];
  const seen = new Set<string>();

  for (const pattern of TASK_PATTERNS) {
    const match = transcript.match(pattern);
    if (!match?.[1]) continue;

    const title = normaliseTaskTitle(match[1]);
    if (!title || seen.has(title.toLowerCase())) continue;

    seen.add(title.toLowerCase());
    tasks.push({
      title,
      dueDate: extractDueHint(match[0]),
    });
  }

  return dedupeTasks(tasks);
}

function dedupeTasks(tasks: ExtractedTask[]): ExtractedTask[] {
  const sorted = [...tasks].sort((a, b) => b.title.length - a.title.length);
  const kept: ExtractedTask[] = [];

  for (const task of sorted) {
    const isDuplicate = kept.some(
      (existing) => existing.title.toLowerCase() === task.title.toLowerCase(),
    );
    const isSubsumed = kept.some((existing) =>
      existing.title.toLowerCase().includes(task.title.toLowerCase()),
    );
    if (!isDuplicate && !isSubsumed) {
      kept.push(task);
    }
  }

  return kept;
}
