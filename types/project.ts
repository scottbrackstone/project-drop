export type ProjectStatus = 'active' | 'archived' | 'completed';

export interface Project {
  id: string;
  userId: string | null;
  name: string;
  description: string | null;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectWithStats extends Project {
  noteCount: number;
  openTaskCount: number;
}

export interface CreateProjectInput {
  name: string;
  description?: string | null;
  userId?: string | null;
}

export interface ProjectFormValues {
  name: string;
  description: string;
}

export interface ProjectRow {
  id: string;
  user_id: string | null;
  name: string;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export function mapProjectRow(row: ProjectRow): Project {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    description: row.description,
    status: row.status as ProjectStatus,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
