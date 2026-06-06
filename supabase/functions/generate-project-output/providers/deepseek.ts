import {
  DEEPSEEK_MAX_TOKENS,
  DEEPSEEK_TEMPERATURE,
  DEEPSEEK_TIMEOUT_MS,
} from '../limits.ts';

interface DeepSeekMessage {
  role: 'system' | 'user';
  content: string;
}

interface DeepSeekChatResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
}

export interface DeepSeekOutput {
  title: string;
  content: string;
}

export async function generateWithDeepSeek(input: {
  apiKey: string;
  model: string;
  systemPrompt: string;
  userPrompt: string;
}): Promise<DeepSeekOutput> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEEPSEEK_TIMEOUT_MS);

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${input.apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: input.model,
        messages: [
          { role: 'system', content: input.systemPrompt },
          { role: 'user', content: input.userPrompt },
        ] satisfies DeepSeekMessage[],
        response_format: { type: 'json_object' },
        temperature: DEEPSEEK_TEMPERATURE,
        max_tokens: DEEPSEEK_MAX_TOKENS,
      }),
    });

    const payload = (await response.json()) as DeepSeekChatResponse;

    if (!response.ok) {
      throw new Error(payload.error?.message ?? `DeepSeek request failed (${response.status}).`);
    }

    const rawContent = payload.choices?.[0]?.message?.content?.trim();
    if (!rawContent) {
      throw new Error('DeepSeek returned an empty response.');
    }

    return parseDeepSeekJson(rawContent);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('DeepSeek request timed out.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function parseDeepSeekJson(rawContent: string): DeepSeekOutput {
  let parsed: unknown;

  try {
    parsed = JSON.parse(rawContent);
  } catch {
    throw new Error('DeepSeek returned invalid JSON.');
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('DeepSeek returned an unexpected response shape.');
  }

  const record = parsed as { title?: unknown; content?: unknown };
  const title = typeof record.title === 'string' ? record.title.trim() : '';
  const content = typeof record.content === 'string' ? record.content.trim() : '';

  if (!title || !content) {
    throw new Error('DeepSeek response missing title or content.');
  }

  return { title, content };
}
