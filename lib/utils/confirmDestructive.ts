import { Alert } from 'react-native';

interface ConfirmDestructiveOptions {
  title: string;
  message: string;
  cancelLabel: string;
  confirmLabel: string;
  onConfirm: () => void;
}

export function confirmDestructive(options: ConfirmDestructiveOptions): void {
  Alert.alert(options.title, options.message, [
    { text: options.cancelLabel, style: 'cancel' },
    {
      text: options.confirmLabel,
      style: 'destructive',
      onPress: options.onConfirm,
    },
  ]);
}
