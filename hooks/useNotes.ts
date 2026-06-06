import { useCallback } from 'react';

import { listNotesByProject } from '@/lib/data/notes';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import type { NoteWithTags } from '@/types/note';

interface UseNotesResult {
  notes: NoteWithTags[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useNotes(projectId: string | undefined): UseNotesResult {
  const fetcher = useCallback(async () => {
    if (!projectId) return [];
    return listNotesByProject(projectId);
  }, [projectId]);

  const { data, loading, error, refresh } = useAsyncResource(fetcher, {
    enabled: Boolean(projectId),
  });

  return {
    notes: data ?? [],
    loading,
    error,
    refresh,
  };
}
