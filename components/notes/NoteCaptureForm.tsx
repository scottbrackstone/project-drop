import { useState } from 'react';
import { Text, View } from 'react-native';

import { VoiceRecorder } from '@/components/notes/VoiceRecorder';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { COPY } from '@/constants/copy';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import type { CreateTextNoteOptions } from '@/types/note';

interface NoteCaptureFormProps {
  onSubmit: (transcript: string, options?: CreateTextNoteOptions) => Promise<boolean>;
  submitting: boolean;
  error: string | null;
}

export function NoteCaptureForm({ onSubmit, submitting, error }: NoteCaptureFormProps) {
  const [transcript, setTranscript] = useState('');
  const voice = useAudioRecorder();
  const hasRecording = Boolean(voice.recordingUri);

  async function handleSubmit() {
    const options: CreateTextNoteOptions | undefined = voice.recordingUri
      ? { audioUri: voice.recordingUri }
      : undefined;
    const saved = await onSubmit(transcript, options);
    if (saved) {
      setTranscript('');
      await voice.discardRecording();
    }
  }

  return (
    <View className="gap-4">
      <Text className="text-sm text-neutral-600">{COPY.projectDetail.captureDescription}</Text>

      <VoiceRecorder
        isRecording={voice.isRecording}
        durationMillis={voice.durationMillis}
        recordingUri={voice.recordingUri}
        permissionDenied={voice.permissionDenied}
        isBusy={voice.isBusy}
        error={voice.error}
        onStart={() => void voice.startRecording()}
        onStop={() => void voice.stopRecording()}
        onDiscard={() => void voice.discardRecording()}
      />

      <View className="gap-2">
        {!hasRecording ? (
          <Text className="text-sm font-medium text-neutral-700">
            {COPY.projectDetail.textDivider}
          </Text>
        ) : null}
        <Textarea
          label={hasRecording ? COPY.voice.transcriptLabel : COPY.projectDetail.captureTitle}
          value={transcript}
          onChangeText={setTranscript}
          placeholder={
            hasRecording
              ? COPY.voice.transcriptPlaceholder
              : COPY.projectDetail.capturePlaceholder
          }
          editable={!submitting}
        />
      </View>

      {error ? <Text className="text-sm text-red-600">{error}</Text> : null}
      <Button
        title={submitting ? COPY.projectDetail.captureProcessing : COPY.projectDetail.captureButton}
        onPress={() => void handleSubmit()}
        loading={submitting}
        disabled={!transcript.trim()}
      />
    </View>
  );
}
