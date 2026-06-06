import type { TranscriptionAudioInput } from './types.ts';

export async function transcribeWithOpenAi(input: TranscriptionAudioInput): Promise<string> {
  const formData = new FormData();
  formData.append('file', new File([input.bytes], input.fileName, { type: input.mimeType }));
  formData.append('model', input.model);

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${input.apiKey}` },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI transcription error: ${errorText}`);
  }

  const result = (await response.json()) as { text?: unknown };
  const text = typeof result.text === 'string' ? result.text.trim() : '';

  if (!text) {
    throw new Error('OpenAI transcription returned empty text.');
  }

  return text;
}
