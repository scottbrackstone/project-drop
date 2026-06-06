-- Stage 5D: rate/cost tracking for Edge Function LLM usage (service role only)

create table public.llm_usage_events (
  id uuid primary key default gen_random_uuid(),
  function_name text not null,
  fingerprint_hash text not null,
  estimated_chars integer not null default 0,
  created_at timestamptz not null default now()
);

create index llm_usage_events_fingerprint_created_at_idx
  on public.llm_usage_events (fingerprint_hash, created_at desc);

alter table public.llm_usage_events enable row level security;

-- No public policies — Edge Function uses service role only.
