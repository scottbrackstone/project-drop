import { generateId } from '@/lib/utils/id';
import type { Decision } from '@/types/decision';

const decisions = new Map<string, Decision>();

export function mockInsertDecisions(
  projectId: string,
  noteId: string,
  items: { title: string; reasoning: string | null }[],
): Decision[] {
  const now = new Date().toISOString();
  const created: Decision[] = [];

  for (const item of items) {
    const decision: Decision = {
      id: generateId(),
      projectId,
      noteId,
      title: item.title,
      reasoning: item.reasoning,
      createdAt: now,
    };
    decisions.set(decision.id, decision);
    created.push(decision);
  }

  return created;
}
