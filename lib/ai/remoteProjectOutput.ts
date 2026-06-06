import { buildOutputRequest } from '@/lib/ai/buildOutputRequest';
import { getSupabaseClient } from '@/lib/supabase/client';
import { AppError, toAppError } from '@/lib/utils/errors';
import type {
  GeneratedProjectOutput,
  ProjectContextBundle,
  ProjectOutputMode,
} from '@/types/projectOutput';

export { isRemoteOutputConfigured } from '@/lib/ai/outputConfig';

interface GenerateOutputEdgeSuccess {
  title: string;
  content: string;
  source: 'remote';
}

interface GenerateOutputEdgeFailure {
  error: string;
}

function parseEdgeResponse(
  data: unknown,
  mode: ProjectOutputMode,
  scope: ProjectContextBundle['scope'],
): GeneratedProjectOutput {
  if (!data || typeof data !== 'object') {
    throw new AppError('Output generation failed: empty response from server.');
  }

  if ('error' in data && typeof (data as GenerateOutputEdgeFailure).error === 'string') {
    throw new AppError((data as GenerateOutputEdgeFailure).error);
  }

  const success = data as GenerateOutputEdgeSuccess;
  const title = success.title?.trim();
  const content = success.content?.trim();

  if (!title || !content) {
    throw new AppError('Output generation returned empty title or content.');
  }

  return {
    title,
    content,
    mode,
    scope,
  };
}

/**
 * Invokes the generate-project-output Edge Function (DeepSeek server-side).
 * Throws on failure — callers must not silently fall back to mock when configured.
 */
export async function generateProjectOutputRemote(
  context: ProjectContextBundle,
  mode: ProjectOutputMode,
): Promise<GeneratedProjectOutput> {
  const body = buildOutputRequest(context, mode);

  const { data, error } = await getSupabaseClient().functions.invoke('generate-project-output', {
    body,
  });

  if (error) {
    throw toAppError(error);
  }

  return parseEdgeResponse(data, mode, context.scope);
}
