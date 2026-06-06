import { Text, View } from 'react-native';

import { ProjectDropLogo } from '@/components/brand/ProjectDropLogo';
import { COPY } from '@/constants/copy';
import { APP_NAME } from '@/constants/theme';

type WordmarkSize = 'sm' | 'md' | 'lg';

interface ProjectDropWordmarkProps {
  showTagline?: boolean;
  size?: WordmarkSize;
}

const logoSizes: Record<WordmarkSize, number> = {
  sm: 36,
  md: 44,
  lg: 52,
};

const titleClasses: Record<WordmarkSize, string> = {
  sm: 'text-lg font-bold text-neutral-900',
  md: 'text-2xl font-bold text-neutral-900',
  lg: 'text-3xl font-bold text-neutral-900',
};

export function ProjectDropWordmark({ showTagline = false, size = 'md' }: ProjectDropWordmarkProps) {
  return (
    <View className="flex-row items-center gap-3">
      <ProjectDropLogo size={logoSizes[size]} />
      <View className="flex-1 gap-0.5">
        <Text className={titleClasses[size]}>{APP_NAME}</Text>
        {showTagline ? (
          <Text className="text-sm leading-5 text-neutral-500">{COPY.tagline}</Text>
        ) : null}
      </View>
    </View>
  );
}
