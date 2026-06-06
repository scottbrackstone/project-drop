import { listDecisionsByProject } from '@/lib/data/decisions';
import { getLastProjectOutputAt } from '@/lib/data/reports';
import { listNotesByProject } from '@/lib/data/notes';
import { getProject } from '@/lib/data/projects';
import { listOpenTasksByProject } from '@/lib/data/tasks';
import { filterByScope } from '@/lib/utils/outputScope';
import { getOutputScopeLabel, getScopeFallbackHint } from '@/constants/copy';
import type { ProjectContextBundle, ProjectOutputScope } from '@/types/projectOutput';

export async function assembleProjectContext(
  projectId: string,
  scope: ProjectOutputScope,
): Promise<ProjectContextBundle> {
  const [project, notes, tasks, decisions, lastOutputAt] = await Promise.all([
    getProject(projectId),
    listNotesByProject(projectId),
    listOpenTasksByProject(projectId),
    listDecisionsByProject(projectId),
    getLastProjectOutputAt(projectId),
  ]);

  if (!project) {
    throw new Error('Project not found.');
  }

  const notesResult = filterByScope(notes, scope, lastOutputAt);
  const tasksResult = filterByScope(tasks, scope, lastOutputAt);
  const decisionsResult = filterByScope(decisions, scope, lastOutputAt);

  const usedFallback =
    scope === 'since_last_output' &&
    (notesResult.usedFallback || tasksResult.usedFallback || decisionsResult.usedFallback);

  return {
    project,
    notes: notesResult.items,
    tasks: tasksResult.items,
    decisions: decisionsResult.items,
    scope,
    scopeLabel: getOutputScopeLabel(scope),
    scopeFallbackHint: usedFallback ? getScopeFallbackHint() : null,
  };
}
