import { getSupabaseClient } from '@/lib/supabase/client';
import { toAppError } from '@/lib/utils/errors';
import type { TagRow } from '@/types/tag';
import { mapTagRow } from '@/types/tag';

function normaliseTagName(name: string): string {
  return name.trim().toLowerCase();
}

export async function supabaseLinkTagsToNote(
  projectId: string,
  noteId: string,
  tagNames: string[],
): Promise<string[]> {
  if (tagNames.length === 0) return [];

  const linkedNames: string[] = [];

  for (const rawName of tagNames) {
    const name = normaliseTagName(rawName);
    if (!name) continue;

    const { data: existing, error: findError } = await getSupabaseClient()
      .from('tags')
      .select('*')
      .eq('project_id', projectId)
      .eq('name', name)
      .maybeSingle();

    if (findError) throw toAppError(findError);

    let tagId = existing ? (existing as TagRow).id : null;

    if (!tagId) {
      const { data: created, error: createError } = await getSupabaseClient()
        .from('tags')
        .insert({ project_id: projectId, name })
        .select('*')
        .single();

      if (createError) throw toAppError(createError);
      tagId = (created as TagRow).id;
    }

    const { error: linkError } = await getSupabaseClient()
      .from('note_tags')
      .insert({ note_id: noteId, tag_id: tagId });

    if (linkError) throw toAppError(linkError);
    linkedNames.push(name);
  }

  return linkedNames;
}

export async function supabaseGetTagNamesForNotes(noteIds: string[]): Promise<Map<string, string[]>> {
  const result = new Map<string, string[]>();
  if (noteIds.length === 0) return result;

  const { data, error } = await getSupabaseClient()
    .from('note_tags')
    .select('note_id, tag:tags(name)')
    .in('note_id', noteIds);

  if (error) throw toAppError(error);

  for (const row of data ?? []) {
    const noteId = row.note_id as string;
    const tagRelation = row.tag as { name: string } | { name: string }[] | null;
    const tagName = Array.isArray(tagRelation) ? tagRelation[0]?.name : tagRelation?.name;
    if (!tagName) continue;

    const existing = result.get(noteId) ?? [];
    existing.push(tagName);
    result.set(noteId, existing);
  }

  return result;
}
