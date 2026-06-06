import { useLocalSearchParams } from 'expo-router';

import { ResourceScreenShell } from '@/components/layout/ResourceScreenShell';
import { ProjectDetailContent } from '@/components/projects/ProjectDetailContent';
import { COPY } from '@/constants/copy';
import { useProject } from '@/hooks/useProject';

export default function ProjectDetailScreen() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { project, loading, error } = useProject(projectId);

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
      {project ? <ProjectDetailContent project={project} /> : null}
    </ResourceScreenShell>
  );
}
