import { Text, View } from 'react-native';

import { SettingsMenuItem } from '@/components/settings/SettingsMenuItem';
import { COPY } from '@/constants/copy';

interface SettingsMenuProps {
  onOutputSettings: () => void;
  onProjectSettings: () => void;
}

export function SettingsMenu({ onOutputSettings, onProjectSettings }: SettingsMenuProps) {
  return (
    <View className="gap-4">
      <Text className="text-sm leading-5 text-neutral-500">{COPY.settings.subtitle}</Text>
      <View className="gap-2">
        <SettingsMenuItem
          title={COPY.settings.menuOutputSettings}
          description={COPY.settings.menuOutputSettingsDescription}
          onPress={onOutputSettings}
        />
        <SettingsMenuItem
          title={COPY.settings.menuProjectSettings}
          description={COPY.settings.menuProjectSettingsDescription}
          onPress={onProjectSettings}
        />
      </View>
    </View>
  );
}
