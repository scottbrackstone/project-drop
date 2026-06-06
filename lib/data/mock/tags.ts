import { generateId } from '@/lib/utils/id';
import type { Tag } from '@/types/tag';

const tags = new Map<string, Tag>();
const noteTagLinks = new Map<string, Set<string>>();

function normaliseTagName(name: string): string {
  return name.trim().toLowerCase();
}

export function mockLinkTagsToNote(
  projectId: string,
  noteId: string,
  tagNames: string[],
): string[] {
  const linkedNames: string[] = [];
  const now = new Date().toISOString();

  for (const rawName of tagNames) {
    const name = normaliseTagName(rawName);
    if (!name) continue;

    let tag = Array.from(tags.values()).find(
      (item) => item.projectId === projectId && item.name === name,
    );

    if (!tag) {
      tag = {
        id: generateId(),
        projectId,
        name,
        createdAt: now,
      };
      tags.set(tag.id, tag);
    }

    const links = noteTagLinks.get(noteId) ?? new Set<string>();
    links.add(tag.id);
    noteTagLinks.set(noteId, links);
    linkedNames.push(tag.name);
  }

  return linkedNames;
}

export function mockGetTagNamesForNote(noteId: string): string[] {
  const tagIds = noteTagLinks.get(noteId);
  if (!tagIds) return [];

  return Array.from(tagIds)
    .map((id) => tags.get(id)?.name)
    .filter((name): name is string => Boolean(name));
}
