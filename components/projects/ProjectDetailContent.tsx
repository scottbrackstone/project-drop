import { ScrollView, View } from 'react-native';

import { ProjectCaptureSection } from '@/components/projects/ProjectCaptureSection';
import { ProjectNotesSection } from '@/components/projects/ProjectNotesSection';
import { ProjectSummaryAction } from '@/components/projects/ProjectSummaryAction';
import { ProjectTasksSection } from '@/components/projects/ProjectTasksSection';
import { Badge } from '@/components/ui/Badge';
import type { Project } from '@/types/project';

interface ProjectDetailContentProps {
  project: Project;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  return (
    <ScrollView className="flex-1" contentContainerClassName="gap-4 pb-8">
      <View className="flex-row items-center gap-2">
        <Badge label={project.status} />
      </View>

      <ProjectCaptureSection />
      <ProjectTasksSection />
      <ProjectNotesSection />
      <ProjectSummaryAction />
    </ScrollView>
  );
}
