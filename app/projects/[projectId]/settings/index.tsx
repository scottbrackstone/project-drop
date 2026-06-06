import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

import { AppShell } from '@/components/layout/AppShell';
import { SettingsMenu } from '@/components/settings/SettingsMenu';
import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { useProjectIdParam } from '@/hooks/useProjectIdParam';
import { useScrollContentStyle } from '@/hooks/useScrollContentStyle';

export default function ProjectSettingsIndexScreen() {
  const router = useRouter();
  const projectId = useProjectIdParam();
  const { contentContainerStyle } = useScrollContentStyle({ gap: 0 });

  return (
    <AppShell title={COPY.settings.title} showBack subtitle={COPY.settings.subtitle}>
      <ScrollView className="flex-1" contentContainerStyle={contentContainerStyle}>
        <SettingsMenu
          onOutputSettings={() => {
            if (projectId) {
              router.push(ROUTES.projectOutputSettings(projectId));
            }
          }}
          onProjectSettings={() => {
            if (projectId) {
              router.push(ROUTES.projectProjectSettings(projectId));
            }
          }}
        />
      </ScrollView>
    </AppShell>
  );
}
