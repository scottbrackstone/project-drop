import type { SupabaseClient } from 'npm:@supabase/supabase-js@2';

import { GuardrailError } from './errors.ts';
import {
  MAX_ESTIMATED_CHARS_PER_DAY,
  MAX_GENERATIONS_PER_DAY,
  MAX_GENERATIONS_PER_HOUR,
} from './limits.ts';

const FUNCTION_NAME = 'generate-project-output';

async function hashFingerprint(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function getRequestFingerprint(req: Request): Promise<string> {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown-ip';
  const userAgent = req.headers.get('user-agent')?.trim() ?? 'unknown-agent';
  return hashFingerprint(`${forwarded}|${userAgent}`);
}

interface UsageRow {
  estimated_chars: number;
}

export async function enforceRateLimits(
  adminClient: SupabaseClient,
  fingerprintHash: string,
  estimatedChars: number,
): Promise<void> {
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { count: hourCount, error: hourError } = await adminClient
    .from('llm_usage_events')
    .select('id', { count: 'exact', head: true })
    .eq('function_name', FUNCTION_NAME)
    .eq('fingerprint_hash', fingerprintHash)
    .gte('created_at', hourAgo);

  if (hourError) {
    throw new GuardrailError(
      'PROVIDER_ERROR',
      'The AI provider could not generate this output. Please try again.',
    );
  }

  if ((hourCount ?? 0) >= MAX_GENERATIONS_PER_HOUR) {
    throw new GuardrailError(
      'RATE_LIMITED',
      "You've generated several outputs recently. Try again later.",
    );
  }

  const { data: dayRows, error: dayError } = await adminClient
    .from('llm_usage_events')
    .select('estimated_chars')
    .eq('function_name', FUNCTION_NAME)
    .eq('fingerprint_hash', fingerprintHash)
    .gte('created_at', dayAgo);

  if (dayError) {
    throw new GuardrailError(
      'PROVIDER_ERROR',
      'The AI provider could not generate this output. Please try again.',
    );
  }

  const rows = (dayRows ?? []) as UsageRow[];
  const dayCount = rows.length;
  const dayChars = rows.reduce((sum, row) => sum + (row.estimated_chars ?? 0), 0);

  if (dayCount >= MAX_GENERATIONS_PER_DAY) {
    throw new GuardrailError(
      'RATE_LIMITED',
      "You've generated several outputs recently. Try again later.",
    );
  }

  if (dayChars + estimatedChars > MAX_ESTIMATED_CHARS_PER_DAY) {
    throw new GuardrailError(
      'RATE_LIMITED',
      "You've generated several outputs recently. Try again later.",
    );
  }
}

export async function recordUsageEvent(
  adminClient: SupabaseClient,
  fingerprintHash: string,
  estimatedChars: number,
): Promise<void> {
  const { error } = await adminClient.from('llm_usage_events').insert({
    function_name: FUNCTION_NAME,
    fingerprint_hash: fingerprintHash,
    estimated_chars: estimatedChars,
  });

  if (error) {
    console.error('Failed to record llm_usage_events row:', error.message);
  }
}
