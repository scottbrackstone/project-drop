import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

import { AppShell } from '@/components/layout/AppShell';
import { SettingsMenu } from '@/components/settings/SettingsMenu';
import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';

export default function ProjectSettingsIndexScreen() {
  const router = useRouter();
  const { projectId } = useLocalSearchParams<{ projectId: string }>();

  return (
    <AppShell title={COPY.settings.title} showBack subtitle={COPY.settings.subtitle}>
      <ScrollView className="flex-1" contentContainerClassName="pb-8">
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
