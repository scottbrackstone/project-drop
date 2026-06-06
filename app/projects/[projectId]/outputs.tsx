import { useCallback, useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { ResourceScreenShell } from '@/components/layout/ResourceScreenShell';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ProjectOutputsContent } from '@/components/outputs/ProjectOutputsContent';
import { COPY } from '@/constants/copy';
import { useGenerateProjectOutput } from '@/hooks/useGenerateProjectOutput';
import { useOutputModePreferences } from '@/hooks/useOutputModePreferences';
import { useProject } from '@/hooks/useProject';
import { useProjectOutputs } from '@/hooks/useProjectOutputs';
import type { ProjectOutputMode, ProjectOutputScope } from '@/types/projectOutput';

export default function ProjectOutputsScreen() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { project, loading, error } = useProject(projectId);
  const { outputs, loading: outputsLoading, refresh: refreshOutputs } = useProjectOutputs(projectId);
  const { enabledModes, loading: prefsLoading } = useOutputModePreferences();

  const [mode, setMode] = useState<ProjectOutputMode>('snapshot');
  const [scope, setScope] = useState<ProjectOutputScope>('full');

  useEffect(() => {
    if (enabledModes.length === 0) return;
    if (!enabledModes.includes(mode)) {
      setMode(enabledModes[0]);
    }
  }, [enabledModes, mode]);

  const handleSaved = useCallback(async () => {
    await refreshOutputs();
  }, [refreshOutputs]);

  const { generate, generating, preview, error: generateError } = useGenerateProjectOutput(projectId, {
    onSaved: handleSaved,
  });

  const handleGenerate = useCallback(async () => {
    await generate(mode, scope);
  }, [generate, mode, scope]);

  const shellLoading = loading || prefsLoading;

  return (
    <ResourceScreenShell
      title={COPY.outputs.title}
      showBack
      subtitle={project?.name ?? COPY.outputs.subtitle}
      loading={shellLoading}
      loadingLabel={COPY.projectDetail.loadingLabel}
      error={error}
      notFound={!project}
      notFoundTitle={COPY.outputs.loadErrorTitle}
      notFoundDescription={COPY.projectDetail.notFoundDescription}
    >
      {project && !prefsLoading ? (
        enabledModes.length > 0 ? (
          <ProjectOutputsContent
            enabledModes={enabledModes}
            mode={mode}
            scope={scope}
            generating={generating}
            generateError={generateError}
            preview={preview}
            outputs={outputs}
            outputsLoading={outputsLoading}
            onModeChange={setMode}
            onScopeChange={setScope}
            onGenerate={handleGenerate}
          />
        ) : (
          <LoadingSpinner label={COPY.outputs.historyLoading} />
        )
      ) : null}
    </ResourceScreenShell>
  );
}
