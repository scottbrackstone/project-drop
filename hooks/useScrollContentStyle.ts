import type { ViewStyle } from 'react-native';

import { SPACING } from '@/constants/theme';
import { useScreenBottomPadding } from '@/hooks/useScreenBottomPadding';

interface ScrollContentStyleOptions {
  gap?: number;
  extraBottom?: number;
}

export function useScrollContentStyle(
  options: ScrollContentStyleOptions = {},
): { contentContainerStyle: ViewStyle } {
  const { gap = SPACING.sectionGap, extraBottom = SPACING.bottomExtra } = options;
  const paddingBottom = useScreenBottomPadding(extraBottom);

  return {
    contentContainerStyle: {
      gap,
      paddingBottom,
    },
  };
}
