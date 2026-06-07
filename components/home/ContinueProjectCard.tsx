import { Pressable, Text } from 'react-native';

import { Card } from '@/components/ui/Card';
import { COPY } from '@/constants/copy';
import type { Project } from '@/types/project';

interface ContinueProjectCardProps {
  project: Project;
  onPress: () => void;
}

export function ContinueProjectCard({ project, onPress }: ContinueProjectCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <Card className="gap-1.5 border-neutral-200 bg-white active:bg-neutral-50">
        <Text className="text-xs font-semibold uppercase tracking-wide text-sky-600">
          {COPY.home.continueLabel}
        </Text>
        <Text className="text-lg font-semibold text-neutral-900">{project.name}</Text>
        {project.description ? (
          <Text className="text-sm leading-6 text-neutral-500" numberOfLines={2}>
            {project.description}
          </Text>
        ) : null}
      </Card>
    </Pressable>
  );
}
