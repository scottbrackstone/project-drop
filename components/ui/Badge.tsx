import { Text, View } from 'react-native';

type BadgeTone = 'neutral' | 'success' | 'warning';

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
}

const containerClasses: Record<BadgeTone, string> = {
  neutral: 'bg-neutral-100',
  success: 'bg-emerald-50',
  warning: 'bg-amber-50',
};

const textClasses: Record<BadgeTone, string> = {
  neutral: 'text-neutral-700',
  success: 'text-emerald-700',
  warning: 'text-amber-700',
};

export function Badge({ label, tone = 'neutral' }: BadgeProps) {
  return (
    <View className={`self-start rounded-full px-3 py-1 ${containerClasses[tone]}`}>
      <Text className={`text-xs font-medium ${textClasses[tone]}`}>{label}</Text>
    </View>
  );
}
