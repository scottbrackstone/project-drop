import { Text, View } from 'react-native';

import { COLORS } from '@/constants/theme';

interface ProjectDropLogoProps {
  size?: number;
}

export function ProjectDropLogo({ size = 44 }: ProjectDropLogoProps) {
  const fontSize = Math.round(size * 0.34);
  const dotSize = Math.round(size * 0.22);
  const radius = Math.round(size * 0.28);

  return (
    <View className="relative">
      <View
        className="items-center justify-center bg-neutral-900"
        style={{ width: size, height: size, borderRadius: radius }}
      >
        <Text className="font-bold tracking-tight text-white" style={{ fontSize }}>
          PD
        </Text>
      </View>
      <View
        className="absolute border-2 border-neutral-50"
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: COLORS.accent,
          bottom: -2,
          right: -2,
        }}
      />
    </View>
  );
}
