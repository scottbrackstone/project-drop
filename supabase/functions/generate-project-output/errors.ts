export type GuardrailErrorCode =
  | 'REQUEST_TOO_LARGE'
  | 'INVALID_REQUEST'
  | 'RATE_LIMITED'
  | 'PROVIDER_ERROR';

export class GuardrailError extends Error {
  readonly code: GuardrailErrorCode;

  constructor(code: GuardrailErrorCode, message: string) {
    super(message);
    this.name = 'GuardrailError';
    this.code = code;
  }
}

