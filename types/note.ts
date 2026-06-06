export type NoteSource = 'voice' | 'upload' | 'text';

export interface Note {
  id: string;
  projectId: string;
  userId: string | null;
  rawTranscript: string | null;
  cleanedNote: string | null;
  summary: string | null;
  audioUrl: string | null;
  source: NoteSource;
  createdAt: string;
  updatedAt: string;
}

export interface NoteRow {
  id: string;
  project_id: string;
  user_id: string | null;
  raw_transcript: string | null;
  cleaned_note: string | null;
  summary: string | null;
  audio_url: string | null;
  source: string;
  created_at: string;
  updated_at: string;
}

export function mapNoteRow(row: NoteRow): Note {
  return {
    id: row.id,
    projectId: row.project_id,
    userId: row.user_id,
    rawTranscript: row.raw_transcript,
    cleanedNote: row.cleaned_note,
    summary: row.summary,
    audioUrl: row.audio_url,
    source: row.source as NoteSource,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export interface NoteWithTags extends Note {
  tags: string[];
}

export interface CreateTextNoteOptions {
  audioUri?: string | null;
}

export interface CreateTextNoteResult extends NoteWithTags {
  taskCount: number;
  decisionCount: number;
}
