import { ScrollView, View } from 'react-native';

import { ProjectCaptureSection } from '@/components/projects/ProjectCaptureSection';
import { ProjectNotesSection } from '@/components/projects/ProjectNotesSection';
import { ProjectSummaryAction } from '@/components/projects/ProjectSummaryAction';
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
  onSaveNote: (transcript: string, options?: CreateTextNoteOptions) => Promise<boolean>;
}

export function ProjectDetailContent({
  project,
  notes,
  tasks,
  notesLoading,
  tasksLoading,
  savingNote,
  saveError,
  onSaveNote,
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
      <ProjectTasksSection tasks={tasks} loading={tasksLoading} />
      <ProjectNotesSection notes={notes} loading={notesLoading} />
      <ProjectSummaryAction />
    </ScrollView>
  );
}
