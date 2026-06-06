import { useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { COPY } from '@/constants/copy';

interface NoteCaptureFormProps {
  onSubmit: (transcript: string) => Promise<boolean>;
  submitting: boolean;
  error: string | null;
}

export function NoteCaptureForm({ onSubmit, submitting, error }: NoteCaptureFormProps) {
  const [transcript, setTranscript] = useState('');

  async function handleSubmit() {
    const saved = await onSubmit(transcript);
    if (saved) setTranscript('');
  }

  return (
    <View className="gap-3">
      <Text className="text-sm text-neutral-600">{COPY.projectDetail.captureDescription}</Text>
      <Textarea
        label={COPY.projectDetail.captureTitle}
        value={transcript}
        onChangeText={setTranscript}
        placeholder={COPY.projectDetail.capturePlaceholder}
        editable={!submitting}
      />
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
