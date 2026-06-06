import { useRouter } from 'expo-router';

import { IconButton } from '@/components/ui/IconButton';
import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';

interface ProjectHeaderActionsProps {
  projectId: string;
}

export function ProjectHeaderActions({ projectId }: ProjectHeaderActionsProps) {
  const router = useRouter();

  return (
    <IconButton
      icon="⚙"
      accessibilityLabel={COPY.settings.settingsButton}
      onPress={() => router.push(ROUTES.projectSettings(projectId))}
    />
  );
}
