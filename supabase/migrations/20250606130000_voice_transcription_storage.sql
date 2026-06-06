-- Temporary storage for voice transcription uploads (Stage 4D).
-- Audio is uploaded for transcription only; persistent note audio is a later stage.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'voice-transcription',
  'voice-transcription',
  false,
  26214400,
  array['audio/mp4', 'audio/x-m4a', 'audio/m4a', 'audio/x-caf', 'audio/wav', 'audio/webm', 'audio/3gpp']
)
on conflict (id) do nothing;

create policy mvp_allow_upload_voice_transcription
on storage.objects
for insert
with check (bucket_id = 'voice-transcription');

create policy mvp_allow_read_voice_transcription
on storage.objects
for select
using (bucket_id = 'voice-transcription');
