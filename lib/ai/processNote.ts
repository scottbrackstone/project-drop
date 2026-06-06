import { isLlmConfigured, processNoteWithLlm } from '@/lib/ai/llmProvider';
import { mockProcessNote } from '@/lib/ai/mockProcessor';
import type { ProcessedNote } from '@/types/ai';

export async function processNote(transcript: string): Promise<ProcessedNote> {
  if (isLlmConfigured()) {
    const llmResult = await processNoteWithLlm(transcript);
    if (llmResult) return llmResult;
  }

  return mockProcessNote(transcript);
}
