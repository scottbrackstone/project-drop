import {
  Pressable,
  type PressableProps,
  type PressableStateCallbackType,
} from 'react-native';

import { CARD_SHADOW, SURFACE_PADDING, SURFACES } from '@/constants/ui';

interface PressableCardProps extends PressableProps {
  className?: string;
}

export function PressableCard({
  children,
  className = '',
  style,
  accessibilityRole = 'button',
  ...props
}: PressableCardProps) {
  const cardStyle =
    typeof style === 'function'
      ? (state: PressableStateCallbackType) => [
          SURFACE_PADDING.card,
          CARD_SHADOW,
          style(state),
        ]
      : [SURFACE_PADDING.card, CARD_SHADOW, style];

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      className={`${SURFACES.card} active:bg-neutral-50 ${className}`}
      style={cardStyle}
      {...props}
    >
      {children}
    </Pressable>
  );
}

