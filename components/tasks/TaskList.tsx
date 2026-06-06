import { View } from 'react-native';

import { TaskRow } from '@/components/tasks/TaskRow';
import { CompactEmpty } from '@/components/ui/CompactEmpty';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { COPY } from '@/constants/copy';
import type { Task } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
}

export function TaskList({ tasks, loading }: TaskListProps) {
  if (loading) {
    return <LoadingSpinner label={COPY.projectDetail.tasksLoading} />;
  }

  if (tasks.length === 0) {
    return <CompactEmpty message={COPY.projectDetail.tasksEmpty} />;
  }

  return (
    <View>
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </View>
  );
}
