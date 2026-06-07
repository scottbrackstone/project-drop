import { Pressable, Text, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { formatRelativeDate } from '@/lib/utils/dates';
import { formatProjectStatsLine } from '@/lib/utils/projectStats';
import type { ProjectWithStats } from '@/types/project';

interface ProjectCardProps {
  project: ProjectWithStats;
  onPress: () => void;
}

export function ProjectCard({ project, onPress }: ProjectCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <Card className="gap-4 active:bg-neutral-50">
        <View className="flex-row items-start justify-between gap-3">
          <Text className="flex-1 text-lg font-semibold text-neutral-900">{project.name}</Text>
          <Badge label={project.status} />
        </View>
        {project.description ? (
          <Text className="text-sm leading-6 text-neutral-600" numberOfLines={2}>
            {project.description}
          </Text>
        ) : null}
        <View className="flex-row items-center justify-between gap-2">
          <Text className="text-sm font-medium text-neutral-700">
            {formatProjectStatsLine(project.noteCount, project.openTaskCount)}
          </Text>
          <Text className="text-xs text-neutral-400">
            Updated {formatRelativeDate(project.updatedAt)}
          </Text>
        </View>
      </Card>
    </Pressable>
  );
}
