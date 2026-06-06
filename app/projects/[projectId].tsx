import { useCallback, useEffect } from 'react';

import { ResourceScreenShell } from '@/components/layout/ResourceScreenShell';
import { ProjectDetailContent } from '@/components/projects/ProjectDetailContent';
import { ProjectHeaderActions } from '@/components/projects/ProjectHeaderActions';
import { COPY } from '@/constants/copy';
import { useCompleteTask } from '@/hooks/useCompleteTask';
import { useCreateTextNote } from '@/hooks/useCreateTextNote';
import { useDeleteNote } from '@/hooks/useDeleteNote';
import { useProjectIdParam } from '@/hooks/useProjectIdParam';
import type { CreateTextNoteOptions } from '@/types/note';
import { useNotes } from '@/hooks/useNotes';
import { useProject } from '@/hooks/useProject';
import { useProjectTasks } from '@/hooks/useProjectTasks';
import { saveRecentProjectId } from '@/lib/settings/recentProject';
import { confirmDestructive } from '@/lib/utils/confirmDestructive';

export default function ProjectDetailScreen() {
  const projectId = useProjectIdParam();
  const { project, loading, error } = useProject(projectId);
  const { notes, loading: notesLoading, refresh: refreshNotes } = useNotes(projectId);
  const { tasks, loading: tasksLoading, refresh: refreshTasks } = useProjectTasks(projectId);

  useEffect(() => {
    if (project?.id) {
      void saveRecentProjectId(project.id);
    }
  }, [project?.id]);

  const handleNoteCreated = useCallback(async () => {
    await Promise.all([refreshNotes(), refreshTasks()]);
  }, [refreshNotes, refreshTasks]);

  const { create, submitting, error: saveError } = useCreateTextNote(projectId, {
    onSuccess: handleNoteCreated,
  });

  const {
    complete,
    completingTaskId,
    error: completeTaskError,
  } = useCompleteTask({ onSuccess: refreshTasks });

  const {
    remove: removeNote,
    deletingNoteId,
    error: deleteNoteError,
  } = useDeleteNote({
    onSuccess: async () => {
      await Promise.all([refreshNotes(), refreshTasks()]);
    },
  });

  const handleSaveNote = useCallback(
    async (transcript: string, options?: CreateTextNoteOptions) => {
      const result = await create(transcript, options);
      return result !== null;
    },
    [create],
  );

  const handleCompleteTask = useCallback(
    (taskId: string) => {
      void complete(taskId);
    },
    [complete],
  );

  const handleDeleteNote = useCallback(
    (noteId: string) => {
      confirmDestructive({
        title: COPY.deleteNote.title,
        message: COPY.deleteNote.message,
        cancelLabel: COPY.common.cancel,
        confirmLabel: COPY.deleteNote.confirm,
        onConfirm: () => {
          void removeNote(noteId);
        },
      });
    },
    [removeNote],
  );

  return (
    <ResourceScreenShell
      title={project?.name ?? COPY.projectDetail.loadingTitle}
      showBack
      subtitle={project?.description ?? undefined}
      headerRight={project ? <ProjectHeaderActions projectId={project.id} /> : undefined}
      loading={loading}
      loadingLabel={COPY.projectDetail.loadingLabel}
      error={error}
      notFound={!loading && !error && !project}
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
          completingTaskId={completingTaskId}
          completeTaskError={completeTaskError}
          deletingNoteId={deletingNoteId}
          deleteNoteError={deleteNoteError}
          onSaveNote={handleSaveNote}
          onCompleteTask={handleCompleteTask}
          onDeleteNote={handleDeleteNote}
        />
      ) : null}
    </ResourceScreenShell>
  );
}
