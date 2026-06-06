import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: COPY.notFound.title }} />
      <View className="flex-1 items-center justify-center gap-4 bg-neutral-50 px-6">
        <Text className="text-xl font-semibold text-neutral-900">{COPY.notFound.title}</Text>
        <Text className="text-center text-base text-neutral-600">{COPY.notFound.description}</Text>
        <Link href={ROUTES.home}>
          <Text className="text-base font-medium text-neutral-700">{COPY.notFound.goHome}</Text>
        </Link>
      </View>
    </>
  );
}
