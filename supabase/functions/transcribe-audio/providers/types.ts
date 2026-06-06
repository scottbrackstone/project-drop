export interface TranscriptionAudioInput {
  bytes: ArrayBuffer;
  fileName: string;
  mimeType: string;
  model: string;
  apiKey: string;
}
