import { Text } from 'react-native';

import { NoteTimeline } from '@/components/notes/NoteTimeline';
import { SectionCard } from '@/components/ui/SectionCard';
import { COPY } from '@/constants/copy';
import type { NoteWithTags } from '@/types/note';

interface ProjectNotesSectionProps {
  notes: NoteWithTags[];
  loading: boolean;
  deletingNoteId: string | null;
  noteError: string | null;
  onDeleteNote: (noteId: string) => void;
}

export function ProjectNotesSection({
  notes,
  loading,
  deletingNoteId,
  noteError,
  onDeleteNote,
}: ProjectNotesSectionProps) {
  return (
    <SectionCard title={COPY.projectDetail.notesTitle}>
      {noteError ? <Text className="text-sm text-red-600">{noteError}</Text> : null}
      <NoteTimeline
        notes={notes}
        loading={loading}
        deletingNoteId={deletingNoteId}
        onDeleteNote={onDeleteNote}
      />
    </SectionCard>
  );
}
