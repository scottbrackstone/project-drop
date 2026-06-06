# ProjectDrop Coding Rules

Every contributor and coding agent must read this document before making changes.

ProjectDrop is an Expo React Native app with a strict layered architecture. The goal is small files, clear responsibilities, and code that is easy to extend through Stages 3–6 and beyond.

---

## Project architecture

```
app/                 Route entry points — thin screens only
components/          Reusable UI (ui/, layout/, feature folders)
hooks/               Screen-facing state, loading/error, refresh
constants/           Routes, copy, theme, validation limits
lib/data/            Data access and provider switching
lib/data/mock/       Mock persistence (local dev)
lib/data/supabase/   Supabase queries only
lib/supabase/        Supabase client and auth helpers only
lib/utils/           Pure helpers (dates, errors, validation, ids)
types/               Shared TypeScript types and row mappers
docs/                Project documentation
supabase/            Migrations and Edge Functions
```

Data flow:

```
Screen → Hook → lib/data/* → (mock | supabase)
Screen → Component (props only)
```

Screens must not call Supabase directly. Components must not contain persistence logic.

---

## No god files

- One primary responsibility per file.
- Target sizes:
  - UI primitives: ~40–80 lines
  - Feature components: ~80–120 lines
  - Screens/routes: ~30–60 lines (composition only)
  - Data modules: ~80–120 lines
- If a file is hard to scan, split it.
- If a screen grows beyond ~60 lines, extract a component or hook.

---

## Screen rules (`app/`)

Screens are navigation entry points. They should:

- Compose layout shells and feature components
- Call hooks for data and mutations
- Pass props down — no heavy inline UI blocks
- Use `constants/routes.ts` for navigation paths
- Use `constants/copy.ts` for user-facing strings

Screens must not:

- Call `getSupabaseClient()` or `.from()` queries
- Contain business validation beyond wiring form submit handlers
- Duplicate loading/error UI — use `ResourceScreenShell` or feature components
- Hardcode route strings like `'/projects/new'`

Example (good):

```tsx
export default function ProjectsScreen() {
  const { projects, loading, error, refresh } = useProjects();
  const { refreshing, onRefresh } = useRefreshControl(refresh);

  return (
    <AppShell title={COPY.projects.title} showBack subtitle={COPY.projects.subtitle}>
      <ProjectsScreenContent ... />
    </AppShell>
  );
}
```

---

## Component rules (`components/`)

### `components/ui/`

Generic, reusable building blocks: Button, Card, Input, Badge, EmptyState, etc.

- Accept props; no data fetching
- No Supabase imports
- Use `constants/theme.ts` and `constants/ui.ts` for shared styling values

### `components/layout/`

App-wide layout: AppShell, Header, ScreenScroll, ResourceScreenShell.

### Feature folders (`components/projects/`, future `components/notes/`)

Feature-specific presentation components.

- Receive data via props
- May call router for navigation inside cards/rows
- Must not own global loading state for lists — that belongs in hooks/screens

Components must not:

- Switch between mock and Supabase
- Define duplicate copies of strings already in `constants/copy.ts`

---

## Hook rules (`hooks/`)

Hooks are the screen's API for data and actions.

- `useProjects`, `useProject` — read data with loading/error/refresh
- `useCreateProject` — mutations
- `useRefreshControl` — pull-to-refresh wiring
- `useAsyncResource` — shared fetch lifecycle (internal reuse)

Hooks should:

- Call functions from `lib/data/*`
- Return `{ data, loading, error, refresh }` or similar clear shapes
- Handle errors with `getErrorMessage` from `lib/utils/errors`

Hooks must not:

- Import Supabase client directly (except via `lib/data` or `lib/supabase/auth`)
- Contain JSX

When adding a new resource, prefer:

1. `lib/data/<entity>.ts` public API
2. `lib/data/mock/<entity>.ts` and `lib/data/supabase/<entity>.ts` implementations
3. `hooks/use<Entity>.ts` for screens

---

## Data layer rules (`lib/data/`)

All persistence goes through `lib/data/*`.

### Public API (`lib/data/projects.ts`, `lib/data/notes.ts`)

- Export functions screens/hooks call: `listProjects`, `getProject`, `createProject`, etc.
- Use `withDataProvider(mockFn, supabaseFn)` — never scatter `if (isSupabaseConfigured())` outside this layer

### Implementations

- `lib/data/mock/*` — in-memory store for local dev
- `lib/data/supabase/*` — Supabase queries only

### Provider switching (`lib/data/withProvider.ts`)

Centralised mock vs Supabase selection. The rest of the app must not care which provider is active.

When adding a new entity:

```
lib/data/tasks.ts          → public API
lib/data/mock/tasks.ts     → mock impl
lib/data/supabase/tasks.ts → supabase impl
```

---

## Supabase rules (`lib/supabase/`)

- `client.ts` — singleton client setup with AsyncStorage
- `auth.ts` — session helpers (`getOptionalUserId`)

Rules:

- Never embed service-role keys or OpenAI keys in the app
- Never call `.from()` outside `lib/data/supabase/`
- Edge Functions (Stage 3+) hold AI secrets — invoke via `supabase.functions.invoke`

---

## Mock mode rules

- Mock mode activates when `EXPO_PUBLIC_SUPABASE_URL` or `EXPO_PUBLIC_SUPABASE_ANON_KEY` is missing
- Mock data is in-memory and resets on app restart — document this in README
- Mock implementations must return the same types as Supabase implementations
- UI may show data mode via `getDataProvider()` — never branch feature logic on provider in components

---

## Naming conventions

| Item | Convention | Example |
|---|---|---|
| Files | kebab or camel matching export | `ProjectCard.tsx`, `useProjects.ts` |
| Components | PascalCase | `ProjectDetailContent` |
| Hooks | `use` prefix | `useProject` |
| Data functions | verb + entity | `listProjects`, `createNote` |
| Mock functions | `mock` prefix | `mockListProjects` |
| Supabase functions | `supabase` prefix | `supabaseListProjects` |
| Types | PascalCase nouns | `Project`, `CreateProjectInput` |
| Row types | `<Entity>Row` | `ProjectRow` |
| Constants | UPPER_SNAKE or nested objects | `ROUTES`, `COPY` |

---

## TypeScript rules

- Strict mode is enabled — do not weaken it
- Avoid `any` unless documented with a comment explaining why
- Shared types live in `types/` — do not duplicate
- DB row types and mappers live alongside entity types (e.g. `types/project.ts`)
- Form value types live with entity types (e.g. `ProjectFormValues`)
- Hook return types should be explicit interfaces

---

## When to extract

Extract a **function** when:

- The same transformation or validation appears twice
- A block of logic has a clear nameable purpose

Extract a **component** when:

- JSX repeats in two or more places
- A screen section exceeds ~15 lines of markup
- A section has its own title/content structure (use `SectionCard`)

Extract a **hook** when:

- Loading/error/refresh pattern repeats
- A screen needs async data or mutation state
- Multiple screens share the same data lifecycle

Extract to **constants/** when:

- A string, route, colour, or limit is used in more than one file
- Copy may need future localisation

---

## Before every future stage

Checklist for coding agents:

1. Read this file (`docs/CODING_RULES.md`)
2. Identify which layer your change belongs to
3. Confirm no screen contains Supabase calls or heavy logic
4. Confirm mock and Supabase paths both updated if touching `lib/data/`
5. Add types before implementation
6. Reuse existing hooks/components where possible
7. Add copy to `constants/copy.ts`, routes to `constants/routes.ts`
8. Run `npm run typecheck`
9. Verify mock mode still works without `.env`
10. Keep files small — split early

---

## Stage readiness

The architecture is prepared for:

| Stage | Where code goes |
|---|---|
| 3 — Text notes + mock AI | `lib/data/notes.ts`, `components/notes/`, `hooks/useNotes.ts`, Edge Functions later |
| 4 — Voice + transcription | `components/notes/NoteRecorder.tsx`, `lib/data/supabase/storage.ts`, Edge Functions |
| 5 — Reports | `lib/data/reports.ts`, `app/projects/[projectId]/report.tsx`, `components/reports/` |
| Auth | `lib/supabase/auth.ts`, RLS policy migration, login screen in `app/` |
| iOS | No architectural change — Expo handles platform |

Do not implement these until explicitly requested.

---

## Quality bar

Before marking work complete:

- `npm run typecheck` passes
- No new god files
- No duplicated logic
- No hardcoded routes or copy in screens
- README updated if setup or architecture changed
- Manual smoke test: home → projects → create → detail
