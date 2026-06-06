import { COPY } from '@/constants/copy';
import { EmptyState } from '@/components/ui/EmptyState';
import { SectionCard } from '@/components/ui/SectionCard';

export function ProjectNotesSection() {
  return (
    <SectionCard title={COPY.projectDetail.notesTitle}>
      <EmptyState
        title={COPY.projectDetail.notesEmptyTitle}
        description={COPY.projectDetail.notesEmptyDescription}
      />
    </SectionCard>
  );
}
