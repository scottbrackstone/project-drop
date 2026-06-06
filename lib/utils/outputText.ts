export interface OutputTextSource {
  title: string;
  content: string;
}

export function formatOutputForSharing(output: OutputTextSource): string {
  return `# ${output.title.trim()}\n\n${output.content.trim()}`;
}
