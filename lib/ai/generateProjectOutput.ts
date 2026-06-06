import { isLlmConfigured, generateProjectOutputWithLlm } from '@/lib/ai/llmProvider';
import { mockGenerateProjectOutput } from '@/lib/ai/mockProjectOutput';
import type {
  GeneratedProjectOutput,
  ProjectContextBundle,
  ProjectOutputMode,
} from '@/types/projectOutput';

export async function generateProjectOutput(
  context: ProjectContextBundle,
  mode: ProjectOutputMode,
): Promise<GeneratedProjectOutput> {
  if (isLlmConfigured()) {
    const llmResult = await generateProjectOutputWithLlm(context, mode);
    if (llmResult) return llmResult;
  }

  return mockGenerateProjectOutput(context, mode);
}
