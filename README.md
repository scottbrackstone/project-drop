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
```

4. Restart Expo: `npm run android`

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

**Stage 4C** adds a mock transcription button after recording. It fills the transcript field with clearly labelled test text. Real transcription is **not** implemented yet — it should run through **Supabase Edge Functions** later so API keys never ship on-device. **Supabase Storage upload** for audio is also not implemented yet.

## Security note

MVP RLS policies (`mvp_allow_all_*`) allow open access for local development. **Replace these with `auth.uid()` policies before launching with real users.**

## MVP stages

- **Stage 1–2:** App shell, projects create/list/detail, Supabase schema
- **Stage 3:** Text notes + mock AI processing (tasks, decisions, tags)
- **Stage 4A:** Local voice recording on project detail
- **Stage 4B:** Manual voice transcript + local audio metadata
- **Stage 4C (current):** Transcription provider abstraction + mock transcript button
- **Stage 4D:** Real transcription via Supabase Edge Functions + Storage upload
- **Stage 5:** Project summary/report
- **Stage 6:** Polish, tests, error handling

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
