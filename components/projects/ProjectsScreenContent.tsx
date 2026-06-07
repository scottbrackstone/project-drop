import { View } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenScroll } from '@/components/layout/ScreenScroll';
import { ProjectList } from '@/components/projects/ProjectList';
import { Button } from '@/components/ui/Button';
import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { useProjectNavigation } from '@/hooks/useProjectNavigation';
import type { ProjectWithStats } from '@/types/project';

interface ProjectsScreenContentProps {
  projects: ProjectWithStats[];
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  onRefresh: () => void;
}

export function ProjectsScreenContent({
  projects,
  loading,
  error,
  refreshing,
  onRefresh,
}: ProjectsScreenContentProps) {
  const router = useRouter();
  const { openProject } = useProjectNavigation();
  const navigateToCreate = () => router.push(ROUTES.projectsNew);

  return (
    <ScreenScroll refreshing={refreshing} onRefresh={onRefresh}>
      <View>
        <Button title={COPY.projects.createProject} onPress={navigateToCreate} />
      </View>
      <ProjectList
        projects={projects}
        loading={loading && !refreshing}
        error={error}
        onCreatePress={navigateToCreate}
        onProjectPress={openProject}
      />
    </ScreenScroll>
  );
}
