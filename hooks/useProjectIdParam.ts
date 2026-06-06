import { useLocalSearchParams } from 'expo-router';

import { getRouteParam } from '@/lib/utils/routeParams';

export function useProjectIdParam(): string | undefined {
  const { projectId } = useLocalSearchParams<{ projectId?: string | string[] }>();
  return getRouteParam(projectId);
}
