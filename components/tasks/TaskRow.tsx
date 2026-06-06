import { Text, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import type { Task } from '@/types/task';

interface TaskRowProps {
  task: Task;
}

export function TaskRow({ task }: TaskRowProps) {
  return (
    <View className="flex-row items-start justify-between gap-3 border-b border-neutral-100 py-3">
      <Text className="flex-1 text-base text-neutral-900">{task.title}</Text>
      <Badge label={task.status} tone="warning" />
    </View>
  );
}
