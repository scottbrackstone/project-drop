import { Text, View } from 'react-native';

import { OutputModePicker } from '@/components/outputs/OutputModePicker';
import { OutputScopePicker } from '@/components/outputs/OutputScopePicker';
import { Button } from '@/components/ui/Button';
import { SectionCard } from '@/components/ui/SectionCard';
import { COPY } from '@/constants/copy';
import type { ProjectOutputMode, ProjectOutputScope } from '@/types/projectOutput';

interface OutputGeneratorPanelProps {
  mode: ProjectOutputMode;
  scope: ProjectOutputScope;
  generating: boolean;
  error: string | null;
  onModeChange: (mode: ProjectOutputMode) => void;
  onScopeChange: (scope: ProjectOutputScope) => void;
  onGenerate: () => void;
}

export function OutputGeneratorPanel({
  mode,
  scope,
  generating,
  error,
  onModeChange,
  onScopeChange,
  onGenerate,
}: OutputGeneratorPanelProps) {
  return (
    <SectionCard title={COPY.outputs.generatorTitle}>
      <View className="gap-2">
        <Text className="text-sm font-medium text-neutral-700">{COPY.outputs.modeLabel}</Text>
        <OutputModePicker value={mode} onChange={onModeChange} />
      </View>
      <View className="gap-2">
        <Text className="text-sm font-medium text-neutral-700">{COPY.outputs.scopeLabel}</Text>
        <OutputScopePicker value={scope} onChange={onScopeChange} />
      </View>
      {error ? <Text className="text-sm text-red-600">{error}</Text> : null}
      <Button
        title={generating ? COPY.outputs.generating : COPY.outputs.generateButton}
        onPress={onGenerate}
        loading={generating}
        disabled={generating}
      />
    </SectionCard>
  );
}
