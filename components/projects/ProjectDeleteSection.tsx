import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { SectionCard } from '@/components/ui/SectionCard';
import { COPY } from '@/constants/copy';

interface ProjectDeleteSectionProps {
  projectName: string;
  deleting: boolean;
  error: string | null;
  onDelete: () => void;
}

export function ProjectDeleteSection({
  projectName,
  deleting,
  error,
  onDelete,
}: ProjectDeleteSectionProps) {
  return (
    <SectionCard title={COPY.deleteProject.sectionTitle}>
      <Text className="text-sm text-neutral-600">{COPY.deleteProject.sectionDescription}</Text>
      <Text className="text-sm font-medium text-neutral-800">{projectName}</Text>
      {error ? <Text className="text-sm text-red-600">{error}</Text> : null}
      <View>
        <Button
          title={COPY.deleteProject.button}
          variant="secondary"
          onPress={onDelete}
          loading={deleting}
          disabled={deleting}
          className="border-red-200 bg-red-50"
        />
      </View>
    </SectionCard>
  );
}
