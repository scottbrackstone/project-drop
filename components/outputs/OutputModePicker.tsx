import { Pressable, Text, View } from 'react-native';

import { getOutputModeDescription, getOutputModeLabel } from '@/constants/copy';
import { SURFACES } from '@/constants/ui';
import type { ProjectOutputMode } from '@/types/projectOutput';

interface OutputModePickerProps {
  modes: ProjectOutputMode[];
  value: ProjectOutputMode;
  onChange: (mode: ProjectOutputMode) => void;
  disabled?: boolean;
}

export function OutputModePicker({
  modes,
  value,
  onChange,
  disabled = false,
}: OutputModePickerProps) {
  return (
    <View className="gap-2">
      {modes.map((mode) => {
        const selected = mode === value;
        return (
          <Pressable
            key={mode}
            accessibilityRole="button"
            accessibilityState={{ selected, disabled }}
            disabled={disabled}
            onPress={() => onChange(mode)}
            className={`${selected ? SURFACES.cardSelected : SURFACES.cardDefault} ${disabled ? 'opacity-50' : ''}`}
          >
            <Text
              className={`text-sm font-semibold leading-5 ${selected ? 'text-neutral-900' : 'text-neutral-800'}`}
            >
              {getOutputModeLabel(mode)}
            </Text>
            <Text className="mt-1 text-xs leading-5 text-neutral-500">
              {getOutputModeDescription(mode)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
