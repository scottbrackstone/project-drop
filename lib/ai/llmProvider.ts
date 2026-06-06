import { generateProjectOutputRemote } from '@/lib/ai/remoteProjectOutput';
import type { ProcessedNote } from '@/types/ai';
import type {
  GeneratedProjectOutput,
  ProjectContextBundle,
  ProjectOutputMode,
} from '@/types/projectOutput';

/**
 * Future: call OpenAI or another LLM provider for note processing.
 * Stage 3 uses mockProcessNote only — no API keys on device.
 */
export async function processNoteWithLlm(_transcript: string): Promise<ProcessedNote | null> {
  return null;
}

/**
 * Invokes generate-project-output Edge Function (DeepSeek server-side).
 * Throws on failure — no silent fallback to mock formatters.
 */
export async function generateProjectOutputWithLlm(
  context: ProjectContextBundle,
  mode: ProjectOutputMode,
): Promise<GeneratedProjectOutput> {
  return generateProjectOutputRemote(context, mode);
}

export function isLlmConfigured(): boolean {
  return false;
}
