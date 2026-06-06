import { Pressable, Text, View } from 'react-native';

import { getOutputModeLabel } from '@/constants/copy';
import { PROJECT_OUTPUT_MODES, type ProjectOutputMode } from '@/types/projectOutput';

interface OutputModePickerProps {
  value: ProjectOutputMode;
  onChange: (mode: ProjectOutputMode) => void;
  disabled?: boolean;
}

export function OutputModePicker({ value, onChange, disabled = false }: OutputModePickerProps) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {PROJECT_OUTPUT_MODES.map((mode) => {
        const selected = mode === value;
        return (
          <Pressable
            key={mode}
            accessibilityRole="button"
            accessibilityState={{ selected, disabled }}
            disabled={disabled}
            onPress={() => onChange(mode)}
            className={`rounded-full border px-3 py-2 ${
              selected ? 'border-neutral-900 bg-neutral-900' : 'border-neutral-200 bg-white'
            } ${disabled ? 'opacity-50' : ''}`}
          >
            <Text
              className={`text-sm font-medium ${selected ? 'text-white' : 'text-neutral-700'}`}
            >
              {getOutputModeLabel(mode)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
