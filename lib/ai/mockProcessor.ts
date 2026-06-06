import { extractDecisionsFromText } from '@/lib/ai/extractDecisionsFromText';
import { extractTagsFromText } from '@/lib/ai/extractTagsFromText';
import { extractTasksFromText } from '@/lib/ai/extractTasksFromText';
import { firstSentence } from '@/lib/utils/strings';
import type { ProcessedNote } from '@/types/ai';

function cleanTranscript(transcript: string): string {
  const trimmed = transcript.trim().replace(/\s+/g, ' ');
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function mockProcessNote(transcript: string): ProcessedNote {
  const cleanedNote = cleanTranscript(transcript);
  const summary = firstSentence(transcript);

  return {
    cleanedNote,
    summary,
    tasks: extractTasksFromText(transcript),
    decisions: extractDecisionsFromText(transcript),
    tags: extractTagsFromText(transcript),
  };
}
