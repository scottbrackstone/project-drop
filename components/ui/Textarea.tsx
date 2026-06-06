import { Text, TextInput, View, type TextInputProps } from 'react-native';

import { INPUT_DEFAULTS } from '@/constants/ui';

interface TextareaProps extends TextInputProps {
  label: string;
  error?: string | null;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-neutral-700">{label}</Text>
      <TextInput
        multiline
        textAlignVertical="top"
        className={`min-h-[120px] rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 ${error ? 'border-red-400' : ''} ${className}`}
        placeholderTextColor={INPUT_DEFAULTS.placeholderTextColor}
        {...props}
      />
      {error ? <Text className="text-sm text-red-600">{error}</Text> : null}
    </View>
  );
}
