import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SPACING } from '@/constants/theme';

export function useScreenBottomPadding(extra: number = SPACING.bottomExtra): number {
  const insets = useSafeAreaInsets();
  return Math.max(insets.bottom, 8) + extra;
}
