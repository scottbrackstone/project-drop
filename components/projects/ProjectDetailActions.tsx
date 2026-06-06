import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';

interface ProjectDetailActionsProps {
  projectId: string;
}

export function ProjectDetailActions({ projectId }: ProjectDetailActionsProps) {
  const router = useRouter();

  return (
    <View className="flex-row gap-2">
      <View className="flex-1">
        <Button
          title={COPY.projectDetail.projectOutputsButton}
          variant="secondary"
          onPress={() => router.push(ROUTES.projectOutputs(projectId))}
        />
      </View>
      <View className="flex-1">
        <Button
          title={COPY.settings.settingsButton}
          variant="secondary"
          onPress={() => router.push(ROUTES.projectSettings(projectId))}
        />
      </View>
    </View>
  );
}
