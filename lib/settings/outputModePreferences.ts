import AsyncStorage from '@react-native-async-storage/async-storage';

import { PROJECT_OUTPUT_MODES, type ProjectOutputMode } from '@/types/projectOutput';
import type { OutputModePreferences } from '@/types/settings';

const STORAGE_KEY = '@projectdrop/output-mode-preferences';

export function getDefaultOutputModePreferences(): OutputModePreferences {
  return PROJECT_OUTPUT_MODES.reduce<OutputModePreferences>((acc, mode) => {
    acc[mode] = true;
    return acc;
  }, {} as OutputModePreferences);
}

function isValidPreferences(value: unknown): value is OutputModePreferences {
  if (!value || typeof value !== 'object') return false;

  return PROJECT_OUTPUT_MODES.every((mode) => {
    const enabled = (value as OutputModePreferences)[mode];
    return typeof enabled === 'boolean';
  });
}

export async function loadOutputModePreferences(): Promise<OutputModePreferences> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultOutputModePreferences();

    const parsed: unknown = JSON.parse(raw);
    if (!isValidPreferences(parsed)) return getDefaultOutputModePreferences();

    return parsed;
  } catch {
    return getDefaultOutputModePreferences();
  }
}

export async function saveOutputModePreferences(
  preferences: OutputModePreferences,
): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}

export function getEnabledOutputModes(preferences: OutputModePreferences): ProjectOutputMode[] {
  return PROJECT_OUTPUT_MODES.filter((mode) => preferences[mode]);
}

export function setOutputModeEnabled(
  preferences: OutputModePreferences,
  mode: ProjectOutputMode,
  enabled: boolean,
): OutputModePreferences {
  if (!enabled) {
    const enabledCount = getEnabledOutputModes(preferences).length;
    if (enabledCount <= 1 && preferences[mode]) {
      return preferences;
    }
  }

  return { ...preferences, [mode]: enabled };
}
