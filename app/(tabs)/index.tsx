import { View } from 'react-native';

import { ContinueProjectCard } from '@/components/home/ContinueProjectCard';
import { HomeActions } from '@/components/home/HomeActions';
import { HomeHero } from '@/components/home/HomeHero';
import { AppShell } from '@/components/layout/AppShell';
import { COPY } from '@/constants/copy';
import { APP_NAME } from '@/constants/theme';
import { useRecentProject } from '@/hooks/useRecentProject';

export default function HomeScreen() {
  const { recentProject, loading } = useRecentProject();

  return (
    <AppShell title={APP_NAME} subtitle={COPY.tagline}>
      <View className="flex-1 justify-center gap-6">
        <HomeHero />
        {!loading && recentProject ? (
          <ContinueProjectCard project={recentProject} />
        ) : null}
        <HomeActions />
      </View>
    </AppShell>
  );
}
