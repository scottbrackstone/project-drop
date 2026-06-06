import { NoteCaptureForm } from '@/components/notes/NoteCaptureForm';
import { SectionCard } from '@/components/ui/SectionCard';
import { COPY } from '@/constants/copy';
import type { CreateTextNoteOptions } from '@/types/note';

interface ProjectCaptureSectionProps {
  onSubmit: (transcript: string, options?: CreateTextNoteOptions) => Promise<boolean>;
  submitting: boolean;
  error: string | null;
}

export function ProjectCaptureSection({
  onSubmit,
  submitting,
  error,
}: ProjectCaptureSectionProps) {
  return (
    <SectionCard
      title={COPY.projectDetail.captureTitle}
      description={COPY.projectDetail.captureDescription}
    >
      <NoteCaptureForm onSubmit={onSubmit} submitting={submitting} error={error} />
    </SectionCard>
  );
}
