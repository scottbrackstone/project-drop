import { COLORS } from '@/constants/theme';

interface InputProps {
  placeholderTextColor?: string;
}

export const INPUT_DEFAULTS: InputProps = {
  placeholderTextColor: COLORS.placeholder,
};
