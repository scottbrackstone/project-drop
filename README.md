# ProjectDrop

Voice notes that organise themselves into projects.

ProjectDrop is an Android-first Expo app. Record a quick voice note, and the app transcribes it, extracts tasks and decisions, and saves everything into the correct project folder.

## Stack

- **App:** Expo (React Native) + TypeScript + NativeWind
- **Backend:** Supabase (Postgres, Auth, Storage)
- **AI (Stage 3+):** Supabase Edge Functions

## Prerequisites

- Node.js 20+
- Android Studio emulator or a physical Android device with Expo Go

## Quick start (mock mode)

No Supabase setup required. The app uses an in-memory store.

```bash
npm install
npm run android
```

Mock data resets when you fully restart the app.

## Supabase mode

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Apply the migration in [`supabase/migrations/20250606120000_initial_schema.sql`](supabase/migrations/20250606120000_initial_schema.sql) via the SQL editor or Supabase CLI.
3. Copy `.env.example` to `.env` and set:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# Optional — defaults to voice-transcription
EXPO_PUBLIC_TRANSCRIPTION_BUCKET=voice-transcription
```

4. Apply all migrations in [`supabase/migrations/`](supabase/migrations/) (includes the `voice-transcription` Storage bucket).
5. Deploy the Edge Function:

```bash
supabase functions deploy transcribe-audio
```

6. Set Edge Function secrets (never in the Expo app):

```bash
supabase secrets set MISTRAL_API_KEY=your-mistral-key
# Optional:
supabase secrets set TRANSCRIPTION_PROVIDER=mistral
supabase secrets set MISTRAL_TRANSCRIPTION_MODEL=voxtral-mini-latest
supabase secrets set VOICE_TRANSCRIPTION_BUCKET=voice-transcription
```

Legacy OpenAI transcription (optional):

```bash
supabase secrets set TRANSCRIPTION_PROVIDER=openai
supabase secrets set OPENAI_API_KEY=your-openai-key
supabase secrets set OPENAI_TRANSCRIPTION_MODEL=whisper-1
```

7. Restart Expo: `npm run android`

## Scripts

| Command | Description |
|---|---|
| `npm run android` | Start Expo and open on Android |
| `npm run start` | Start Expo dev server |
| `npm run typecheck` | Run TypeScript checks |

## Coding standards

This project follows **[docs/CODING_RULES.md](docs/CODING_RULES.md)**.

All contributors and coding agents must read it before editing.

Key rules:

- **Screens stay thin** — compose components and call hooks; no heavy logic in `app/`
- **Data access belongs in `lib/data/`** — never call Supabase from screens or components
- **Reusable UI belongs in `components/`** — extract repeated patterns early
- **Repeated logic should be extracted** into hooks, utilities, or shared components
- **Mock vs Supabase** is switched only in `lib/data/withProvider.ts`

## Project structure

```
app/                 Expo Router screens (thin)
components/          UI, layout, and feature components
hooks/               Screen-facing data and refresh hooks
constants/           Routes, copy, theme, validation limits
lib/data/            Data access + provider switching
lib/data/mock/       Mock persistence
lib/data/supabase/   Supabase queries
lib/supabase/        Client setup and auth helpers
lib/transcription/   Audio URI → transcript (mock now; Edge Functions later)
lib/ai/              Transcript text → structured project memory
lib/audio/           Local recording and playback
lib/utils/           Pure helpers
types/               Shared TypeScript types
docs/                Coding rules and documentation
supabase/            Migrations and Edge Functions (Stage 3+)
```

## Voice pipeline

ProjectDrop splits voice capture into two layers:

| Layer | Location | Input → output |
|---|---|---|
| **Transcription** | `lib/transcription/` | Audio URI → plain transcript text |
| **AI processing** | `lib/ai/` | Transcript text → tasks, decisions, tags, summary |

**Stage 4D** remote transcription flow (when Supabase public env vars are set):

1. User records audio locally.
2. App uploads the file to the `voice-transcription` Storage bucket (temporary, for transcription only).
3. App invokes the `transcribe-audio` Edge Function with `{ bucket, path }`.
4. Edge Function downloads the audio with the service role, calls **Mistral Voxtral** server-side (default), and returns `{ text, source: "remote" }`.
5. App fills the transcript textarea; user edits and saves via the existing `createTextNote(transcript, { audioUri })` path.

**Default provider:** Mistral Voxtral (`voxtral-mini-latest` via `MISTRAL_TRANSCRIPTION_MODEL`). OpenAI Whisper is optional legacy behind `TRANSCRIPTION_PROVIDER=openai`.

**No transcription API keys in the mobile app.** Only `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` are used client-side. Provider secrets (`MISTRAL_API_KEY`, etc.) live in Supabase Edge Function secrets only.

**Mock fallback:** when `EXPO_PUBLIC_SUPABASE_URL` or `EXPO_PUBLIC_SUPABASE_ANON_KEY` are missing, the button reads **Use mock transcript** and returns clearly labelled test text.

**Remote failure:** when Supabase is configured, transcription errors are shown in the UI. The app does **not** silently fall back to mock text.

**Persistent cloud audio** on notes is still a later stage. Storage upload here is only for transcription.

## Security note

MVP RLS policies (`mvp_allow_all_*`) allow open access for local development. **Replace these with `auth.uid()` policies before launching with real users.**

## MVP stages

- **Stage 1–2:** App shell, projects create/list/detail, Supabase schema
- **Stage 3:** Text notes + mock AI processing (tasks, decisions, tags)
- **Stage 4A:** Local voice recording on project detail
- **Stage 4B:** Manual voice transcript + local audio metadata
- **Stage 4C:** Transcription provider abstraction + mock transcript button
- **Stage 4D (current):** Remote transcription via Supabase Storage + Edge Function
- **Stage 5:** Project summary/report
- **Stage 6:** Polish, tests, error handling

## Stage 4D manual test checklist

### Without Supabase env (mock transcription)

1. Text-only note still saves without a Voice badge.
2. Record → type transcript manually → save → Voice badge appears.
3. Record → stop → **Use mock transcript** → amber mock warning → edit → save.
4. Type manual transcript first → mock button stays disabled.
5. Discard clears transcript, warning, error, and recording.

### With Supabase + Edge Function (remote transcription)

1. Apply migrations and deploy `transcribe-audio` with `MISTRAL_API_KEY` secret.
2. Record → stop → **Transcribe recording** → real transcript appears (no mock warning).
3. Edit transcript → save → note uses existing voice note save path.
4. Temporarily remove `MISTRAL_API_KEY` secret → tap transcribe → clear error shown (no mock fallback).
5. Confirm no `MISTRAL_API_KEY` or `OPENAI_API_KEY` in client code or `EXPO_PUBLIC_*` env vars.
6. Optional: set `TRANSCRIPTION_PROVIDER=openai` and `OPENAI_API_KEY` to verify legacy provider path.

## Manual test checklist

### Mock mode

1. `npm run android` → home screen loads
2. Tap **Create project** → enter name → lands on project detail
3. Paste the test note below → tap **Save to project**
4. Confirm note timeline, summary, task, and tags update
5. Back to **View projects** → project appears in list

**Stage 3 test note:**

> Remember to follow up with the client tomorrow about the bonnet photos. I decided to keep the report simple and focus on the rust under the primer.

### Supabase mode

1. Apply migration and configure `.env`
2. Repeat create/list/detail flow
3. Verify rows in Supabase Table Editor
4. Force-quit and reopen app → data persists
