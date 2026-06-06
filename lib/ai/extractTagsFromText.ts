const STOP_WORDS = new Set([
  'about', 'after', 'also', 'and', 'are', 'been', 'but', 'decided', 'focus',
  'follow', 'from', 'have', 'keep', 'make', 'remember', 'report', 'rust',
  'simple', 'that', 'the', 'this', 'under', 'with', 'will', 'your',
]);

const TOPIC_HINTS = ['client', 'report', 'rust', 'primer', 'bonnet', 'photos', 'project'];

function normaliseTag(word: string): string {
  return word.toLowerCase().replace(/[^a-z0-9-]/g, '');
}

export function extractTagsFromText(transcript: string): string[] {
  const tags = new Set<string>();
  const lower = transcript.toLowerCase();

  for (const hint of TOPIC_HINTS) {
    if (lower.includes(hint)) {
      tags.add(hint);
    }
  }

  const words = transcript.match(/\b[a-zA-Z]{4,}\b/g) ?? [];
  for (const word of words) {
    const tag = normaliseTag(word);
    if (!tag || STOP_WORDS.has(tag) || tag.length < 4) continue;
    tags.add(tag);
    if (tags.size >= 6) break;
  }

  return Array.from(tags).slice(0, 6);
}
