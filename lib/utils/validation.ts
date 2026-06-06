import { LIMITS } from '@/constants/validation';

export function trimOrNull(value: string | undefined | null): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function validateProjectName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error('Project name is required.');
  }
  if (trimmed.length > LIMITS.projectNameMax) {
    throw new Error(`Project name must be ${LIMITS.projectNameMax} characters or fewer.`);
  }
  return trimmed;
}

export function validateProjectDescription(description?: string | null): string | null {
  const trimmed = trimOrNull(description ?? null);
  if (trimmed && trimmed.length > LIMITS.projectDescriptionMax) {
    throw new Error(
      `Description must be ${LIMITS.projectDescriptionMax} characters or fewer.`,
    );
  }
  return trimmed;
}
