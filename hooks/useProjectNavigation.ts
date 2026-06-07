import { useCallback } from 'react';
import { useRouter } from 'expo-router';

import { ROUTES } from '@/constants/routes';

export function useProjectNavigation() {
  const router = useRouter();

  const openProject = useCallback(
    (projectId: string) => {
      router.push(ROUTES.projectDetail(projectId));
    },
    [router],
  );

  return { openProject };
}
