export class AppError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) return error;

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = String((error as { message: unknown }).message);
    const code =
      'code' in error && typeof (error as { code: unknown }).code === 'string'
        ? (error as { code: string }).code
        : undefined;
    return new AppError(message, code);
  }

  return new AppError('Something went wrong. Please try again.');
}

export function getErrorMessage(error: unknown): string {
  return toAppError(error).message;
}
