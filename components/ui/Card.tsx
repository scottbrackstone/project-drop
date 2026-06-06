import { View, type ViewProps } from 'react-native';

import { SURFACES } from '@/constants/ui';

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <View className={`${SURFACES.card} ${className}`} {...props}>
      {children}
    </View>
  );
}
