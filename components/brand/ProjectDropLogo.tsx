import { View } from 'react-native';

import { COLORS } from '@/constants/theme';

interface ProjectDropLogoProps {
  size?: number;
}

function DropMark({ size }: { size: number }) {
  const width = size * 0.38;
  const height = size * 0.48;

  return (
    <View
      style={{
        width,
        height,
        borderTopLeftRadius: width / 2,
        borderTopRightRadius: width / 2,
        borderBottomLeftRadius: width / 2,
        borderBottomRightRadius: height,
        backgroundColor: COLORS.accent,
      }}
    />
  );
}

export function ProjectDropLogo({ size = 48 }: ProjectDropLogoProps) {
  const radius = Math.round(size * 0.26);
  const accentHeight = Math.max(3, Math.round(size * 0.06));

  return (
    <View
      className="overflow-hidden border border-neutral-200 bg-white"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View style={{ height: accentHeight, backgroundColor: COLORS.accentMuted }} />
      <View className="flex-1 items-center justify-center">
        <DropMark size={size} />
      </View>
    </View>
  );
}
