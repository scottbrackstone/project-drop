export interface ExtractedTask {
  title: string;
  dueDate: string | null;
}

export interface ExtractedDecision {
  title: string;
  reasoning: string | null;
}

export interface ProcessedNote {
  cleanedNote: string;
  summary: string;
  tasks: ExtractedTask[];
  decisions: ExtractedDecision[];
  tags: string[];
}

export type TranscriptionSource = 'mock' | 'remote';

export interface TranscriptionResult {
  transcript: string;
  source: TranscriptionSource;
}

export interface ProjectSummaryResult {
  title: string;
  content: string;
}
