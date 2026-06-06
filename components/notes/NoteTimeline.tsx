import { View } from 'react-native';

import { NoteCard } from '@/components/notes/NoteCard';
import { CompactEmpty } from '@/components/ui/CompactEmpty';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { COPY } from '@/constants/copy';
import type { NoteWithTags } from '@/types/note';

interface NoteTimelineProps {
  notes: NoteWithTags[];
  loading: boolean;
  deletingNoteId: string | null;
  onDeleteNote: (noteId: string) => void;
}

export function NoteTimeline({ notes, loading, deletingNoteId, onDeleteNote }: NoteTimelineProps) {
  if (loading) {
    return <LoadingSpinner label={COPY.projectDetail.notesLoading} />;
  }

  if (notes.length === 0) {
    return <CompactEmpty message={COPY.projectDetail.notesEmpty} />;
  }

  return (
    <View className="gap-3">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDeleteNote}
          deleting={deletingNoteId === note.id}
        />
      ))}
    </View>
  );
}
