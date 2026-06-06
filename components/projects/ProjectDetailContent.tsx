import { ScrollView, View } from 'react-native';

import { ProjectCaptureSection } from '@/components/projects/ProjectCaptureSection';
import { ProjectDeleteSection } from '@/components/projects/ProjectDeleteSection';
import { ProjectNotesSection } from '@/components/projects/ProjectNotesSection';
import { ProjectOutputsAction } from '@/components/projects/ProjectOutputsAction';
import { ProjectTasksSection } from '@/components/projects/ProjectTasksSection';
import { Badge } from '@/components/ui/Badge';
import type { CreateTextNoteOptions, NoteWithTags } from '@/types/note';
import type { Project } from '@/types/project';
import type { Task } from '@/types/task';

interface ProjectDetailContentProps {
  project: Project;
  notes: NoteWithTags[];
  tasks: Task[];
  notesLoading: boolean;
  tasksLoading: boolean;
  savingNote: boolean;
  saveError: string | null;
  completingTaskId: string | null;
  completeTaskError: string | null;
  deletingNoteId: string | null;
  deleteNoteError: string | null;
  deletingProject: boolean;
  deleteProjectError: string | null;
  onSaveNote: (transcript: string, options?: CreateTextNoteOptions) => Promise<boolean>;
  onCompleteTask: (taskId: string) => void;
  onDeleteNote: (noteId: string) => void;
  onDeleteProject: () => void;
}

export function ProjectDetailContent({
  project,
  notes,
  tasks,
  notesLoading,
  tasksLoading,
  savingNote,
  saveError,
  completingTaskId,
  completeTaskError,
  deletingNoteId,
  deleteNoteError,
  deletingProject,
  deleteProjectError,
  onSaveNote,
  onCompleteTask,
  onDeleteNote,
  onDeleteProject,
}: ProjectDetailContentProps) {
  return (
    <ScrollView className="flex-1" contentContainerClassName="gap-4 pb-8">
      <View className="flex-row items-center gap-2">
        <Badge label={project.status} />
      </View>

      <ProjectCaptureSection
        onSubmit={onSaveNote}
        submitting={savingNote}
        error={saveError}
      />
      <ProjectTasksSection
        tasks={tasks}
        loading={tasksLoading}
        completingTaskId={completingTaskId}
        taskError={completeTaskError}
        onCompleteTask={onCompleteTask}
      />
      <ProjectNotesSection
        notes={notes}
        loading={notesLoading}
        deletingNoteId={deletingNoteId}
        noteError={deleteNoteError}
        onDeleteNote={onDeleteNote}
      />
      <ProjectOutputsAction projectId={project.id} />
      <ProjectDeleteSection
        projectName={project.name}
        deleting={deletingProject}
        error={deleteProjectError}
        onDelete={onDeleteProject}
      />
    </ScrollView>
  );
}
