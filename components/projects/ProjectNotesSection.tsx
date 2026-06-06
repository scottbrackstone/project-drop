import { NoteTimeline } from '@/components/notes/NoteTimeline';
import { SectionCard } from '@/components/ui/SectionCard';
import { COPY } from '@/constants/copy';
import type { NoteWithTags } from '@/types/note';

interface ProjectNotesSectionProps {
  notes: NoteWithTags[];
  loading: boolean;
}

export function ProjectNotesSection({ notes, loading }: ProjectNotesSectionProps) {
  return (
    <SectionCard title={COPY.projectDetail.notesTitle}>
      <NoteTimeline notes={notes} loading={loading} />
    </SectionCard>
  );
}
