import { View } from 'react-native';

import { COLORS } from '@/constants/theme';

interface ProjectDropLogoProps {
  size?: number;
}

function DropMark({ size }: { size: number }) {
  const width = size * 0.36;
  const height = size * 0.46;

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

export function ProjectDropLogo({ size = 52 }: ProjectDropLogoProps) {
  const radius = Math.round(size * 0.24);
  const ringSize = size + 6;

  return (
    <View
      style={{
        width: ringSize,
        height: ringSize,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          width: ringSize,
          height: ringSize,
          borderRadius: radius + 3,
          backgroundColor: COLORS.accentLight,
          borderWidth: 1,
          borderColor: COLORS.accentMuted,
          opacity: 0.35,
        }}
      />
      <View
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor: COLORS.white,
          borderWidth: 1,
          borderColor: COLORS.borderSubtle,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: COLORS.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: Math.max(4, Math.round(size * 0.08)),
            backgroundColor: COLORS.accentMuted,
          }}
        />
        <DropMark size={size} />
      </View>
    </View>
  );
}
