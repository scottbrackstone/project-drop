import { useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  Text,
  type PressableProps,
} from 'react-native';

import { COLORS } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
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
  secondary: 'bg-white active:bg-neutral-50 border border-neutral-200',
  ghost: 'bg-transparent active:bg-neutral-100',
  danger: 'bg-red-50 active:bg-red-100 border border-red-200',
};

const textClasses: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-neutral-900',
  ghost: 'text-neutral-600',
  danger: 'text-red-700',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 min-h-[36px]',
  md: 'px-5 py-3 min-h-[44px]',
};

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const spinnerColor =
    variant === 'primary' ? COLORS.white : variant === 'danger' ? COLORS.danger : COLORS.primary;
  const scale = useRef(new Animated.Value(1)).current;

  function animateTo(value: number) {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  }

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityRole="button"
        disabled={isDisabled}
        onPressIn={(event) => {
          if (!isDisabled) animateTo(0.98);
          onPressIn?.(event);
        }}
        onPressOut={(event) => {
          if (!isDisabled) animateTo(1);
          onPressOut?.(event);
        }}
        className={`rounded-xl items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${isDisabled ? 'opacity-50' : ''} ${className}`}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color={spinnerColor} />
        ) : (
          <Text
            className={`font-semibold ${size === 'sm' ? 'text-sm' : 'text-base'} ${textClasses[variant]}`}
          >
            {title}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
}
