import { useCallback, useEffect, useState } from 'react';

import {
  getEnabledOutputModes,
  loadOutputModePreferences,
  saveOutputModePreferences,
  setOutputModeEnabled,
} from '@/lib/settings/outputModePreferences';
import { getErrorMessage } from '@/lib/utils/errors';
import type { ProjectOutputMode } from '@/types/projectOutput';
import type { OutputModePreferences } from '@/types/settings';

interface UseOutputModePreferencesResult {
  preferences: OutputModePreferences | null;
  enabledModes: ProjectOutputMode[];
  loading: boolean;
  error: string | null;
  setModeEnabled: (mode: ProjectOutputMode, enabled: boolean) => Promise<boolean>;
  refresh: () => Promise<void>;
}

export function useOutputModePreferences(): UseOutputModePreferencesResult {
  const [preferences, setPreferences] = useState<OutputModePreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const loaded = await loadOutputModePreferences();
      setPreferences(loaded);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const setModeEnabled = useCallback(
    async (mode: ProjectOutputMode, enabled: boolean): Promise<boolean> => {
      if (!preferences) return false;

      const next = setOutputModeEnabled(preferences, mode, enabled);
      if (next === preferences) return false;

      setPreferences(next);

      try {
        await saveOutputModePreferences(next);
        return true;
      } catch (err) {
        setPreferences(preferences);
        setError(getErrorMessage(err));
        return false;
      }
    },
    [preferences],
  );

  const enabledModes = preferences ? getEnabledOutputModes(preferences) : [];

  return { preferences, enabledModes, loading, error, setModeEnabled, refresh };
}
