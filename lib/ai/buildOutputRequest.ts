import type { ProjectContextBundle, ProjectOutputMode } from '@/types/projectOutput';

export interface GenerateProjectOutputEdgeRequest {
  project: {
    id: string;
    name: string;
    description: string | null;
  };
  mode: ProjectOutputMode;
  scope: ProjectContextBundle['scope'];
  context: {
    notes: Array<{
      id: string;
      summary: string | null;
      cleanedNote: string | null;
      rawTranscript: string | null;
      tags: string[];
      source: string;
      createdAt: string;
    }>;
    tasks: Array<{
      id: string;
      title: string;
      status: string;
      dueDate: string | null;
      createdAt: string;
    }>;
    decisions: Array<{
      id: string;
      title: string;
      reasoning: string | null;
      createdAt: string;
    }>;
    scopeFrom: string | null;
    scopeTo: string | null;
    scopeLabel: string;
    scopeFallbackHint: string | null;
  };
}

export function buildOutputRequest(
  context: ProjectContextBundle,
  mode: ProjectOutputMode,
): GenerateProjectOutputEdgeRequest {
  return {
    project: {
      id: context.project.id,
      name: context.project.name,
      description: context.project.description,
    },
    mode,
    scope: context.scope,
    context: {
      notes: context.notes.map((note) => ({
        id: note.id,
        summary: note.summary,
        cleanedNote: note.cleanedNote,
        rawTranscript: note.rawTranscript,
        tags: note.tags,
        source: note.source,
        createdAt: note.createdAt,
      })),
      tasks: context.tasks.map((task) => ({
        id: task.id,
        title: task.title,
        status: task.status,
        dueDate: task.dueDate,
        createdAt: task.createdAt,
      })),
      decisions: context.decisions.map((decision) => ({
        id: decision.id,
        title: decision.title,
        reasoning: decision.reasoning,
        createdAt: decision.createdAt,
      })),
      scopeFrom: null,
      scopeTo: null,
      scopeLabel: context.scopeLabel,
      scopeFallbackHint: context.scopeFallbackHint,
    },
  };
}
