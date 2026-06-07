import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ProjectDropWordmark } from '@/components/brand/ProjectDropWordmark';
import { COPY } from '@/constants/copy';
import { APP_NAME, SPACING } from '@/constants/theme';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  subtitle?: string;
  brand?: boolean;
  rightAction?: ReactNode;
}

export function Header({
  title = APP_NAME,
  showBack = false,
  subtitle,
  brand = false,
  rightAction,
}: HeaderProps) {
  const router = useRouter();

  return (
    <View
      className="border-b border-neutral-100 bg-white py-4"
      style={{ paddingHorizontal: SPACING.screenPadding }}
    >
      <View className="flex-row items-start justify-between gap-3">
        <View className="min-w-0 flex-1">
          {showBack ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.back()}
              className="mb-2 self-start rounded-lg px-1 py-0.5 active:bg-neutral-100"
            >
              <Text className="text-base font-medium text-neutral-600">{COPY.layout.back}</Text>
            </Pressable>
          ) : null}
          {brand ? (
            <ProjectDropWordmark showTagline={Boolean(subtitle)} size="md" />
          ) : (
            <>
              <Text className="text-2xl font-bold text-neutral-900">{title}</Text>
              {subtitle ? (
                <Text className="mt-1.5 text-sm leading-6 text-neutral-500">{subtitle}</Text>
              ) : null}
            </>
          )}
        </View>
        {rightAction ? <View className="shrink-0 pt-0.5">{rightAction}</View> : null}
      </View>
    </View>
  );
}
