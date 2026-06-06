import { Text, View } from 'react-native';

import { SectionCard } from '@/components/ui/SectionCard';
import { COPY } from '@/constants/copy';

export function ProjectEmptyGuide() {
  return (
    <SectionCard title={COPY.projectDetail.emptyProjectTitle}>
      <View className="gap-2">
        <Text className="text-sm leading-6 text-neutral-700">
          {COPY.projectDetail.emptyProjectBody}
        </Text>
        <Text className="text-sm leading-6 text-neutral-600">
          {COPY.projectDetail.emptyProjectHint}
        </Text>
      </View>
    </SectionCard>
  );
}
