import { useCallback, useState } from 'react';

interface UseRefreshControlResult {
  refreshing: boolean;
  onRefresh: () => Promise<void>;
}

export function useRefreshControl(refresh: () => Promise<void>): UseRefreshControlResult {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refresh();
    } finally {
      setRefreshing(false);
    }
  }, [refresh]);

  return { refreshing, onRefresh };
}
