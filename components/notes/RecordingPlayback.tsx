import { Text, View } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

import { Button } from '@/components/ui/Button';
import { COPY, formatPlaybackTime } from '@/constants/copy';
import { formatRecordingDuration } from '@/lib/audio/recorder';

interface RecordingPlaybackProps {
  uri: string;
}

export function RecordingPlayback({ uri }: RecordingPlaybackProps) {
  const player = useAudioPlayer(uri);
  const status = useAudioPlayerStatus(player);
  const isPlaying = status.playing;

  return (
    <View className="gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
      <Text className="text-sm font-medium text-neutral-700">{COPY.voice.savedRecording}</Text>
      <Text className="text-xs text-neutral-500">
        {formatPlaybackTime(formatRecordingDuration(status.currentTime * 1000))}
      </Text>
      <View className="flex-row gap-2">
        <View className="flex-1">
          <Button
            title={isPlaying ? COPY.voice.pausePlayback : COPY.voice.playRecording}
            variant="secondary"
            size="sm"
            onPress={() => {
              if (isPlaying) {
                player.pause();
              } else {
                if (status.currentTime >= status.duration && status.duration > 0) {
                  player.seekTo(0);
                }
                player.play();
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}
