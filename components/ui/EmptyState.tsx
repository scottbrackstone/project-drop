import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { SPACING } from '@/constants/theme';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View
      className="items-center justify-center gap-4 py-16"
      style={{ paddingHorizontal: SPACING.screenPadding + 8 }}
    >
      <Text className="text-center text-xl font-semibold text-neutral-900">{title}</Text>
      <Text className="text-center text-base leading-7 text-neutral-600">{description}</Text>
      {actionLabel && onAction ? (
        <View className="mt-2 w-full max-w-xs">
          <Button title={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}
