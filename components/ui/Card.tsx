import { View, type ViewProps } from 'react-native';

import { CARD_SHADOW, SURFACE_PADDING, SURFACES } from '@/constants/ui';

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ children, className = '', style, ...props }: CardProps) {
  return (
    <View
      className={`${SURFACES.card} ${className}`}
      style={[SURFACE_PADDING.card, CARD_SHADOW, style]}
      {...props}
    >
      {children}
    </View>
  );
}
