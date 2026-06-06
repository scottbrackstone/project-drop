import { Text } from 'react-native';

interface CompactEmptyProps {
  message: string;
}

export function CompactEmpty({ message }: CompactEmptyProps) {
  return <Text className="text-sm text-neutral-500">{message}</Text>;
}
