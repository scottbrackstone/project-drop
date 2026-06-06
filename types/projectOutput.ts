import type { Decision } from '@/types/decision';
import type { NoteWithTags } from '@/types/note';
import type { Project } from '@/types/project';
import type { Task } from '@/types/task';

export type ProjectOutputMode =
  | 'snapshot'
  | 'next_actions'
  | 'open_loops'
  | 'decisions_log'
  | 'meeting_update'
  | 'report'
  | 'coding_agent_handoff';

export type ProjectOutputScope = 'full' | 'since_last_output' | 'today' | 'last_7_days';

export interface ProjectContextBundle {
  project: Project;
  notes: NoteWithTags[];
  tasks: Task[];
  decisions: Decision[];
  scope: ProjectOutputScope;
  scopeLabel: string;
  scopeFallbackHint: string | null;
}

export interface GeneratedProjectOutput {
  title: string;
  content: string;
  mode: ProjectOutputMode;
  scope: ProjectOutputScope;
}

export interface CreateProjectOutputInput {
  projectId: string;
  title: string;
  content: string;
  mode: ProjectOutputMode;
  scope: ProjectOutputScope;
  scopeFrom?: string | null;
  scopeTo?: string | null;
}

export const PROJECT_OUTPUT_MODES: ProjectOutputMode[] = [
  'snapshot',
  'next_actions',
  'open_loops',
  'decisions_log',
  'meeting_update',
  'report',
  'coding_agent_handoff',
];

export const PROJECT_OUTPUT_SCOPES: ProjectOutputScope[] = [
  'full',
  'since_last_output',
  'today',
  'last_7_days',
];
