-- Writing section: posts in two languages, one admin, public read of published posts only.

create type public.post_stream as enum ('global', 'people', 'systems');
create type public.post_type as enum ('essay', 'reflection', 'field_note', 'explainer');
create type public.post_status as enum ('draft', 'published');
create type public.post_lang as enum ('en', 'id');

-- Who may write. Rows are added by hand (SQL editor) for the site owner.
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

-- A published post with a future published_at is "scheduled": it stays hidden until then.
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  streams public.post_stream[] not null default '{}',
  type public.post_type not null default 'essay',
  status public.post_status not null default 'draft',
  published_at timestamptz,
  cover_image_url text,
  cover_alt text not null default '',
  related_project text,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_has_date check (status = 'draft' or published_at is not null)
);
create index posts_published_at_idx on public.posts (published_at desc);
create index posts_related_project_idx on public.posts (related_project);

-- One row per language. `ready` = this language may be shown publicly.
create table public.post_translations (
  post_id uuid not null references public.posts (id) on delete cascade,
  lang public.post_lang not null,
  title text not null default '',
  excerpt text not null default '',
  body_json jsonb not null default '{"type":"doc","content":[]}',
  body_html text not null default '',
  reading_minutes integer not null default 1,
  ready boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (post_id, lang)
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger posts_touch before update on public.posts for each row execute function public.touch_updated_at();
create trigger post_translations_touch before update on public.post_translations for each row execute function public.touch_updated_at();

alter table public.posts enable row level security;
alter table public.post_translations enable row level security;

create policy "Public reads live posts" on public.posts
  for select to anon, authenticated
  using (status = 'published' and published_at <= now());

create policy "Public reads ready translations of live posts" on public.post_translations
  for select to anon, authenticated
  using (
    ready and exists (
      select 1 from public.posts p
      where p.id = post_id and p.status = 'published' and p.published_at <= now()
    )
  );

create policy "Admin manages posts" on public.posts
  for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Admin manages translations" on public.post_translations
  for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

-- Images: public bucket (anyone can view by URL), only the admin uploads or deletes.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('post-images', 'post-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do nothing;

create policy "Admin lists post images" on storage.objects
  for select to authenticated
  using (bucket_id = 'post-images' and (select public.is_admin()));

create policy "Admin uploads post images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'post-images' and (select public.is_admin()));

create policy "Admin updates post images" on storage.objects
  for update to authenticated
  using (bucket_id = 'post-images' and (select public.is_admin()));

create policy "Admin deletes post images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'post-images' and (select public.is_admin()));

-- Keep-alive ping (Vercel cron) reads this without touching real data.
create or replace function public.ping()
returns text
language sql
stable
set search_path = ''
as $$ select 'ok'::text $$;
