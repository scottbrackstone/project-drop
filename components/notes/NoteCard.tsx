import { Text, View } from 'react-native';

import { NoteTagList } from '@/components/notes/NoteTagList';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { COPY } from '@/constants/copy';
import { formatDateTime } from '@/lib/utils/dates';
import type { NoteWithTags } from '@/types/note';

interface NoteCardProps {
  note: NoteWithTags;
  onDelete: (noteId: string) => void;
  deleting: boolean;
}

export function NoteCard({ note, onDelete, deleting }: NoteCardProps) {
  return (
    <Card className="gap-2">
      <View className="flex-row items-center justify-between gap-2">
        <Text className="text-xs text-neutral-500">{formatDateTime(note.createdAt)}</Text>
        <View className="flex-row items-center gap-2">
          {note.source === 'voice' ? <Badge label={COPY.voice.sourceBadge} /> : null}
          <Button
            title={COPY.projectDetail.deleteNote}
            variant="ghost"
            size="sm"
            onPress={() => onDelete(note.id)}
            loading={deleting}
            disabled={deleting}
          />
        </View>
      </View>
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
