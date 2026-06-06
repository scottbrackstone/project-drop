import { Text, View } from 'react-native';

import { SectionCard } from '@/components/ui/SectionCard';
import { COPY } from '@/constants/copy';

interface OutputPreviewContent {
  title: string;
  content: string;
}

interface OutputPreviewProps {
  preview: OutputPreviewContent | null;
  generating: boolean;
}

export function OutputPreview({ preview, generating }: OutputPreviewProps) {
  if (!preview && !generating) {
    return null;
  }

  return (
    <SectionCard title={COPY.outputs.previewTitle}>
      {generating && !preview ? (
        <Text className="text-base text-neutral-600">{COPY.outputs.generating}</Text>
      ) : null}
      {preview ? (
        <View className="gap-3">
          <Text className="text-base font-semibold text-neutral-900">{preview.title}</Text>
          <Text className="text-base leading-6 text-neutral-800">{preview.content}</Text>
        </View>
      ) : null}
    </SectionCard>
  );
}
