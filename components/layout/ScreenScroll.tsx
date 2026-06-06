import type { ReactNode } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

import { useScrollContentStyle } from '@/hooks/useScrollContentStyle';

interface ScreenScrollProps {
  children: ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ScreenScroll({ children, refreshing = false, onRefresh }: ScreenScrollProps) {
  const { contentContainerStyle } = useScrollContentStyle();

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={contentContainerStyle}
      refreshControl={
        onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined
      }
    >
      {children}
    </ScrollView>
  );
}
