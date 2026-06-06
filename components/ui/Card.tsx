import { View, type ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <View
      className={`rounded-2xl border border-neutral-200 bg-white p-4 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
