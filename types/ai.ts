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

export interface TranscriptionResult {
  transcript: string;
}

export interface ProjectSummaryResult {
  title: string;
  content: string;
}
