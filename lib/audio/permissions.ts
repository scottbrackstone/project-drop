import { AudioModule } from 'expo-audio';

export type MicrophonePermissionState = 'granted' | 'denied' | 'undetermined';

export async function getMicrophonePermissionState(): Promise<MicrophonePermissionState> {
  const status = await AudioModule.getRecordingPermissionsAsync();
  if (status.granted) return 'granted';
  if (status.canAskAgain === false) return 'denied';
  return 'undetermined';
}

export async function requestMicrophonePermission(): Promise<boolean> {
  const status = await AudioModule.requestRecordingPermissionsAsync();
  return status.granted;
}

export async function ensureMicrophonePermission(): Promise<boolean> {
  const current = await getMicrophonePermissionState();
  if (current === 'granted') return true;
  if (current === 'denied') return false;
  return requestMicrophonePermission();
}
