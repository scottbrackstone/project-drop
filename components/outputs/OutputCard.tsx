import { Pressable, Text, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { getOutputModeLabel, getOutputScopeLabel } from '@/constants/copy';
import { formatDateTime } from '@/lib/utils/dates';
import type { ProjectOutput } from '@/types/report';

interface OutputCardProps {
  output: ProjectOutput;
  onPress: (output: ProjectOutput) => void;
}

export function OutputCard({ output, onPress }: OutputCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(output)}
      className="border-b border-neutral-100 py-3 active:bg-neutral-50"
    >
      <Text className="text-base font-semibold text-neutral-900">{output.title}</Text>
      <View className="mt-2 flex-row flex-wrap gap-2">
        <Badge label={getOutputModeLabel(output.mode)} />
        <Badge label={getOutputScopeLabel(output.scope)} tone="success" />
      </View>
      <Text className="mt-2 text-sm text-neutral-500">{formatDateTime(output.createdAt)}</Text>
    </Pressable>
  );
}
