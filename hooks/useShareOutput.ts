import { useCallback, useState } from 'react';
import { Share } from 'react-native';

import { formatOutputForSharing, type OutputTextSource } from '@/lib/utils/outputText';
import { getErrorMessage } from '@/lib/utils/errors';

interface UseShareOutputResult {
  share: (output: OutputTextSource) => Promise<boolean>;
  error: string | null;
  clearError: () => void;
}

export function useShareOutput(): UseShareOutputResult {
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const share = useCallback(async (output: OutputTextSource): Promise<boolean> => {
    setError(null);

    try {
      const message = formatOutputForSharing(output);
      await Share.share({ message, title: output.title });
      return true;
    } catch (err) {
      setError(getErrorMessage(err));
      return false;
    }
  }, []);

  return { share, error, clearError };
}
