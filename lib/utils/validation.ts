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

export function validateNoteTranscript(transcript: string): string {
  const trimmed = transcript.trim();
  if (!trimmed) {
    throw new Error('Note cannot be empty.');
  }
  if (trimmed.length < LIMITS.noteTranscriptMin) {
    throw new Error(`Note must be at least ${LIMITS.noteTranscriptMin} characters.`);
  }
  if (trimmed.length > LIMITS.noteTranscriptMax) {
    throw new Error(`Note must be ${LIMITS.noteTranscriptMax} characters or fewer.`);
  }
  return trimmed;
}
