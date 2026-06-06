import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { COPY } from '@/constants/copy';
import { SURFACES } from '@/constants/ui';

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
    <View className={`${SURFACES.dangerZone} gap-3`}>
      <Text className="text-base font-semibold text-red-900">{COPY.deleteProject.sectionTitle}</Text>
      <Text className="text-sm leading-5 text-neutral-600">
        {COPY.deleteProject.sectionDescription}
      </Text>
      <Text className="text-sm font-medium text-neutral-800">{projectName}</Text>
      {error ? <Text className="text-sm text-red-600">{error}</Text> : null}
      <Button
        title={COPY.deleteProject.button}
        variant="danger"
        onPress={onDelete}
        loading={deleting}
        disabled={deleting}
      />
    </View>
  );
}
