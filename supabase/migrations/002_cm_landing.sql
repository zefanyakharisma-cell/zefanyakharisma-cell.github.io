-- ============================================================================
-- CroissantsMoon Landing CMS: editable landing-page content
-- ============================================================================
-- Stores the entire public /croissantsmoon landing page as a single JSONB
-- document (one singleton row). The public page deep-merges this over the
-- hardcoded defaults in lib/cm/landing-defaults.ts, so an empty row renders
-- the original page unchanged.
--
-- Reuses public.set_updated_at() defined in 001_initial_schema.sql.
-- RLS mirrors the single-owner pattern used by the rest of the schema.
-- ============================================================================

create table if not exists public.cm_landing (
  id         text primary key default 'singleton',
  content    jsonb not null default '{}'::jsonb,
  seo        jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_cm_landing_updated_at on public.cm_landing;
create trigger trg_cm_landing_updated_at
  before update on public.cm_landing
  for each row execute function public.set_updated_at();

-- Seed the singleton row (empty — defaults fill it in at render time).
insert into public.cm_landing (id) values ('singleton')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.cm_landing enable row level security;

drop policy if exists "cm_landing_public_read" on public.cm_landing;
drop policy if exists "cm_landing_admin_all"   on public.cm_landing;

create policy "cm_landing_public_read"
  on public.cm_landing
  for select
  using (true);

create policy "cm_landing_admin_all"
  on public.cm_landing
  for all
  to authenticated
  using      (auth.email() = 'zefanya.kharisma@gmail.com')
  with check (auth.email() = 'zefanya.kharisma@gmail.com');
