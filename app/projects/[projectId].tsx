import { useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { ResourceScreenShell } from '@/components/layout/ResourceScreenShell';
import { ProjectDetailContent } from '@/components/projects/ProjectDetailContent';
import { COPY } from '@/constants/copy';
import { useCreateTextNote } from '@/hooks/useCreateTextNote';
import { useNotes } from '@/hooks/useNotes';
import { useProject } from '@/hooks/useProject';
import { useProjectTasks } from '@/hooks/useProjectTasks';

export default function ProjectDetailScreen() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { project, loading, error } = useProject(projectId);
  const { notes, loading: notesLoading, refresh: refreshNotes } = useNotes(projectId);
  const { tasks, loading: tasksLoading, refresh: refreshTasks } = useProjectTasks(projectId);

  const handleNoteCreated = useCallback(async () => {
    await Promise.all([refreshNotes(), refreshTasks()]);
  }, [refreshNotes, refreshTasks]);

  const { create, submitting, error: saveError } = useCreateTextNote(projectId, {
    onSuccess: handleNoteCreated,
  });

  const handleSaveNote = useCallback(
    async (transcript: string) => {
      const result = await create(transcript);
      return result !== null;
    },
    [create],
  );

  return (
    <ResourceScreenShell
      title={project?.name ?? COPY.projectDetail.loadingTitle}
      showBack
      subtitle={project?.description ?? undefined}
      loading={loading}
      loadingLabel={COPY.projectDetail.loadingLabel}
      error={error}
      notFound={!project}
      notFoundTitle={COPY.projectDetail.notFoundTitle}
      notFoundDescription={COPY.projectDetail.notFoundDescription}
    >
      {project ? (
        <ProjectDetailContent
          project={project}
          notes={notes}
          tasks={tasks}
          notesLoading={notesLoading}
          tasksLoading={tasksLoading}
          savingNote={submitting}
          saveError={saveError}
          onSaveNote={handleSaveNote}
        />
      ) : null}
    </ResourceScreenShell>
  );
}
