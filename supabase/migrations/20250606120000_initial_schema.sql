-- ProjectDrop initial schema

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null,
  name text not null,
  description text null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid null,
  raw_transcript text null,
  cleaned_note text null,
  summary text null,
  audio_url text null,
  source text not null default 'voice',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  note_id uuid null references public.notes(id) on delete set null,
  title text not null,
  status text not null default 'open',
  due_date date null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.decisions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  note_id uuid null references public.notes(id) on delete set null,
  title text not null,
  reasoning text null,
  created_at timestamptz not null default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (project_id, name)
);

create table public.note_tags (
  note_id uuid not null references public.notes(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (note_id, tag_id)
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  content text not null,
  created_at timestamptz not null default now()
);

create index projects_user_id_idx on public.projects (user_id);
create index notes_project_id_created_at_idx on public.notes (project_id, created_at desc);
create index tasks_project_id_status_idx on public.tasks (project_id, status);

create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

create trigger notes_set_updated_at
before update on public.notes
for each row execute function public.set_updated_at();

create trigger tasks_set_updated_at
before update on public.tasks
for each row execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.notes enable row level security;
alter table public.tasks enable row level security;
alter table public.decisions enable row level security;
alter table public.tags enable row level security;
alter table public.note_tags enable row level security;
alter table public.reports enable row level security;

create policy mvp_allow_all_projects on public.projects for all using (true) with check (true);
create policy mvp_allow_all_notes on public.notes for all using (true) with check (true);
create policy mvp_allow_all_tasks on public.tasks for all using (true) with check (true);
create policy mvp_allow_all_decisions on public.decisions for all using (true) with check (true);
create policy mvp_allow_all_tags on public.tags for all using (true) with check (true);
create policy mvp_allow_all_note_tags on public.note_tags for all using (true) with check (true);
create policy mvp_allow_all_reports on public.reports for all using (true) with check (true);
