import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { ResourceScreenShell } from '@/components/layout/ResourceScreenShell';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ProjectOutputsContent } from '@/components/outputs/ProjectOutputsContent';
import type { OutputDisplayItem } from '@/components/outputs/OutputPreview';
import { COPY } from '@/constants/copy';
import { useCopyOutput } from '@/hooks/useCopyOutput';
import { useDeleteProjectOutput } from '@/hooks/useDeleteProjectOutput';
import { useGenerateProjectOutput } from '@/hooks/useGenerateProjectOutput';
import { useOutputModePreferences } from '@/hooks/useOutputModePreferences';
import { useProject } from '@/hooks/useProject';
import { useProjectOutputs } from '@/hooks/useProjectOutputs';
import { useShareOutput } from '@/hooks/useShareOutput';
import { confirmDestructive } from '@/lib/utils/confirmDestructive';
import type { ProjectOutputMode, ProjectOutputScope } from '@/types/projectOutput';
import type { ProjectOutput } from '@/types/report';

function toDisplayOutput(output: ProjectOutput): OutputDisplayItem {
  return {
    id: output.id,
    title: output.title,
    content: output.content,
    mode: output.mode,
    scope: output.scope,
    createdAt: output.createdAt,
  };
}

export default function ProjectOutputsScreen() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { project, loading, error } = useProject(projectId);
  const { outputs, loading: outputsLoading, refresh: refreshOutputs } = useProjectOutputs(projectId);
  const { enabledModes, loading: prefsLoading } = useOutputModePreferences();

  const [mode, setMode] = useState<ProjectOutputMode>('snapshot');
  const [scope, setScope] = useState<ProjectOutputScope>('full');
  const [selectedOutput, setSelectedOutput] = useState<ProjectOutput | null>(null);

  const { copy, copied, error: copyError, clearError: clearCopyError } = useCopyOutput();
  const { share, error: shareError, clearError: clearShareError } = useShareOutput();

  useEffect(() => {
    if (enabledModes.length === 0) return;
    if (!enabledModes.includes(mode)) {
      setMode(enabledModes[0]);
    }
  }, [enabledModes, mode]);

  const handleSaved = useCallback(
    async (saved: ProjectOutput) => {
      await refreshOutputs();
      setSelectedOutput(saved);
    },
    [refreshOutputs],
  );

  const {
    generate,
    generating,
    preview,
    error: generateError,
    clearPreview,
  } = useGenerateProjectOutput(projectId, {
    onSaved: handleSaved,
  });

  const handleDeleteSuccess = useCallback(async () => {
    await refreshOutputs();
  }, [refreshOutputs]);

  const {
    remove: removeOutput,
    deletingOutputId,
    error: deleteError,
    clearError: clearDeleteError,
  } = useDeleteProjectOutput({ onSuccess: handleDeleteSuccess });

  const displayOutput = useMemo((): OutputDisplayItem | null => {
    if (selectedOutput) {
      return toDisplayOutput(selectedOutput);
    }

    if (preview) {
      return {
        title: preview.title,
        content: preview.content,
        mode: preview.mode,
        scope: preview.scope,
      };
    }

    return null;
  }, [selectedOutput, preview]);

  const actionError = copyError ?? shareError ?? deleteError;

  const handleGenerate = useCallback(async () => {
    clearCopyError();
    clearShareError();
    clearDeleteError();
    setSelectedOutput(null);
    await generate(mode, scope);
  }, [
    clearCopyError,
    clearDeleteError,
    clearShareError,
    generate,
    mode,
    scope,
  ]);

  const handleRegenerate = useCallback(() => {
    void handleGenerate();
  }, [handleGenerate]);

  const handleSelectOutput = useCallback(
    (output: ProjectOutput) => {
      clearCopyError();
      clearShareError();
      clearDeleteError();
      clearPreview();
      setSelectedOutput(output);
    },
    [clearCopyError, clearDeleteError, clearPreview, clearShareError],
  );

  const handleCopy = useCallback(() => {
    if (!displayOutput) return;
    void copy(displayOutput);
  }, [copy, displayOutput]);

  const handleShare = useCallback(() => {
    if (!displayOutput) return;
    void share(displayOutput);
  }, [displayOutput, share]);

  const handleDelete = useCallback(() => {
    if (!selectedOutput?.id) return;

    const outputId = selectedOutput.id;

    confirmDestructive({
      title: COPY.outputs.deleteOutput.title,
      message: COPY.outputs.deleteOutput.message,
      cancelLabel: COPY.common.cancel,
      confirmLabel: COPY.outputs.deleteOutput.confirm,
      onConfirm: () => {
        void removeOutput(outputId).then((success) => {
          if (success && selectedOutput.id === outputId) {
            setSelectedOutput(null);
            clearPreview();
          }
        });
      },
    });
  }, [clearPreview, removeOutput, selectedOutput]);

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
            displayOutput={displayOutput}
            outputs={outputs}
            outputsLoading={outputsLoading}
            selectedId={selectedOutput?.id ?? null}
            copied={copied}
            actionError={actionError}
            deletingOutputId={deletingOutputId}
            onModeChange={setMode}
            onScopeChange={setScope}
            onGenerate={handleGenerate}
            onSelectOutput={handleSelectOutput}
            onCopy={handleCopy}
            onShare={handleShare}
            onRegenerate={handleRegenerate}
            onDelete={handleDelete}
          />
        ) : (
          <LoadingSpinner label={COPY.outputs.historyLoading} />
        )
      ) : null}
    </ResourceScreenShell>
  );
}
