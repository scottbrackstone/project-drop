import { useCallback } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { ResourceScreenShell } from '@/components/layout/ResourceScreenShell';
import { ProjectDetailContent } from '@/components/projects/ProjectDetailContent';
import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { useCompleteTask } from '@/hooks/useCompleteTask';
import { useCreateTextNote } from '@/hooks/useCreateTextNote';
import { useDeleteNote } from '@/hooks/useDeleteNote';
import { useDeleteProject } from '@/hooks/useDeleteProject';
import type { CreateTextNoteOptions } from '@/types/note';
import { useNotes } from '@/hooks/useNotes';
import { useProject } from '@/hooks/useProject';
import { useProjectTasks } from '@/hooks/useProjectTasks';
import { confirmDestructive } from '@/lib/utils/confirmDestructive';

export default function ProjectDetailScreen() {
  const router = useRouter();
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

  const handleDeleteSuccess = useCallback(() => {
    router.replace(ROUTES.projects);
  }, [router]);

  const {
    remove: removeProject,
    deleting: deletingProject,
    error: deleteProjectError,
  } = useDeleteProject({ onSuccess: handleDeleteSuccess });

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

  const handleDeleteProject = useCallback(() => {
    if (!project) return;

    confirmDestructive({
      title: COPY.deleteProject.title,
      message: COPY.deleteProject.message(project.name),
      cancelLabel: COPY.common.cancel,
      confirmLabel: COPY.deleteProject.confirm,
      onConfirm: () => {
        if (projectId) {
          void removeProject(projectId);
        }
      },
    });
  }, [project, projectId, removeProject]);

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
          completingTaskId={completingTaskId}
          completeTaskError={completeTaskError}
          deletingNoteId={deletingNoteId}
          deleteNoteError={deleteNoteError}
          deletingProject={deletingProject}
          deleteProjectError={deleteProjectError}
          onSaveNote={handleSaveNote}
          onCompleteTask={handleCompleteTask}
          onDeleteNote={handleDeleteNote}
          onDeleteProject={handleDeleteProject}
        />
      ) : null}
    </ResourceScreenShell>
  );
}
