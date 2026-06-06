import type { ProjectOutputScope } from '@/types/projectOutput';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

interface ScopedItem {
  createdAt: string;
}

export function resolveScopeCutoff(
  scope: ProjectOutputScope,
  lastOutputAt: string | null,
  now: Date = new Date(),
): { cutoff: string | null; usedFallback: boolean } {
  if (scope === 'full') {
    return { cutoff: null, usedFallback: false };
  }

  if (scope === 'last_7_days') {
    return { cutoff: new Date(now.getTime() - SEVEN_DAYS_MS).toISOString(), usedFallback: false };
  }

  if (!lastOutputAt) {
    return { cutoff: null, usedFallback: true };
  }

  return { cutoff: lastOutputAt, usedFallback: false };
}

export function filterByScope<T extends ScopedItem>(
  items: T[],
  scope: ProjectOutputScope,
  lastOutputAt: string | null,
  now?: Date,
): { items: T[]; usedFallback: boolean } {
  const { cutoff, usedFallback } = resolveScopeCutoff(scope, lastOutputAt, now);

  if (!cutoff) {
    return { items, usedFallback };
  }

  const cutoffTime = new Date(cutoff).getTime();
  const filtered = items.filter((item) => {
    const created = new Date(item.createdAt).getTime();
    if (Number.isNaN(created)) return false;
    if (scope === 'last_7_days') {
      return created >= cutoffTime;
    }
    return created > cutoffTime;
  });

  return { items: filtered, usedFallback };
}

export function isScopedWindowEmpty(
  notes: ScopedItem[],
  tasks: ScopedItem[],
  decisions: ScopedItem[],
): boolean {
  return notes.length === 0 && tasks.length === 0 && decisions.length === 0;
}
