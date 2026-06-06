import { Text, View } from 'react-native';

import { Card } from '@/components/ui/Card';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <Card className="gap-3">
      <Text className="text-lg font-semibold text-neutral-900">{title}</Text>
      {children}
    </Card>
  );
}

interface SectionPlaceholderProps {
  description: string;
}

export function SectionPlaceholder({ description }: SectionPlaceholderProps) {
  return (
    <View>
      <Text className="text-base text-neutral-600">{description}</Text>
    </View>
  );
}
