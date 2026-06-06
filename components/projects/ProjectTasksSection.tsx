import { Text } from 'react-native';

import { TaskList } from '@/components/tasks/TaskList';
import { SectionCard } from '@/components/ui/SectionCard';
import { COPY } from '@/constants/copy';
import type { Task } from '@/types/task';

interface ProjectTasksSectionProps {
  tasks: Task[];
  loading: boolean;
  completingTaskId: string | null;
  taskError: string | null;
  onCompleteTask: (taskId: string) => void;
}

export function ProjectTasksSection({
  tasks,
  loading,
  completingTaskId,
  taskError,
  onCompleteTask,
}: ProjectTasksSectionProps) {
  return (
    <SectionCard title={COPY.projectDetail.tasksTitle}>
      {taskError ? <Text className="text-sm text-red-600">{taskError}</Text> : null}
      <TaskList
        tasks={tasks}
        loading={loading}
        completingTaskId={completingTaskId}
        onCompleteTask={onCompleteTask}
      />
    </SectionCard>
  );
}
