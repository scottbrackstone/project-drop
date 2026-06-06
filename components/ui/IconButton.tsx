import { Pressable, Text } from 'react-native';

interface IconButtonProps {
  icon: string;
  accessibilityLabel: string;
  onPress: () => void;
  disabled?: boolean;
}

export function IconButton({
  icon,
  accessibilityLabel,
  onPress,
  disabled = false,
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
      className={`h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white active:bg-neutral-100 ${disabled ? 'opacity-50' : ''}`}
    >
      <Text className="text-lg text-neutral-700">{icon}</Text>
    </Pressable>
  );
}
