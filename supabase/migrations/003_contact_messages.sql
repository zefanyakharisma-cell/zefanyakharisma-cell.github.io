-- ============================================================================
-- Contact form submissions
-- ============================================================================
-- Stores every message sent through the public /contact form. Rows are
-- inserted server-side with the service_role key (which bypasses RLS), so no
-- public INSERT policy exists. Only the admin can read them.
-- ============================================================================

create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

-- Admin can read/manage; inserts happen via service_role (bypasses RLS).
drop policy if exists "contact_messages_admin_all" on public.contact_messages;
create policy "contact_messages_admin_all"
  on public.contact_messages
  for all
  using      (auth.email() = 'zefanya.kharisma@gmail.com')
  with check (auth.email() = 'zefanya.kharisma@gmail.com');
