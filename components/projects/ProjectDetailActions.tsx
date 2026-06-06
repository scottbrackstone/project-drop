import { useRouter } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';

interface ProjectDetailActionsProps {
  projectId: string;
}

export function ProjectDetailActions({ projectId }: ProjectDetailActionsProps) {
  const router = useRouter();

  return (
    <Button
      title={COPY.projectDetail.projectOutputsButton}
      variant="secondary"
      onPress={() => router.push(ROUTES.projectOutputs(projectId))}
    />
  );
}
