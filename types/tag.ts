export interface Tag {
  id: string;
  projectId: string;
  name: string;
  createdAt: string;
}

export interface TagRow {
  id: string;
  project_id: string;
  name: string;
  created_at: string;
}

export function mapTagRow(row: TagRow): Tag {
  return {
    id: row.id,
    projectId: row.project_id,
    name: row.name,
    createdAt: row.created_at,
  };
}
