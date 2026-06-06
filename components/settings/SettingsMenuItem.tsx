import { Pressable, Text, View } from 'react-native';

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
      className="rounded-2xl border border-neutral-200 bg-white px-4 py-4 active:bg-neutral-50"
    >
      <View className="flex-row items-center justify-between gap-3">
        <View className="flex-1 gap-1">
          <Text className="text-base font-semibold text-neutral-900">{title}</Text>
          <Text className="text-sm leading-5 text-neutral-600">{description}</Text>
        </View>
        <Text className="text-lg text-neutral-400">›</Text>
      </View>
    </Pressable>
  );
}
