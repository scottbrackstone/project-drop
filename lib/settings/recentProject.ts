import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@projectdrop/recent-project-id';

export async function loadRecentProjectId(): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    return value?.trim() || null;
  } catch {
    return null;
  }
}

export async function saveRecentProjectId(projectId: string): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, projectId);
}

export async function clearRecentProjectId(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
