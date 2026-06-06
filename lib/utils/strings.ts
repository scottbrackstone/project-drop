export function firstSentence(text: string): string {
  const match = text.trim().match(/^[^.!?]+[.!?]?/);
  return match?.[0]?.trim() ?? text.trim();
}
