import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { COPY } from '@/constants/copy';

interface VoiceTranscriptActionsProps {
  onUseMockTranscript: () => void;
  transcribing: boolean;
  error: string | null;
  showMockWarning: boolean;
  mockDisabled: boolean;
  disabled: boolean;
}

export function VoiceTranscriptActions({
  onUseMockTranscript,
  transcribing,
  error,
  showMockWarning,
  mockDisabled,
  disabled,
}: VoiceTranscriptActionsProps) {
  return (
    <View className="gap-2">
      <Button
        title={transcribing ? COPY.voice.transcribingMock : COPY.voice.useMockTranscript}
        onPress={onUseMockTranscript}
        loading={transcribing}
        variant="secondary"
        size="sm"
        disabled={disabled || mockDisabled || transcribing}
      />

      {mockDisabled ? (
        <Text className="text-xs text-neutral-500">{COPY.voice.mockTranscriptDisabledHint}</Text>
      ) : null}

      {showMockWarning ? (
        <Text className="text-sm text-amber-700">{COPY.voice.mockTranscriptWarning}</Text>
      ) : null}

      {error ? <Text className="text-sm text-red-600">{error}</Text> : null}
    </View>
  );
}
