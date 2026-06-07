import { View } from 'react-native';

import { ProjectCard } from '@/components/projects/ProjectCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { COPY } from '@/constants/copy';
import type { ProjectWithStats } from '@/types/project';

interface ProjectListProps {
  projects: ProjectWithStats[];
  loading: boolean;
  error: string | null;
  onCreatePress: () => void;
  onProjectPress: (projectId: string) => void;
}

export function ProjectList({
  projects,
  loading,
  error,
  onCreatePress,
  onProjectPress,
}: ProjectListProps) {
  if (loading) {
    return <LoadingSpinner label={COPY.projects.loading} />;
  }

  if (error) {
    return (
      <EmptyState
        title={COPY.projects.loadErrorTitle}
        description={error}
        actionLabel={COPY.projects.createProject}
        onAction={onCreatePress}
      />
    );
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        title={COPY.projects.emptyTitle}
        description={COPY.projects.emptyDescription}
        actionLabel={COPY.projects.createProject}
        onAction={onCreatePress}
      />
    );
  }

  return (
    <View className="gap-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onPress={() => onProjectPress(project.id)}
        />
      ))}
    </View>
  );
}
