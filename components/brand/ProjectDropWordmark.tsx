import { Text, View } from 'react-native';

import { ProjectDropLogo } from '@/components/brand/ProjectDropLogo';
import { COPY } from '@/constants/copy';

type WordmarkSize = 'sm' | 'md' | 'lg';

interface ProjectDropWordmarkProps {
  showTagline?: boolean;
  size?: WordmarkSize;
}

const logoSizes: Record<WordmarkSize, number> = {
  sm: 44,
  md: 52,
  lg: 60,
};

const titleSizes: Record<WordmarkSize, number> = {
  sm: 19,
  md: 26,
  lg: 32,
};

const taglineSizes: Record<WordmarkSize, number> = {
  sm: 13,
  md: 14,
  lg: 15,
};

export function ProjectDropWordmark({ showTagline = false, size = 'md' }: ProjectDropWordmarkProps) {
  const titleSize = titleSizes[size];
  const taglineSize = taglineSizes[size];
  const logoSize = logoSizes[size];
  const textTopInset = Math.round(logoSize * 0.1);

  return (
    <View className="flex-row items-start gap-4">
      <ProjectDropLogo size={logoSize} />
      <View className="flex-1 gap-2" style={{ paddingTop: textTopInset }}>
        <Text
          style={{
            fontSize: titleSize,
            lineHeight: titleSize * 1.2,
            letterSpacing: -0.5,
          }}
        >
          <Text className="font-bold text-neutral-900">Project</Text>
          <Text className="font-bold text-sky-700">Drop</Text>
        </Text>
        {showTagline ? (
          <Text
            className="text-neutral-500"
            style={{ fontSize: taglineSize, lineHeight: taglineSize * 1.5 }}
          >
            {COPY.tagline}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
