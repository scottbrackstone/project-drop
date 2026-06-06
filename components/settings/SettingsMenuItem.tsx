import { Pressable, Text, View } from 'react-native';

import { SURFACES } from '@/constants/ui';

interface SettingsMenuItemProps {
  title: string;
  description: string;
  onPress: () => void;
}

export function SettingsMenuItem({ title, description, onPress }: SettingsMenuItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={SURFACES.settingsRow}
    >
      <View className="flex-row items-center justify-between gap-3">
        <View className="flex-1 gap-1">
          <Text className="text-base font-semibold text-neutral-900">{title}</Text>
          <Text className="text-sm leading-5 text-neutral-500">{description}</Text>
        </View>
        <Text className="text-xl text-neutral-300">›</Text>
      </View>
    </Pressable>
  );
}
