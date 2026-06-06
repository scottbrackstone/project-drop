import { Pressable, Text, View } from 'react-native';

import { getOutputScopeLabel } from '@/constants/copy';
import { PROJECT_OUTPUT_SCOPES, type ProjectOutputScope } from '@/types/projectOutput';

interface OutputScopePickerProps {
  value: ProjectOutputScope;
  onChange: (scope: ProjectOutputScope) => void;
  disabled?: boolean;
}

export function OutputScopePicker({ value, onChange, disabled = false }: OutputScopePickerProps) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {PROJECT_OUTPUT_SCOPES.map((scope) => {
        const selected = scope === value;
        return (
          <Pressable
            key={scope}
            accessibilityRole="button"
            accessibilityState={{ selected, disabled }}
            disabled={disabled}
            onPress={() => onChange(scope)}
            className={`rounded-full border px-3 py-2 ${
              selected ? 'border-neutral-900 bg-neutral-900' : 'border-neutral-200 bg-white'
            } ${disabled ? 'opacity-50' : ''}`}
          >
            <Text
              className={`text-sm font-medium ${selected ? 'text-white' : 'text-neutral-700'}`}
            >
              {getOutputScopeLabel(scope)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
