import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';

import { OutputGeneratorPanel } from '@/components/outputs/OutputGeneratorPanel';
import { OutputHistoryList } from '@/components/outputs/OutputHistoryList';
import { OutputPreview } from '@/components/outputs/OutputPreview';
import type { GeneratedProjectOutput, ProjectOutputMode, ProjectOutputScope } from '@/types/projectOutput';
import type { ProjectOutput } from '@/types/report';

interface ProjectOutputsContentProps {
  enabledModes: ProjectOutputMode[];
  mode: ProjectOutputMode;
  scope: ProjectOutputScope;
  generating: boolean;
  generateError: string | null;
  preview: GeneratedProjectOutput | null;
  outputs: ProjectOutput[];
  outputsLoading: boolean;
  onModeChange: (mode: ProjectOutputMode) => void;
  onScopeChange: (scope: ProjectOutputScope) => void;
  onGenerate: () => void;
}

export function ProjectOutputsContent({
  enabledModes,
  mode,
  scope,
  generating,
  generateError,
  preview,
  outputs,
  outputsLoading,
  onModeChange,
  onScopeChange,
  onGenerate,
}: ProjectOutputsContentProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [historyPreview, setHistoryPreview] = useState<GeneratedProjectOutput | null>(null);

  const handleSelect = useCallback((output: ProjectOutput) => {
    setSelectedId(output.id);
    setHistoryPreview({ title: output.title, content: output.content, mode: output.mode, scope: output.scope });
  }, []);

  const displayPreview = generating ? preview : (preview ?? historyPreview);

  return (
    <ScrollView className="flex-1" contentContainerClassName="gap-4 pb-8">
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
      <OutputPreview preview={displayPreview} generating={generating} />
      <OutputHistoryList
        outputs={outputs}
        loading={outputsLoading}
        selectedId={selectedId}
        onSelect={handleSelect}
      />
    </ScrollView>
  );
}
