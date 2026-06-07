import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { ROUTES } from '@/constants/routes';

export function useProjectNavigation() {
  const router = useRouter();

  const openProject = useCallback(
    (projectId: string) => {
      Alert.alert('Opening project', projectId);
      router.push(ROUTES.projectDetail(projectId));
    },
    [router],
  );

  return { openProject };
}
