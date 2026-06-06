import { useCallback, useRef, useState } from 'react';
import * as Clipboard from 'expo-clipboard';

import { formatOutputForSharing, type OutputTextSource } from '@/lib/utils/outputText';
import { getErrorMessage } from '@/lib/utils/errors';

const COPIED_FEEDBACK_MS = 2000;

interface UseCopyOutputResult {
  copy: (output: OutputTextSource) => Promise<boolean>;
  copied: boolean;
  error: string | null;
  clearError: () => void;
}

export function useCopyOutput(): UseCopyOutputResult {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const copy = useCallback(async (output: OutputTextSource): Promise<boolean> => {
    setError(null);

    try {
      await Clipboard.setStringAsync(formatOutputForSharing(output));
      setCopied(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, COPIED_FEEDBACK_MS);

      return true;
    } catch (err) {
      setError(getErrorMessage(err));
      return false;
    }
  }, []);

  return { copy, copied, error, clearError };
}
