import { isSupabaseConfigured } from '@/lib/data/provider';

/**
 * Remote LLM output generation is available when public Supabase client config exists.
 * Mock/rule-based formatters are used when URL or anon key are missing.
 */
export function isRemoteOutputConfigured(): boolean {
  return isSupabaseConfigured();
}
