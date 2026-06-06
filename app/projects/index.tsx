import { AppShell } from '@/components/layout/AppShell';
import { ProjectsScreenContent } from '@/components/projects/ProjectsScreenContent';
import { COPY } from '@/constants/copy';
import { useProjects } from '@/hooks/useProjects';
import { useRefreshControl } from '@/hooks/useRefreshControl';

export default function ProjectsScreen() {
  const { projects, loading, error, refresh } = useProjects();
  const { refreshing, onRefresh } = useRefreshControl(refresh);

  return (
    <AppShell title={COPY.projects.title} showBack subtitle={COPY.projects.subtitle}>
      <ProjectsScreenContent
        projects={projects}
        loading={loading}
        error={error}
        refreshing={refreshing}
        onRefresh={() => void onRefresh()}
      />
    </AppShell>
  );
}
