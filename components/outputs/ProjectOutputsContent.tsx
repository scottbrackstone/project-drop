import { useCallback } from 'react';
import { ScrollView } from 'react-native';

import { OutputGeneratorPanel } from '@/components/outputs/OutputGeneratorPanel';
import { OutputHistoryList } from '@/components/outputs/OutputHistoryList';
import { OutputPreview, type OutputDisplayItem } from '@/components/outputs/OutputPreview';
import { useScrollContentStyle } from '@/hooks/useScrollContentStyle';
import type { ProjectOutputMode, ProjectOutputScope } from '@/types/projectOutput';
import type { ProjectOutput } from '@/types/report';

interface ProjectOutputsContentProps {
  enabledModes: ProjectOutputMode[];
  mode: ProjectOutputMode;
  scope: ProjectOutputScope;
  generating: boolean;
  generateError: string | null;
  displayOutput: OutputDisplayItem | null;
  outputs: ProjectOutput[];
  outputsLoading: boolean;
  selectedId: string | null;
  copied: boolean;
  actionError: string | null;
  deletingOutputId: string | null;
  onModeChange: (mode: ProjectOutputMode) => void;
  onScopeChange: (scope: ProjectOutputScope) => void;
  onGenerate: () => void;
  onSelectOutput: (output: ProjectOutput) => void;
  onCopy: () => void;
  onShare: () => void;
  onRegenerate: () => void;
  onDelete: () => void;
}

export function ProjectOutputsContent({
  enabledModes,
  mode,
  scope,
  generating,
  generateError,
  displayOutput,
  outputs,
  outputsLoading,
  selectedId,
  copied,
  actionError,
  deletingOutputId,
  onModeChange,
  onScopeChange,
  onGenerate,
  onSelectOutput,
  onCopy,
  onShare,
  onRegenerate,
  onDelete,
}: ProjectOutputsContentProps) {
  const { contentContainerStyle } = useScrollContentStyle();
  const isDeleting = Boolean(displayOutput?.id && deletingOutputId === displayOutput.id);

  return (
    <ScrollView className="flex-1" contentContainerStyle={contentContainerStyle}>
      <OutputGeneratorPanel
        enabledModes={enabledModes}
        mode={mode}
        scope={scope}
        generating={generating}
        error={generateError}
        onModeChange={onModeChange}
        onScopeChange={onScopeChange}
        onGenerate={onGenerate}
      />
      <OutputPreview
        output={displayOutput}
        generating={generating}
        deleting={isDeleting}
        copied={copied}
        actionError={actionError}
        onCopy={onCopy}
        onShare={onShare}
        onRegenerate={onRegenerate}
        onDelete={onDelete}
      />
      <OutputHistoryList
        outputs={outputs}
        loading={outputsLoading}
        selectedId={selectedId}
        onSelect={onSelectOutput}
      />
    </ScrollView>
  );
}
