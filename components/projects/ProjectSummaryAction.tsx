import { COPY } from '@/constants/copy';
import { Button } from '@/components/ui/Button';

export function ProjectSummaryAction() {
  return <Button title={COPY.projectDetail.summariseButton} disabled variant="ghost" />;
}
