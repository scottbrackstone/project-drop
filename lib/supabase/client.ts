import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { isSupabaseConfigured } from '@/lib/data/provider';

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured.');
  }

  if (!client) {
    client = createClient(
      process.env.EXPO_PUBLIC_SUPABASE_URL!,
      process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      },
    );
  }

  return client;
}
