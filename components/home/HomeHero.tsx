import { Text, View } from 'react-native';

import { COPY, formatDataModeLabel } from '@/constants/copy';
import { getDataProvider } from '@/lib/data/withProvider';

export function HomeHero() {
  const provider = getDataProvider();

  return (
    <View className="gap-4">
      <Text className="text-2xl font-bold leading-9 text-neutral-900">{COPY.home.headline}</Text>
      <Text className="text-base leading-7 text-neutral-600">{COPY.home.body}</Text>
      <Text className="text-xs text-neutral-400">
        Data mode: {formatDataModeLabel(provider)}
      </Text>
    </View>
  );
}
