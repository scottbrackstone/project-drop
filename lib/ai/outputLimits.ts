import type { GenerateProjectOutputEdgeRequest } from '@/lib/ai/buildOutputRequest';
import { AppError } from '@/lib/utils/errors';

export const MAX_OUTPUT_NOTES = 50;
export const MAX_OUTPUT_TASKS = 100;
export const MAX_OUTPUT_DECISIONS = 100;
export const MAX_NOTE_TEXT_CHARS = 2000;
export const MAX_TASK_TITLE_CHARS = 300;
export const MAX_DECISION_TEXT_CHARS = 1000;
export const MAX_TOTAL_CONTEXT_CHARS = 60_000;

function trimNullableText(value: string | null, maxChars: number): string | null {
  if (value === null) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length <= maxChars ? trimmed : trimmed.slice(0, maxChars);
}

function sortByCreatedAtDesc<T extends { createdAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function trimOutputRequest(
  request: GenerateProjectOutputEdgeRequest,
): GenerateProjectOutputEdgeRequest {
  const notes = sortByCreatedAtDesc(request.context.notes)
    .slice(0, MAX_OUTPUT_NOTES)
    .map((note) => ({
      ...note,
      summary: trimNullableText(note.summary, MAX_NOTE_TEXT_CHARS),
      cleanedNote: trimNullableText(note.cleanedNote, MAX_NOTE_TEXT_CHARS),
      rawTranscript: trimNullableText(note.rawTranscript, MAX_NOTE_TEXT_CHARS),
    }));

  const tasks = sortByCreatedAtDesc(request.context.tasks)
    .slice(0, MAX_OUTPUT_TASKS)
    .map((task) => ({
      ...task,
      title: trimNullableText(task.title, MAX_TASK_TITLE_CHARS) ?? task.title,
    }));

  const decisions = sortByCreatedAtDesc(request.context.decisions)
    .slice(0, MAX_OUTPUT_DECISIONS)
    .map((decision) => ({
      ...decision,
      title: trimNullableText(decision.title, MAX_DECISION_TEXT_CHARS) ?? decision.title,
      reasoning: trimNullableText(decision.reasoning, MAX_DECISION_TEXT_CHARS),
    }));

  return {
    ...request,
    project: {
      ...request.project,
      name: request.project.name.trim(),
      description: trimNullableText(request.project.description, MAX_NOTE_TEXT_CHARS),
    },
    context: {
      ...request.context,
      notes,
      tasks,
      decisions,
    },
  };
}

export function estimateRequestChars(request: GenerateProjectOutputEdgeRequest): number {
  return JSON.stringify(request).length;
}

export function assertRequestWithinLimits(request: GenerateProjectOutputEdgeRequest): void {
  if (estimateRequestChars(request) > MAX_TOTAL_CONTEXT_CHARS) {
    throw new AppError(
      'This project has too much content to generate at once. Try a smaller scope.',
    );
  }
}

export function prepareTrimmedOutputRequest(
  request: GenerateProjectOutputEdgeRequest,
): GenerateProjectOutputEdgeRequest {
  const trimmed = trimOutputRequest(request);
  assertRequestWithinLimits(trimmed);
  return trimmed;
}
