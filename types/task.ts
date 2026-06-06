export type TaskStatus = 'open' | 'done' | 'cancelled';

export interface Task {
  id: string;
  projectId: string;
  noteId: string | null;
  title: string;
  status: TaskStatus;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskRow {
  id: string;
  project_id: string;
  note_id: string | null;
  title: string;
  status: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export function mapTaskRow(row: TaskRow): Task {
  return {
    id: row.id,
    projectId: row.project_id,
    noteId: row.note_id,
    title: row.title,
    status: row.status as TaskStatus,
    dueDate: row.due_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
