import { useCallback } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

import { ResourceScreenShell } from '@/components/layout/ResourceScreenShell';
import { ProjectSettingsContent } from '@/components/settings/ProjectSettingsContent';
import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { useDeleteProject } from '@/hooks/useDeleteProject';
import { useProject } from '@/hooks/useProject';
import { useScrollContentStyle } from '@/hooks/useScrollContentStyle';
import {
  clearRecentProjectId,
  loadRecentProjectId,
} from '@/lib/settings/recentProject';
import { confirmDestructive } from '@/lib/utils/confirmDestructive';

export default function ProjectProjectSettingsScreen() {
  const router = useRouter();
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { project, loading, error } = useProject(projectId);

  const { contentContainerStyle } = useScrollContentStyle();

  const handleDeleteSuccess = useCallback(async () => {
    const recentId = await loadRecentProjectId();
    if (recentId && recentId === projectId) {
      await clearRecentProjectId();
    }
    router.replace(ROUTES.projects);
  }, [projectId, router]);

  const {
    remove: removeProject,
    deleting,
    error: deleteError,
  } = useDeleteProject({ onSuccess: handleDeleteSuccess });

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
      title={COPY.settings.projectSettingsTitle}
      showBack
      loading={loading}
      loadingLabel={COPY.projectDetail.loadingLabel}
      error={error}
      notFound={!project}
      notFoundTitle={COPY.projectDetail.notFoundTitle}
      notFoundDescription={COPY.projectDetail.notFoundDescription}
    >
      {project ? (
        <ScrollView className="flex-1" contentContainerStyle={contentContainerStyle}>
          <ProjectSettingsContent
            project={project}
            deleting={deleting}
            deleteError={deleteError}
            onDeleteProject={handleDeleteProject}
          />
        </ScrollView>
      ) : null}
    </ResourceScreenShell>
  );
}
