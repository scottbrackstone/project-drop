export interface Report {
  id: string;
  projectId: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface ReportRow {
  id: string;
  project_id: string;
  title: string;
  content: string;
  created_at: string;
}

export function mapReportRow(row: ReportRow): Report {
  return {
    id: row.id,
    projectId: row.project_id,
    title: row.title,
    content: row.content,
    createdAt: row.created_at,
  };
}
