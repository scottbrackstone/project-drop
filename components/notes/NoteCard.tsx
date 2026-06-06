import { Text, View } from 'react-native';

import { NoteTagList } from '@/components/notes/NoteTagList';
import { Card } from '@/components/ui/Card';
import { formatDateTime } from '@/lib/utils/dates';
import type { NoteWithTags } from '@/types/note';

interface NoteCardProps {
  note: NoteWithTags;
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Card className="gap-2">
      <Text className="text-xs text-neutral-500">{formatDateTime(note.createdAt)}</Text>
      {note.summary ? (
        <Text className="text-base font-semibold text-neutral-900">{note.summary}</Text>
      ) : null}
      {note.cleanedNote ? (
        <Text className="text-sm leading-5 text-neutral-600" numberOfLines={3}>
          {note.cleanedNote}
        </Text>
      ) : null}
      <NoteTagList tags={note.tags} />
    </Card>
  );
}
