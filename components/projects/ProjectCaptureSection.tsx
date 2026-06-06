import { COPY } from '@/constants/copy';
import { SectionCard, SectionPlaceholder } from '@/components/ui/SectionCard';
import { Button } from '@/components/ui/Button';

export function ProjectCaptureSection() {
  return (
    <SectionCard title={COPY.projectDetail.captureTitle}>
      <SectionPlaceholder description={COPY.projectDetail.captureDescription} />
      <Button title={COPY.projectDetail.captureButton} disabled variant="secondary" />
    </SectionCard>
  );
}
