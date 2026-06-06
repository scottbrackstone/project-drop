import { COLORS } from '@/constants/theme';

interface InputProps {
  placeholderTextColor?: string;
}

export const INPUT_DEFAULTS: InputProps = {
  placeholderTextColor: COLORS.placeholder,
};

export const SURFACES = {
  card: 'rounded-2xl border border-neutral-100 bg-white p-5',
  cardMuted: 'rounded-2xl border border-neutral-200 bg-neutral-50 p-5',
  cardSelected: 'rounded-xl border border-sky-200 bg-sky-50/50 px-5 py-4',
  cardDefault: 'rounded-xl border border-neutral-200 bg-white px-5 py-4',
  settingsRow: 'rounded-2xl border border-neutral-100 bg-white px-5 py-4 active:bg-neutral-50',
  dangerZone: 'rounded-2xl border border-red-100 bg-red-50/40 p-5',
  transcript: 'rounded-xl bg-neutral-50 px-4 py-4',
} as const;
