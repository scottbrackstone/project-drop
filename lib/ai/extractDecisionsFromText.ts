import type { ExtractedDecision } from '@/types/ai';

const DECISION_PATTERNS: RegExp[] = [
  /\bdecided to\s+(.+?)(?:[.!?]|$)/i,
  /\bgoing with\s+(.+?)(?:[.!?]|$)/i,
  /\bchoose(?:d)?\s+(?:to\s+)?(.+?)(?:[.!?]|$)/i,
  /\bwe will\s+(.+?)(?:[.!?]|$)/i,
  /\bI will\s+(.+?)(?:[.!?]|$)/i,
];

function normaliseDecisionTitle(raw: string): string {
  const trimmed = raw.trim().replace(/\s+/g, ' ');
  if (!trimmed) return '';
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
}

export function extractDecisionsFromText(transcript: string): ExtractedDecision[] {
  const decisions: ExtractedDecision[] = [];
  const seen = new Set<string>();

  for (const pattern of DECISION_PATTERNS) {
    const match = transcript.match(pattern);
    if (!match?.[1]) continue;

    const title = normaliseDecisionTitle(match[1]);
    if (!title || seen.has(title.toLowerCase())) continue;

    seen.add(title.toLowerCase());
    decisions.push({ title, reasoning: null });
  }

  return decisions;
}
