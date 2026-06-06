import { mockListDecisionsByProject } from '@/lib/data/mock/decisions';
import { supabaseListDecisionsByProject } from '@/lib/data/supabase/decisions';
import { withDataProvider } from '@/lib/data/withProvider';
import type { Decision } from '@/types/decision';

export async function listDecisionsByProject(projectId: string): Promise<Decision[]> {
  return withDataProvider(
    () => mockListDecisionsByProject(projectId),
    () => supabaseListDecisionsByProject(projectId),
  );
}
