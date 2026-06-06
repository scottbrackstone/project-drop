import { Text, View } from 'react-native';

import { ProjectDeleteSection } from '@/components/projects/ProjectDeleteSection';
import { Badge } from '@/components/ui/Badge';
import { SectionCard } from '@/components/ui/SectionCard';
import { COPY } from '@/constants/copy';
import type { Project } from '@/types/project';

interface ProjectSettingsContentProps {
  project: Project;
  deleting: boolean;
  deleteError: string | null;
  onDeleteProject: () => void;
}

export function ProjectSettingsContent({
  project,
  deleting,
  deleteError,
  onDeleteProject,
}: ProjectSettingsContentProps) {
  return (
    <View className="gap-4">
      <SectionCard title={COPY.settings.projectSummaryTitle}>
        <View className="gap-2">
          <Text className="text-base font-semibold text-neutral-900">{project.name}</Text>
          {project.description ? (
            <Text className="text-sm leading-5 text-neutral-600">{project.description}</Text>
          ) : null}
          <View className="mt-1">
            <Badge label={project.status} />
          </View>
        </View>
      </SectionCard>
      <ProjectDeleteSection
        projectName={project.name}
        deleting={deleting}
        error={deleteError}
        onDelete={onDeleteProject}
      />
    </View>
  );
}
