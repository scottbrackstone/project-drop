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
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${input.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: input.model,
      messages: [
        { role: 'system', content: input.systemPrompt },
        { role: 'user', content: input.userPrompt },
      ] satisfies DeepSeekMessage[],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    }),
  });

  const payload = (await response.json()) as DeepSeekChatResponse;

  if (!response.ok) {
    const message = payload.error?.message ?? `DeepSeek request failed (${response.status}).`;
    throw new Error(message);
  }

  const rawContent = payload.choices?.[0]?.message?.content?.trim();
  if (!rawContent) {
    throw new Error('DeepSeek returned an empty response.');
  }

  return parseDeepSeekJson(rawContent);
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
