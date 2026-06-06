export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.EXPO_PUBLIC_SUPABASE_URL &&
      process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export type DataProvider = 'supabase' | 'mock';

export function getDataProvider(): DataProvider {
  return isSupabaseConfigured() ? 'supabase' : 'mock';
}
