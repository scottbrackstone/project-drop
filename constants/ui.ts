import { COLORS, SPACING } from '@/constants/theme';

interface InputProps {
  placeholderTextColor?: string;
}

export const INPUT_DEFAULTS: InputProps = {
  placeholderTextColor: COLORS.placeholder,
};

export const SURFACES = {
  card: 'rounded-2xl border border-neutral-100 bg-white',
  cardMuted: 'rounded-2xl border border-neutral-200 bg-neutral-50',
  cardSelected: 'rounded-xl border border-sky-200 bg-sky-50/60',
  cardDefault: 'rounded-xl border border-neutral-200 bg-white',
  settingsRow: 'rounded-2xl border border-neutral-100 bg-white active:bg-neutral-50',
  dangerZone: 'rounded-2xl border border-red-100 bg-red-50/50',
  transcript: 'rounded-xl bg-neutral-50',
} as const;

export const SURFACE_PADDING = {
  card: {
    paddingHorizontal: SPACING.cardPaddingX,
    paddingVertical: SPACING.cardPaddingY,
  },
  row: {
    paddingHorizontal: SPACING.cardPaddingX,
    paddingVertical: SPACING.cardPaddingY,
  },
  inset: {
    paddingHorizontal: SPACING.cardPaddingX - 4,
    paddingVertical: SPACING.cardPaddingY - 4,
  },
} as const;

export const CARD_SHADOW = {
  shadowColor: COLORS.primary,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.06,
  shadowRadius: 4,
  elevation: 1,
} as const;
