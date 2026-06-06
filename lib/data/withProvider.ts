import { isSupabaseConfigured } from '@/lib/data/provider';

export async function withDataProvider<T>(
  mockFn: () => T | Promise<T>,
  supabaseFn: () => T | Promise<T>,
): Promise<T> {
  if (isSupabaseConfigured()) {
    return supabaseFn();
  }
  return mockFn();
}

export { getDataProvider, isSupabaseConfigured } from '@/lib/data/provider';
export type { DataProvider } from '@/lib/data/provider';
