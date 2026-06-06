import { getTranscriptionBucket } from '@/lib/transcription/transcriptionConfig';
import { getOptionalUserId } from '@/lib/supabase/auth';
import { getSupabaseClient } from '@/lib/supabase/client';
import { toAppError } from '@/lib/utils/errors';
import { generateId } from '@/lib/utils/id';

const MIME_BY_EXTENSION: Record<string, string> = {
  m4a: 'audio/mp4',
  mp4: 'audio/mp4',
  caf: 'audio/x-caf',
  wav: 'audio/wav',
  webm: 'audio/webm',
  '3gp': 'audio/3gpp',
};

function getExtension(uri: string): string {
  const match = uri.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
  return match?.[1]?.toLowerCase() ?? 'm4a';
}

function getMimeType(extension: string): string {
  return MIME_BY_EXTENSION[extension] ?? 'audio/mp4';
}

export interface UploadedAudioReference {
  bucket: string;
  path: string;
}

export async function uploadAudioForTranscription(
  localUri: string,
): Promise<UploadedAudioReference> {
  const bucket = getTranscriptionBucket();
  const userId = await getOptionalUserId();
  const extension = getExtension(localUri);
  const path = `${userId ?? 'anonymous'}/${generateId()}.${extension}`;

  const fileResponse = await fetch(localUri);
  if (!fileResponse.ok) {
    throw new Error('Could not read the local recording file.');
  }

  const arrayBuffer = await fileResponse.arrayBuffer();
  const { error } = await getSupabaseClient()
    .storage.from(bucket)
    .upload(path, arrayBuffer, {
      contentType: getMimeType(extension),
      upsert: false,
    });

  if (error) throw toAppError(error);

  return { bucket, path };
}
