import { ActivityIndicator, Pressable, Text, type PressableProps } from 'react-native';

import { COLORS } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-neutral-900 active:bg-neutral-800',
  secondary: 'bg-neutral-100 active:bg-neutral-200 border border-neutral-200',
  ghost: 'bg-transparent active:bg-neutral-100',
};

const textClasses: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-neutral-900',
  ghost: 'text-neutral-700',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 min-h-[40px]',
  md: 'px-5 py-3 min-h-[44px]',
};

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const spinnerColor = variant === 'primary' ? COLORS.white : COLORS.primary;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={`rounded-xl items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${isDisabled ? 'opacity-50' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <Text className={`text-base font-semibold ${textClasses[variant]}`}>{title}</Text>
      )}
    </Pressable>
  );
}
