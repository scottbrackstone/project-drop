import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ROUTES } from '@/constants/routes';
import { formatRelativeDate } from '@/lib/utils/dates';
import { formatProjectStatsLine } from '@/lib/utils/projectStats';
import type { ProjectWithStats } from '@/types/project';

interface ProjectCardProps {
  project: ProjectWithStats;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(ROUTES.projectDetail(project.id))}>
      <Card className="gap-2">
        <View className="flex-row items-center justify-between gap-3">
          <Text className="flex-1 text-lg font-semibold text-neutral-900">{project.name}</Text>
          <Badge label={project.status} />
        </View>
        {project.description ? (
          <Text className="text-base text-neutral-600" numberOfLines={2}>
            {project.description}
          </Text>
        ) : null}
        <Text className="text-sm text-neutral-600">
          {formatProjectStatsLine(project.noteCount, project.openTaskCount)}
        </Text>
        <Text className="text-sm text-neutral-500">
          Updated {formatRelativeDate(project.updatedAt)}
        </Text>
      </Card>
    </Pressable>
  );
}
