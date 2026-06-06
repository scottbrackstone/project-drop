import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Card } from '@/components/ui/Card';
import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import type { Project } from '@/types/project';

interface ContinueProjectCardProps {
  project: Project;
}

export function ContinueProjectCard({ project }: ContinueProjectCardProps) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(ROUTES.projectDetail(project.id))}>
      <Card className="gap-1 border-neutral-200 bg-white active:bg-neutral-50">
        <Text className="text-xs font-semibold uppercase tracking-wide text-sky-600">
          {COPY.home.continueLabel}
        </Text>
        <Text className="text-lg font-semibold text-neutral-900">{project.name}</Text>
        {project.description ? (
          <Text className="text-sm leading-5 text-neutral-500" numberOfLines={2}>
            {project.description}
          </Text>
        ) : null}
      </Card>
    </Pressable>
  );
}
