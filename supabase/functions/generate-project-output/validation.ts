import { GuardrailError } from './errors.ts';
import {
  MAX_DECISION_TEXT_CHARS,
  MAX_NOTE_TEXT_CHARS,
  MAX_OUTPUT_DECISIONS,
  MAX_OUTPUT_NOTES,
  MAX_OUTPUT_TASKS,
  MAX_TASK_TITLE_CHARS,
  MAX_TOTAL_CONTEXT_CHARS,
} from './limits.ts';
import { isValidOutputMode, type OutputModeName } from './prompts.ts';

const VALID_SCOPES = new Set(['full', 'since_last_output', 'today', 'last_7_days']);

export interface OutputNotePayload {
  id: string;
  summary: string | null;
  cleanedNote: string | null;
  rawTranscript: string | null;
  tags: string[];
  source: string;
  createdAt: string;
}

export interface OutputTaskPayload {
  id: string;
  title: string;
  status: string;
  dueDate: string | null;
  createdAt: string;
}

export interface OutputDecisionPayload {
  id: string;
  title: string;
  reasoning: string | null;
  createdAt: string;
}

export interface ValidatedOutputRequest {
  project: {
    id: string;
    name: string;
    description: string | null;
  };
  mode: OutputModeName;
  scope: string;
  contextJson: string;
  estimatedChars: number;
}

function trimNullableText(value: unknown, maxChars: number): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== 'string') {
    throw new GuardrailError('INVALID_REQUEST', 'Project output request was invalid. Please try again.');
  }
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length <= maxChars ? trimmed : trimmed.slice(0, maxChars);
}

function requireString(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new GuardrailError('INVALID_REQUEST', 'Project output request was invalid. Please try again.');
  }
  return value.trim();
}

function sortByCreatedAtDesc<T extends { createdAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

function parseNotes(raw: unknown): OutputNotePayload[] {
  if (!Array.isArray(raw)) {
    throw new GuardrailError('INVALID_REQUEST', 'Project output request was invalid. Please try again.');
  }

  if (raw.length > MAX_OUTPUT_NOTES) {
    throw new GuardrailError(
      'REQUEST_TOO_LARGE',
      'This project has too much content to generate at once. Try a smaller scope.',
    );
  }

  const notes = raw.map((item) => {
    if (!item || typeof item !== 'object') {
      throw new GuardrailError('INVALID_REQUEST', 'Project output request was invalid. Please try again.');
    }

    const record = item as Record<string, unknown>;
    return {
      id: requireString(record.id, 'note.id'),
      summary: trimNullableText(record.summary, MAX_NOTE_TEXT_CHARS),
      cleanedNote: trimNullableText(record.cleanedNote, MAX_NOTE_TEXT_CHARS),
      rawTranscript: trimNullableText(record.rawTranscript, MAX_NOTE_TEXT_CHARS),
      tags: Array.isArray(record.tags)
        ? record.tags.filter((tag): tag is string => typeof tag === 'string').slice(0, 20)
        : [],
      source: typeof record.source === 'string' ? record.source : 'text',
      createdAt: requireString(record.createdAt, 'note.createdAt'),
    };
  });

  return sortByCreatedAtDesc(notes).slice(0, MAX_OUTPUT_NOTES);
}

function parseTasks(raw: unknown): OutputTaskPayload[] {
  if (!Array.isArray(raw)) {
    throw new GuardrailError('INVALID_REQUEST', 'Project output request was invalid. Please try again.');
  }

  if (raw.length > MAX_OUTPUT_TASKS) {
    throw new GuardrailError(
      'REQUEST_TOO_LARGE',
      'This project has too much content to generate at once. Try a smaller scope.',
    );
  }

  const tasks = raw.map((item) => {
    if (!item || typeof item !== 'object') {
      throw new GuardrailError('INVALID_REQUEST', 'Project output request was invalid. Please try again.');
    }

    const record = item as Record<string, unknown>;
    return {
      id: requireString(record.id, 'task.id'),
      title: trimNullableText(record.title, MAX_TASK_TITLE_CHARS) ?? requireString(record.title, 'task.title'),
      status: typeof record.status === 'string' ? record.status : 'open',
      dueDate: trimNullableText(record.dueDate, 32),
      createdAt: requireString(record.createdAt, 'task.createdAt'),
    };
  });

  return sortByCreatedAtDesc(tasks).slice(0, MAX_OUTPUT_TASKS);
}

function parseDecisions(raw: unknown): OutputDecisionPayload[] {
  if (!Array.isArray(raw)) {
    throw new GuardrailError('INVALID_REQUEST', 'Project output request was invalid. Please try again.');
  }

  if (raw.length > MAX_OUTPUT_DECISIONS) {
    throw new GuardrailError(
      'REQUEST_TOO_LARGE',
      'This project has too much content to generate at once. Try a smaller scope.',
    );
  }

  const decisions = raw.map((item) => {
    if (!item || typeof item !== 'object') {
      throw new GuardrailError('INVALID_REQUEST', 'Project output request was invalid. Please try again.');
    }

    const record = item as Record<string, unknown>;
    return {
      id: requireString(record.id, 'decision.id'),
      title:
        trimNullableText(record.title, MAX_DECISION_TEXT_CHARS) ??
        requireString(record.title, 'decision.title'),
      reasoning: trimNullableText(record.reasoning, MAX_DECISION_TEXT_CHARS),
      createdAt: requireString(record.createdAt, 'decision.createdAt'),
    };
  });

  return sortByCreatedAtDesc(decisions).slice(0, MAX_OUTPUT_DECISIONS);
}

export function validateAndPrepareRequest(body: unknown): ValidatedOutputRequest {
  if (!body || typeof body !== 'object') {
    throw new GuardrailError('INVALID_REQUEST', 'Project output request was invalid. Please try again.');
  }

  const record = body as Record<string, unknown>;
  const project = record.project;

  if (!project || typeof project !== 'object') {
    throw new GuardrailError('INVALID_REQUEST', 'Project output request was invalid. Please try again.');
  }

  const projectRecord = project as Record<string, unknown>;
  const projectId = requireString(projectRecord.id, 'project.id');
  const projectName = requireString(projectRecord.name, 'project.name');
  const modeRaw = typeof record.mode === 'string' ? record.mode.trim() : '';

  if (!isValidOutputMode(modeRaw)) {
    throw new GuardrailError('INVALID_REQUEST', 'Project output request was invalid. Please try again.');
  }

  const scope = typeof record.scope === 'string' ? record.scope.trim() : '';
  if (!VALID_SCOPES.has(scope)) {
    throw new GuardrailError('INVALID_REQUEST', 'Project output request was invalid. Please try again.');
  }

  const context = record.context;
  if (!context || typeof context !== 'object') {
    throw new GuardrailError('INVALID_REQUEST', 'Project output request was invalid. Please try again.');
  }

  const contextRecord = context as Record<string, unknown>;
  const notes = parseNotes(contextRecord.notes);
  const tasks = parseTasks(contextRecord.tasks);
  const decisions = parseDecisions(contextRecord.decisions);

  const payload = {
    project: {
      id: projectId,
      name: projectName,
      description: trimNullableText(projectRecord.description, MAX_NOTE_TEXT_CHARS),
    },
    mode: modeRaw,
    scope,
    scopeLabel:
      typeof contextRecord.scopeLabel === 'string' ? contextRecord.scopeLabel.trim() : scope,
    scopeFallbackHint:
      typeof contextRecord.scopeFallbackHint === 'string'
        ? contextRecord.scopeFallbackHint.trim()
        : null,
    notes,
    tasks,
    decisions,
    scopeFrom: typeof contextRecord.scopeFrom === 'string' ? contextRecord.scopeFrom : null,
    scopeTo: typeof contextRecord.scopeTo === 'string' ? contextRecord.scopeTo : null,
  };

  const contextJson = JSON.stringify(payload, null, 2);
  const estimatedChars = contextJson.length;

  if (estimatedChars > MAX_TOTAL_CONTEXT_CHARS) {
    throw new GuardrailError(
      'REQUEST_TOO_LARGE',
      'This project has too much content to generate at once. Try a smaller scope.',
    );
  }

  return {
    project: payload.project,
    mode: modeRaw,
    scope,
    contextJson,
    estimatedChars,
  };
}
