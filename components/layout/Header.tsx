import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { COPY } from '@/constants/copy';
import { APP_NAME } from '@/constants/theme';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  subtitle?: string;
}

export function Header({ title = APP_NAME, showBack = false, subtitle }: HeaderProps) {
  const router = useRouter();

  return (
    <View className="border-b border-neutral-200 bg-white px-4 py-3">
      {showBack ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          className="mb-2 self-start"
        >
          <Text className="text-base font-medium text-neutral-600">{COPY.layout.back}</Text>
        </Pressable>
      ) : null}
      <Text className="text-2xl font-bold text-neutral-900">{title}</Text>
      {subtitle ? <Text className="mt-1 text-sm text-neutral-600">{subtitle}</Text> : null}
    </View>
  );
}
