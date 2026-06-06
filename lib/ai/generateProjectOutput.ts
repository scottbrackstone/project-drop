import { isRemoteOutputConfigured } from '@/lib/ai/outputConfig';
import { generateProjectOutputWithLlm } from '@/lib/ai/llmProvider';
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
  if (isRemoteOutputConfigured()) {
    return generateProjectOutputWithLlm(context, mode);
  }

  return mockGenerateProjectOutput(context, mode);
}
