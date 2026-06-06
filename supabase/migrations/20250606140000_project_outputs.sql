-- Stage 5A: extend reports for project output mode and scope

alter table public.reports
  add column mode text not null default 'snapshot',
  add column scope text not null default 'full',
  add column scope_from timestamptz null,
  add column scope_to timestamptz null;

create index reports_project_id_created_at_idx
  on public.reports (project_id, created_at desc);
