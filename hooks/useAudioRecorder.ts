import { useCallback, useEffect, useState } from 'react';
import {
  useAudioRecorder as useExpoAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';

import {
  ensureMicrophonePermission,
  getMicrophonePermissionState,
  type MicrophonePermissionState,
} from '@/lib/audio/permissions';
import { configureRecordingAudioMode, RecordingPresets } from '@/lib/audio/recorder';
import { getErrorMessage } from '@/lib/utils/errors';

interface UseAudioRecorderResult {
  isRecording: boolean;
  durationMillis: number;
  recordingUri: string | null;
  permission: MicrophonePermissionState;
  permissionDenied: boolean;
  isBusy: boolean;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  discardRecording: () => Promise<void>;
  clearError: () => void;
}

export function useAudioRecorder(): UseAudioRecorderResult {
  const recorder = useExpoAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [permission, setPermission] = useState<MicrophonePermissionState>('undetermined');
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getMicrophonePermissionState().then(setPermission);
  }, []);

  const startRecording = useCallback(async () => {
    setIsBusy(true);
    setError(null);

    try {
      const granted = await ensureMicrophonePermission();
      setPermission(granted ? 'granted' : 'denied');

      if (!granted) {
        setError('Microphone permission is required to record voice notes.');
        return;
      }

      await configureRecordingAudioMode();
      setRecordingUri(null);
      await recorder.prepareToRecordAsync();
      recorder.record();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsBusy(false);
    }
  }, [recorder]);

  const stopRecording = useCallback(async () => {
    if (!recorderState.isRecording) return;

    setIsBusy(true);
    setError(null);

    try {
      await recorder.stop();
      setRecordingUri(recorder.uri ?? null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsBusy(false);
    }
  }, [recorder, recorderState.isRecording]);

  const discardRecording = useCallback(async () => {
    setIsBusy(true);
    setError(null);

    try {
      if (recorderState.isRecording) {
        await recorder.stop();
      }
      setRecordingUri(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsBusy(false);
    }
  }, [recorder, recorderState.isRecording]);

  const clearError = useCallback(() => setError(null), []);

  return {
    isRecording: recorderState.isRecording,
    durationMillis: recorderState.durationMillis,
    recordingUri,
    permission,
    permissionDenied: permission === 'denied',
    isBusy,
    error,
    startRecording,
    stopRecording,
    discardRecording,
    clearError,
  };
}
