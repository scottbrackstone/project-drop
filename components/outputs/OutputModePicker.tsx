import { Pressable, Text, View } from 'react-native';

import { getOutputModeDescription, getOutputModeLabel } from '@/constants/copy';
import { PROJECT_OUTPUT_MODES, type ProjectOutputMode } from '@/types/projectOutput';

interface OutputModePickerProps {
  value: ProjectOutputMode;
  onChange: (mode: ProjectOutputMode) => void;
  disabled?: boolean;
}

export function OutputModePicker({ value, onChange, disabled = false }: OutputModePickerProps) {
  return (
    <View className="gap-2">
      {PROJECT_OUTPUT_MODES.map((mode) => {
        const selected = mode === value;
        return (
          <Pressable
            key={mode}
            accessibilityRole="button"
            accessibilityState={{ selected, disabled }}
            disabled={disabled}
            onPress={() => onChange(mode)}
            className={`rounded-xl border px-4 py-3 ${
              selected ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 bg-white'
            } ${disabled ? 'opacity-50' : ''}`}
          >
            <Text
              className={`text-sm font-semibold ${selected ? 'text-neutral-900' : 'text-neutral-800'}`}
            >
              {getOutputModeLabel(mode)}
            </Text>
            <Text className="mt-1 text-xs leading-5 text-neutral-600">
              {getOutputModeDescription(mode)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
