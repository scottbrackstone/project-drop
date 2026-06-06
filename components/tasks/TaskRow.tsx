import { Text, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { COPY } from '@/constants/copy';
import type { Task } from '@/types/task';

interface TaskRowProps {
  task: Task;
  onComplete: (taskId: string) => void;
  completing: boolean;
}

export function TaskRow({ task, onComplete, completing }: TaskRowProps) {
  return (
    <View className="flex-row items-start justify-between gap-3 border-b border-neutral-100 py-3">
      <Text className="flex-1 text-base text-neutral-900">{task.title}</Text>
      <View className="flex-row items-center gap-2">
        <Badge label={task.status} tone="warning" />
        <Button
          title={COPY.projectDetail.completeTask}
          variant="ghost"
          size="sm"
          onPress={() => onComplete(task.id)}
          loading={completing}
          disabled={completing}
        />
      </View>
    </View>
  );
}
