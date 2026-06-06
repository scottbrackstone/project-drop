import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/layout/Header';

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  subtitle?: string;
}

export function AppShell({ children, title, showBack = false, subtitle }: AppShellProps) {
  return (
    <SafeAreaView className="flex-1 bg-neutral-50" edges={['top', 'left', 'right']}>
      <Header title={title} showBack={showBack} subtitle={subtitle} />
      <View className="flex-1 px-4 py-4">{children}</View>
    </SafeAreaView>
  );
}
