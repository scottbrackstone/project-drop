import { Text, View } from 'react-native';

import { COPY, formatDataModeLabel } from '@/constants/copy';
import { getDataProvider } from '@/lib/data/withProvider';

export function HomeHero() {
  const provider = getDataProvider();

  return (
    <View className="gap-3">
      <Text className="text-3xl font-bold leading-tight text-neutral-900">
        {COPY.home.headline}
      </Text>
      <Text className="text-base leading-6 text-neutral-600">{COPY.home.body}</Text>
      <Text className="text-sm text-neutral-500">
        Data mode: {formatDataModeLabel(provider)}
      </Text>
    </View>
  );
}
