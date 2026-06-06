import type { ProjectOutputMode, ProjectOutputScope } from '@/types/projectOutput';

export interface Report {
  id: string;
  projectId: string;
  title: string;
  content: string;
  mode: ProjectOutputMode;
  scope: ProjectOutputScope;
  scopeFrom: string | null;
  scopeTo: string | null;
  createdAt: string;
}

/** Persisted project output — alias for reports table rows. */
export type ProjectOutput = Report;

export interface ReportRow {
  id: string;
  project_id: string;
  title: string;
  content: string;
  mode: string;
  scope: string;
  scope_from: string | null;
  scope_to: string | null;
  created_at: string;
}

function parseOutputMode(value: string): ProjectOutputMode {
  if (
    value === 'snapshot' ||
    value === 'next_actions' ||
    value === 'decisions_log' ||
    value === 'meeting_update'
  ) {
    return value;
  }
  return 'snapshot';
}

function parseOutputScope(value: string): ProjectOutputScope {
  if (value === 'full' || value === 'since_last_output' || value === 'last_7_days') {
    return value;
  }
  return 'full';
}

export function mapReportRow(row: ReportRow): Report {
  return {
    id: row.id,
    projectId: row.project_id,
    title: row.title,
    content: row.content,
    mode: parseOutputMode(row.mode),
    scope: parseOutputScope(row.scope),
    scopeFrom: row.scope_from,
    scopeTo: row.scope_to,
    createdAt: row.created_at,
  };
}
