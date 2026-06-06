import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View className="items-center justify-center gap-4 px-8 py-14">
      <Text className="text-center text-xl font-semibold text-neutral-900">{title}</Text>
      <Text className="text-center text-base leading-6 text-neutral-600">{description}</Text>
      {actionLabel && onAction ? (
        <View className="mt-1 w-full max-w-xs">
          <Button title={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}
