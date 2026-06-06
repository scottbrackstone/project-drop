const DEFAULT_DEEPSEEK_MODEL = 'deepseek-v4-flash';

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export function getDeepSeekApiKey(): string {
  const apiKey = Deno.env.get('DEEPSEEK_API_KEY')?.trim();
  if (!apiKey) {
    throw new ConfigurationError('DEEPSEEK_API_KEY is not configured on the server.');
  }
  return apiKey;
}

export function getDeepSeekModel(): string {
  return Deno.env.get('DEEPSEEK_MODEL')?.trim() || DEFAULT_DEEPSEEK_MODEL;
}

export { DEFAULT_DEEPSEEK_MODEL };
