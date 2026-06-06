import { COPY } from '@/constants/copy';
import { EmptyState } from '@/components/ui/EmptyState';
import { SectionCard } from '@/components/ui/SectionCard';

export function ProjectTasksSection() {
  return (
    <SectionCard title={COPY.projectDetail.tasksTitle}>
      <EmptyState
        title={COPY.projectDetail.tasksEmptyTitle}
        description={COPY.projectDetail.tasksEmptyDescription}
      />
    </SectionCard>
  );
}
