import type { ReactNode } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

interface ScreenScrollProps {
  children: ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ScreenScroll({ children, refreshing = false, onRefresh }: ScreenScrollProps) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="gap-4 pb-8"
      refreshControl={
        onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined
      }
    >
      {children}
    </ScrollView>
  );
}
