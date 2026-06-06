import { Text, View } from 'react-native';

type BadgeTone = 'neutral' | 'success' | 'warning';

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
}

const containerClasses: Record<BadgeTone, string> = {
  neutral: 'bg-neutral-100 border border-neutral-200/60',
  success: 'bg-emerald-50 border border-emerald-100',
  warning: 'bg-amber-50 border border-amber-100',
};

const textClasses: Record<BadgeTone, string> = {
  neutral: 'text-neutral-600',
  success: 'text-emerald-700',
  warning: 'text-amber-700',
};

export function Badge({ label, tone = 'neutral' }: BadgeProps) {
  return (
    <View className={`self-start rounded-full px-2.5 py-0.5 ${containerClasses[tone]}`}>
      <Text className={`text-xs font-medium ${textClasses[tone]}`}>{label}</Text>
    </View>
  );
}
