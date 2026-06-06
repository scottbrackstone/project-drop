import { Switch, Text, View } from 'react-native';

import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { SectionCard } from '@/components/ui/SectionCard';
import { COPY, getOutputModeLabel } from '@/constants/copy';
import { PROJECT_OUTPUT_MODES, type ProjectOutputMode } from '@/types/projectOutput';
import type { OutputModePreferences } from '@/types/settings';

interface OutputSettingsContentProps {
  preferences: OutputModePreferences | null;
  loading: boolean;
  error: string | null;
  onToggle: (mode: ProjectOutputMode, enabled: boolean) => void;
}

export function OutputSettingsContent({
  preferences,
  loading,
  error,
  onToggle,
}: OutputSettingsContentProps) {
  if (loading || !preferences) {
    return <LoadingSpinner />;
  }

  const enabledCount = PROJECT_OUTPUT_MODES.filter((mode) => preferences[mode]).length;

  return (
    <View className="gap-4">
      <Text className="text-sm text-neutral-600">{COPY.settings.outputSettingsDescription}</Text>
      {error ? <Text className="text-sm text-red-600">{error}</Text> : null}
      <SectionCard title={COPY.settings.outputSettingsTitle}>
        <View className="gap-3">
          {PROJECT_OUTPUT_MODES.map((mode) => {
            const enabled = preferences[mode];
            const isLastEnabled = enabled && enabledCount <= 1;

            return (
              <View
                key={mode}
                className="flex-row items-center justify-between gap-3 border-b border-neutral-100 py-3 last:border-b-0"
              >
                <View className="flex-1">
                  <Text className="text-base font-medium text-neutral-900">
                    {getOutputModeLabel(mode)}
                  </Text>
                  {isLastEnabled ? (
                    <Text className="mt-1 text-xs text-neutral-500">
                      {COPY.settings.lastModeWarning}
                    </Text>
                  ) : null}
                </View>
                <Switch
                  value={enabled}
                  onValueChange={(value) => onToggle(mode, value)}
                  disabled={isLastEnabled}
                />
              </View>
            );
          })}
        </View>
      </SectionCard>
    </View>
  );
}
