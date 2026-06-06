import type { ProcessedNote } from '@/types/ai';
import type {
  GeneratedProjectOutput,
  ProjectContextBundle,
  ProjectOutputMode,
} from '@/types/projectOutput';

/**
 * Future: call OpenAI or another LLM provider.
 * Stage 3 uses mockProcessNote only — no API keys on device.
 */
export async function processNoteWithLlm(_transcript: string): Promise<ProcessedNote | null> {
  return null;
}

/**
 * Future: invoke generate-project-output Edge Function.
 * Stage 5A uses mock formatters only.
 */
export async function generateProjectOutputWithLlm(
  _context: ProjectContextBundle,
  _mode: ProjectOutputMode,
): Promise<GeneratedProjectOutput | null> {
  return null;
}

export function isLlmConfigured(): boolean {
  return false;
}
