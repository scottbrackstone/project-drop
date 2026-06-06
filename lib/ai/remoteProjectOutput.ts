import { buildOutputRequest } from '@/lib/ai/buildOutputRequest';
import { prepareTrimmedOutputRequest } from '@/lib/ai/outputLimits';
import { getSupabaseClient } from '@/lib/supabase/client';
import { AppError, toAppError } from '@/lib/utils/errors';
import type {
  GeneratedProjectOutput,
  ProjectContextBundle,
  ProjectOutputMode,
} from '@/types/projectOutput';

export { isRemoteOutputConfigured } from '@/lib/ai/outputConfig';

type OutputErrorCode =
  | 'REQUEST_TOO_LARGE'
  | 'INVALID_REQUEST'
  | 'RATE_LIMITED'
  | 'PROVIDER_ERROR';

interface GenerateOutputEdgeSuccess {
  title: string;
  content: string;
  source: 'remote';
}

interface StructuredOutputError {
  error: {
    code: OutputErrorCode;
    message: string;
  };
}

const OUTPUT_ERROR_MESSAGES: Record<OutputErrorCode, string> = {
  REQUEST_TOO_LARGE:
    'This project has too much content to generate at once. Try a smaller scope.',
  INVALID_REQUEST: 'Project output request was invalid. Please try again.',
  RATE_LIMITED: "You've generated several outputs recently. Try again later.",
  PROVIDER_ERROR: 'The AI provider could not generate this output. Please try again.',
};

function isOutputErrorCode(value: string): value is OutputErrorCode {
  return (
    value === 'REQUEST_TOO_LARGE' ||
    value === 'INVALID_REQUEST' ||
    value === 'RATE_LIMITED' ||
    value === 'PROVIDER_ERROR'
  );
}

function parseStructuredError(data: unknown): AppError | null {
  if (!data || typeof data !== 'object' || !('error' in data)) {
    return null;
  }

  const payload = (data as StructuredOutputError).error;

  if (payload && typeof payload === 'object' && 'code' in payload && 'message' in payload) {
    const code = String(payload.code);
    const message = typeof payload.message === 'string' ? payload.message.trim() : '';

    if (isOutputErrorCode(code)) {
      return new AppError(message || OUTPUT_ERROR_MESSAGES[code], code);
    }
  }

  if (typeof (data as { error: unknown }).error === 'string') {
    return new AppError((data as { error: string }).error);
  }

  return null;
}

function parseEdgeResponse(
  data: unknown,
  mode: ProjectOutputMode,
  scope: ProjectContextBundle['scope'],
): GeneratedProjectOutput {
  if (!data || typeof data !== 'object') {
    throw new AppError('Output generation failed: empty response from server.');
  }

  const structuredError = parseStructuredError(data);
  if (structuredError) {
    throw structuredError;
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
  const body = prepareTrimmedOutputRequest(buildOutputRequest(context, mode));

  const { data, error } = await getSupabaseClient().functions.invoke('generate-project-output', {
    body,
  });

  if (error) {
    throw toAppError(error);
  }

  return parseEdgeResponse(data, mode, context.scope);
}
