import { Text, View } from 'react-native';

import { RecordingPlayback } from '@/components/notes/RecordingPlayback';
import { Button } from '@/components/ui/Button';
import { COPY } from '@/constants/copy';
import { formatRecordingDuration } from '@/lib/audio/recorder';

interface VoiceRecorderProps {
  isRecording: boolean;
  durationMillis: number;
  recordingUri: string | null;
  permissionDenied: boolean;
  isBusy: boolean;
  error: string | null;
  onStart: () => void;
  onStop: () => void;
  onDiscard: () => void;
}

export function VoiceRecorder({
  isRecording,
  durationMillis,
  recordingUri,
  permissionDenied,
  isBusy,
  error,
  onStart,
  onStop,
  onDiscard,
}: VoiceRecorderProps) {
  const showPlayback = Boolean(recordingUri) && !isRecording;

  return (
    <View className="gap-3">
      <Text className="text-sm font-medium text-neutral-800">{COPY.voice.title}</Text>
      <Text className="text-sm text-neutral-600">{COPY.voice.description}</Text>

      {permissionDenied ? (
        <Text className="text-sm text-amber-700">{COPY.voice.permissionDenied}</Text>
      ) : null}

      <View className="flex-row items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3">
        <Text className="text-base font-mono text-neutral-900">
          {formatRecordingDuration(durationMillis)}
        </Text>
        <Text className="text-sm text-neutral-500">
          {isRecording ? COPY.voice.recording : COPY.voice.ready}
        </Text>
      </View>

      <View className="flex-row gap-2">
        {isRecording ? (
          <View className="flex-1">
            <Button
              title={COPY.voice.stopRecording}
              onPress={onStop}
              loading={isBusy}
              variant="primary"
            />
          </View>
        ) : (
          <View className="flex-1">
            <Button
              title={COPY.voice.startRecording}
              onPress={onStart}
              loading={isBusy}
              variant="secondary"
              disabled={permissionDenied}
            />
          </View>
        )}
        {showPlayback || isRecording ? (
          <View className="flex-1">
            <Button
              title={COPY.voice.discardRecording}
              onPress={onDiscard}
              variant="ghost"
              disabled={isBusy}
            />
          </View>
        ) : null}
      </View>

      {showPlayback && recordingUri ? <RecordingPlayback uri={recordingUri} /> : null}

      {error ? <Text className="text-sm text-red-600">{error}</Text> : null}
    </View>
  );
}
