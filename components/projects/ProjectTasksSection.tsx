import { TaskList } from '@/components/tasks/TaskList';
import { SectionCard } from '@/components/ui/SectionCard';
import { COPY } from '@/constants/copy';
import type { Task } from '@/types/task';

interface ProjectTasksSectionProps {
  tasks: Task[];
  loading: boolean;
}

export function ProjectTasksSection({ tasks, loading }: ProjectTasksSectionProps) {
  return (
    <SectionCard title={COPY.projectDetail.tasksTitle}>
      <TaskList tasks={tasks} loading={loading} />
    </SectionCard>
  );
}
