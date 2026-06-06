import { useState } from 'react';
import { Text, View } from 'react-native';

import { NoteTagList } from '@/components/notes/NoteTagList';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { COPY } from '@/constants/copy';
import { SURFACES } from '@/constants/ui';
import { useCopyText } from '@/hooks/useCopyText';
import { formatDateTime } from '@/lib/utils/dates';
import { formatNoteForCopy } from '@/lib/utils/noteText';
import type { NoteWithTags } from '@/types/note';

interface NoteCardProps {
  note: NoteWithTags;
  onDelete: (noteId: string) => void;
  deleting: boolean;
}

export function NoteCard({ note, onDelete, deleting }: NoteCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { copyText, copied, error: copyError } = useCopyText();

  const hasLongContent =
    (note.cleanedNote?.length ?? 0) > 120 ||
    Boolean(note.rawTranscript && note.rawTranscript !== note.cleanedNote);
  const showTranscript =
    expanded &&
    note.rawTranscript?.trim() &&
    note.rawTranscript.trim() !== note.cleanedNote?.trim();

  async function handleCopy() {
    await copyText(formatNoteForCopy(note, expanded));
  }

  return (
    <Card className="gap-3">
      <View className="flex-row items-center justify-between gap-2">
        <View className="flex-row items-center gap-2">
          <Text className="text-xs text-neutral-400">{formatDateTime(note.createdAt)}</Text>
          {note.source === 'voice' ? <Badge label={COPY.voice.sourceBadge} tone="success" /> : null}
        </View>
        <View className="flex-row items-center">
          <Button
            title={copied ? COPY.notes.actions.copied : COPY.notes.actions.copy}
            variant="ghost"
            size="sm"
            onPress={() => void handleCopy()}
            disabled={deleting}
          />
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
        <Text className="text-base font-semibold leading-5 text-neutral-900">{note.summary}</Text>
      ) : null}
      {note.cleanedNote ? (
        <Text
          className="text-sm leading-6 text-neutral-600"
          numberOfLines={expanded ? undefined : 3}
        >
          {note.cleanedNote}
        </Text>
      ) : null}
      {expanded ? (
        <View className="gap-3">
          {showTranscript ? (
            <View className={`gap-1 ${SURFACES.transcript}`}>
              <Text className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                {COPY.notes.transcriptLabel}
              </Text>
              <Text className="text-sm leading-6 text-neutral-600">{note.rawTranscript}</Text>
            </View>
          ) : null}
          <NoteTagList tags={note.tags} />
        </View>
      ) : note.tags.length > 0 ? (
        <NoteTagList tags={note.tags.slice(0, 3)} />
      ) : null}
      {hasLongContent || note.tags.length > 3 ? (
        <View className="-mt-1 self-start">
          <Button
            title={expanded ? COPY.notes.actions.showLess : COPY.notes.actions.showMore}
            variant="ghost"
            size="sm"
            onPress={() => setExpanded((value) => !value)}
          />
        </View>
      ) : null}
      {copyError ? <Text className="text-sm text-red-600">{copyError}</Text> : null}
    </Card>
  );
}
