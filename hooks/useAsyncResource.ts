import { useCallback, useEffect, useState } from 'react';

import { getErrorMessage } from '@/lib/utils/errors';

interface UseAsyncResourceOptions {
  enabled?: boolean;
}

interface UseAsyncResourceResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useAsyncResource<T>(
  fetcher: () => Promise<T | null>,
  options: UseAsyncResourceOptions = {},
): UseAsyncResourceResult<T> {
  const { enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(getErrorMessage(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [enabled, fetcher]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
