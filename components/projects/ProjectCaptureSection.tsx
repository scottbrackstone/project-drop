import { NoteCaptureForm } from '@/components/notes/NoteCaptureForm';
import { SectionCard } from '@/components/ui/SectionCard';
import { COPY } from '@/constants/copy';

interface ProjectCaptureSectionProps {
  onSubmit: (transcript: string) => Promise<boolean>;
  submitting: boolean;
  error: string | null;
}

export function ProjectCaptureSection({
  onSubmit,
  submitting,
  error,
}: ProjectCaptureSectionProps) {
  return (
    <SectionCard title={COPY.projectDetail.captureTitle}>
      <NoteCaptureForm onSubmit={onSubmit} submitting={submitting} error={error} />
    </SectionCard>
  );
}
