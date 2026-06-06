import { getSupabaseClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/data/provider';

export async function getOptionalUserId(): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;

  const { data } = await getSupabaseClient().auth.getSession();
  return data.session?.user.id ?? null;
}
