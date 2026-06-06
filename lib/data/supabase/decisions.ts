import { getSupabaseClient } from '@/lib/supabase/client';
import { toAppError } from '@/lib/utils/errors';
import type { Decision, DecisionRow } from '@/types/decision';
import { mapDecisionRow } from '@/types/decision';

export async function supabaseInsertDecisions(
  projectId: string,
  noteId: string,
  items: { title: string; reasoning: string | null }[],
): Promise<Decision[]> {
  if (items.length === 0) return [];

  const rows = items.map((item) => ({
    project_id: projectId,
    note_id: noteId,
    title: item.title,
    reasoning: item.reasoning,
  }));

  const { data, error } = await getSupabaseClient()
    .from('decisions')
    .insert(rows)
    .select('*');

  if (error) throw toAppError(error);
  return (data as DecisionRow[]).map(mapDecisionRow);
}
