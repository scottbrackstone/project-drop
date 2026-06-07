import { Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';

interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <Card className="gap-5">
      <View className="gap-2">
        <Text className="text-base font-semibold text-neutral-900">{title}</Text>
        {description ? (
          <Text className="text-sm leading-6 text-neutral-500">{description}</Text>
        ) : null}
      </View>
      <View className="gap-4">{children}</View>
    </Card>
  );
}

interface SectionPlaceholderProps {
  description: string;
}

export function SectionPlaceholder({ description }: SectionPlaceholderProps) {
  return (
    <View>
      <Text className="text-sm leading-6 text-neutral-500">{description}</Text>
    </View>
  );
}
