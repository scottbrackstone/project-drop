import { ActivityIndicator, Text, View } from 'react-native';

import { COLORS } from '@/constants/theme';

interface LoadingSpinnerProps {
  label?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ label = 'Loading…', fullScreen = false }: LoadingSpinnerProps) {
  const content = (
    <View className="items-center justify-center gap-3">
      <ActivityIndicator size="large" color={COLORS.spinner} />
      <Text className="text-base text-neutral-600">{label}</Text>
    </View>
  );

  if (fullScreen) {
    return <View className="flex-1 items-center justify-center bg-neutral-50">{content}</View>;
  }

  return content;
}
