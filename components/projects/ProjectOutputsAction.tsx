import { useRouter } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';

interface ProjectOutputsActionProps {
  projectId: string;
}

export function ProjectOutputsAction({ projectId }: ProjectOutputsActionProps) {
  const router = useRouter();

  return (
    <Button
      title={COPY.projectDetail.projectOutputsButton}
      variant="secondary"
      onPress={() => router.push(ROUTES.projectOutputs(projectId))}
    />
  );
}
