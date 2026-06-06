import { View } from 'react-native';

import { Badge } from '@/components/ui/Badge';

interface NoteTagListProps {
  tags: string[];
}

export function NoteTagList({ tags }: NoteTagListProps) {
  if (tags.length === 0) return null;

  return (
    <View className="flex-row flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} label={tag} tone="neutral" />
      ))}
    </View>
  );
}
