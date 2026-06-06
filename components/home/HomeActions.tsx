import { View } from 'react-native';
import { useRouter } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';

export function HomeActions() {
  const router = useRouter();

  return (
    <View className="gap-3">
      <Button title={COPY.home.viewProjects} onPress={() => router.push(ROUTES.projects)} />
      <Button
        title={COPY.home.createProject}
        variant="secondary"
        onPress={() => router.push(ROUTES.projectsNew)}
      />
    </View>
  );
}
