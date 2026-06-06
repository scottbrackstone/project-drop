import { ScrollView } from 'react-native';

import { AppShell } from '@/components/layout/AppShell';
import { OutputSettingsContent } from '@/components/settings/OutputSettingsContent';
import { COPY } from '@/constants/copy';
import { useOutputModePreferences } from '@/hooks/useOutputModePreferences';
import type { ProjectOutputMode } from '@/types/projectOutput';

export default function ProjectOutputSettingsScreen() {
  const { preferences, loading, error, setModeEnabled } = useOutputModePreferences();

  function handleToggle(mode: ProjectOutputMode, enabled: boolean) {
    void setModeEnabled(mode, enabled);
  }

  return (
    <AppShell title={COPY.settings.outputSettingsTitle} showBack>
      <ScrollView className="flex-1" contentContainerClassName="pb-8">
        <OutputSettingsContent
          preferences={preferences}
          loading={loading}
          error={error}
          onToggle={handleToggle}
        />
      </ScrollView>
    </AppShell>
  );
}
