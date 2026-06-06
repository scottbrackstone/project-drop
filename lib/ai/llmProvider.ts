import type { ProcessedNote } from '@/types/ai';

/**
 * Future: call OpenAI or another LLM provider.
 * Stage 3 uses mockProcessNote only — no API keys on device.
 */
export async function processNoteWithLlm(_transcript: string): Promise<ProcessedNote | null> {
  return null;
}

export function isLlmConfigured(): boolean {
  return false;
}
