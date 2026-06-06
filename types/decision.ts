export interface Decision {
  id: string;
  projectId: string;
  noteId: string | null;
  title: string;
  reasoning: string | null;
  createdAt: string;
}

export interface DecisionRow {
  id: string;
  project_id: string;
  note_id: string | null;
  title: string;
  reasoning: string | null;
  created_at: string;
}

export function mapDecisionRow(row: DecisionRow): Decision {
  return {
    id: row.id,
    projectId: row.project_id,
    noteId: row.note_id,
    title: row.title,
    reasoning: row.reasoning,
    createdAt: row.created_at,
  };
}
