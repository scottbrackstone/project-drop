import { Text, View } from 'react-native';

import { ProjectDropLogo } from '@/components/brand/ProjectDropLogo';
import { COPY } from '@/constants/copy';

type WordmarkSize = 'sm' | 'md' | 'lg';

interface ProjectDropWordmarkProps {
  showTagline?: boolean;
  size?: WordmarkSize;
}

const logoSizes: Record<WordmarkSize, number> = {
  sm: 40,
  md: 48,
  lg: 56,
};

const titleSizes: Record<WordmarkSize, number> = {
  sm: 18,
  md: 24,
  lg: 30,
};

export function ProjectDropWordmark({ showTagline = false, size = 'md' }: ProjectDropWordmarkProps) {
  const titleSize = titleSizes[size];

  return (
    <View className="flex-row items-center gap-3.5">
      <ProjectDropLogo size={logoSizes[size]} />
      <View className="flex-1 gap-1">
        <Text style={{ fontSize: titleSize, lineHeight: titleSize * 1.15 }}>
          <Text className="font-bold text-neutral-900">Project</Text>
          <Text className="font-bold text-sky-600">Drop</Text>
        </Text>
        {showTagline ? (
          <Text className="text-sm leading-5 tracking-wide text-neutral-500">{COPY.tagline}</Text>
        ) : null}
      </View>
    </View>
  );
}
