import { Text, View } from 'react-native';

import { HomeActions } from '@/components/home/HomeActions';
import { HomeHero } from '@/components/home/HomeHero';
import { AppShell } from '@/components/layout/AppShell';
import { COPY } from '@/constants/copy';
import { APP_NAME } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <AppShell title={APP_NAME} subtitle={COPY.tagline}>
      <View className="flex-1 justify-center gap-6">
        <HomeHero />
        <HomeActions />
      </View>
    </AppShell>
  );
}
