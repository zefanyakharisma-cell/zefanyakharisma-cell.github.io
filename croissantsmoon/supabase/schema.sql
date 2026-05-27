-- ============================================================
-- CroissantsMoon Studio OS — Complete Supabase Schema
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── ENUMS ───────────────────────────────────────────────────

create type lead_status as enum (
  'lead_identified', 'audit_completed', 'proposal_drafted', 'proposal_sent',
  'opened', 'under_discussion', 'negotiation', 'closed_won', 'closed_lost', 'archived'
);

create type lead_temperature as enum ('cold', 'warm', 'hot');

create type project_type as enum (
  'institutional_website', 'landing_page', 'dashboard_system',
  'international_office', 'university_digitalization', 'custom'
);

create type proposal_status as enum (
  'draft', 'active', 'expired', 'archived', 'closed_won', 'closed_lost'
);

create type token_status as enum ('active', 'expired', 'revoked');

create type analytics_event_type as enum (
  'view', 'section_view', 'pricing_view', 'cta_click', 'token_entry', 'session_end'
);

create type followup_type as enum ('email', 'call', 'meeting', 'note');

-- ─── LEADS ───────────────────────────────────────────────────

create table leads (
  id                uuid primary key default uuid_generate_v4(),
  organization      text not null,
  contact_person    text not null,
  email             text not null,
  industry          text,
  website           text,
  project_type      project_type not null default 'institutional_website',
  estimated_value   bigint,
  status            lead_status not null default 'lead_identified',
  temperature       lead_temperature not null default 'cold',
  engagement_score  integer not null default 0 check (engagement_score >= 0),
  notes             text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index idx_leads_status on leads(status);
create index idx_leads_temperature on leads(temperature);
create index idx_leads_created_at on leads(created_at desc);

-- ─── PROPOSAL TEMPLATES ──────────────────────────────────────

create table proposal_templates (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  description   text,
  project_type  project_type not null default 'custom',
  blocks        jsonb not null default '[]',
  placeholders  jsonb not null default '{}',
  is_archived   boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ─── PROPOSALS ───────────────────────────────────────────────

create table proposals (
  id               uuid primary key default uuid_generate_v4(),
  lead_id          uuid not null references leads(id) on delete cascade,
  template_id      uuid references proposal_templates(id) on delete set null,
  slug             text not null unique,
  title            text not null,
  status           proposal_status not null default 'draft',
  token            text not null,
  token_status     token_status not null default 'active',
  expires_at       timestamptz,
  content          jsonb not null default '{"sections":[]}',
  views            integer not null default 0,
  unique_visitors  integer not null default 0,
  pricing_views    integer not null default 0,
  cta_clicks       integer not null default 0,
  first_viewed_at  timestamptz,
  last_viewed_at   timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index idx_proposals_lead_id on proposals(lead_id);
create index idx_proposals_slug on proposals(slug);
create index idx_proposals_status on proposals(status);
create index idx_proposals_token on proposals(token);

-- ─── PROPOSAL VERSIONS ───────────────────────────────────────

create table proposal_versions (
  id              uuid primary key default uuid_generate_v4(),
  proposal_id     uuid not null references proposals(id) on delete cascade,
  version_number  integer not null,
  content         jsonb not null,
  note            text,
  created_by      uuid references auth.users(id),
  created_at      timestamptz not null default now(),
  unique(proposal_id, version_number)
);

create index idx_proposal_versions_proposal_id on proposal_versions(proposal_id);

-- ─── ANALYTICS EVENTS ────────────────────────────────────────

create table analytics_events (
  id           uuid primary key default uuid_generate_v4(),
  proposal_id  uuid not null references proposals(id) on delete cascade,
  event_type   analytics_event_type not null,
  session_id   text not null,
  user_agent   text,
  ip_hash      text,
  metadata     jsonb not null default '{}',
  created_at   timestamptz not null default now()
);

create index idx_analytics_proposal_id on analytics_events(proposal_id);
create index idx_analytics_event_type on analytics_events(event_type);
create index idx_analytics_created_at on analytics_events(created_at desc);

-- ─── FOLLOW-UPS ──────────────────────────────────────────────

create table followups (
  id              uuid primary key default uuid_generate_v4(),
  lead_id         uuid not null references leads(id) on delete cascade,
  proposal_id     uuid references proposals(id) on delete set null,
  type            followup_type not null default 'note',
  content         text not null,
  next_follow_up  timestamptz,
  created_by      uuid references auth.users(id),
  created_at      timestamptz not null default now()
);

create index idx_followups_lead_id on followups(lead_id);

-- ─── UPDATED_AT TRIGGER ──────────────────────────────────────

create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_updated_at before update on leads
  for each row execute function update_updated_at();

create trigger proposals_updated_at before update on proposals
  for each row execute function update_updated_at();

create trigger proposal_templates_updated_at before update on proposal_templates
  for each row execute function update_updated_at();

-- ─── INCREMENT VIEWS FUNCTION ────────────────────────────────

create or replace function increment_proposal_views(proposal_id uuid)
returns void language plpgsql security definer as $$
begin
  update proposals
  set
    views = views + 1,
    last_viewed_at = now(),
    first_viewed_at = coalesce(first_viewed_at, now())
  where id = proposal_id;
end;
$$;

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

alter table leads enable row level security;
alter table proposals enable row level security;
alter table proposal_templates enable row level security;
alter table proposal_versions enable row level security;
alter table analytics_events enable row level security;
alter table followups enable row level security;

-- Leads: only authenticated users can read/write
create policy "leads_auth_all" on leads
  for all to authenticated using (true) with check (true);

-- Proposals: authenticated users can read/write; public can read active ones by slug
create policy "proposals_auth_all" on proposals
  for all to authenticated using (true) with check (true);

create policy "proposals_public_read" on proposals
  for select to anon
  using (status in ('active', 'expired') and token_status = 'active');

-- Proposal templates: authenticated only
create policy "templates_auth_all" on proposal_templates
  for all to authenticated using (true) with check (true);

-- Proposal versions: authenticated only
create policy "versions_auth_all" on proposal_versions
  for all to authenticated using (true) with check (true);

-- Analytics: anon can insert (tracking), authenticated can read
create policy "analytics_anon_insert" on analytics_events
  for insert to anon with check (true);

create policy "analytics_auth_read" on analytics_events
  for select to authenticated using (true);

-- Followups: authenticated only
create policy "followups_auth_all" on followups
  for all to authenticated using (true) with check (true);

-- ─── SEED: DEFAULT TEMPLATES ─────────────────────────────────

insert into proposal_templates (name, description, project_type, blocks) values
(
  'Institutional Website Proposal',
  'Standard proposal for universities and institutional clients.',
  'institutional_website',
  '[
    {"id":"1","type":"hero","order":0,"visible":true,"data":{"headline":"Transforming {{organization_name}}''s Digital Presence","subheadline":"A Strategic Institutional Website Modernization Proposal by CroissantsMoon"}},
    {"id":"2","type":"greeting","order":1,"visible":true,"data":{"message":"Dear {{contact_person}},\n\nWe have carefully studied {{organization_name}}''s current digital footprint and prepared this comprehensive modernization proposal tailored specifically to your institutional needs."}},
    {"id":"3","type":"audit_findings","order":2,"visible":true,"data":{"findings":"[Enter your audit findings here]"}},
    {"id":"4","type":"features","order":3,"visible":true,"data":{"features":"Modern responsive design\nAdvanced CMS for easy content management\nMulti-language support\nIntegrated student portal\nAdvanced search functionality\nSEO-optimized architecture\nAccessibility compliance (WCAG 2.1)"}},
    {"id":"5","type":"pricing","order":4,"visible":true,"data":{"package":"Professional Institutional Package","price":"IDR 75,000,000","inclusions":"Complete website redesign\nCustom CMS development\n12 months support\nSEO setup\nTraining sessions"}},
    {"id":"6","type":"timeline","order":5,"visible":true,"data":{"timeline":"Week 1-2: Discovery & Strategic Planning\nWeek 3-5: UX Research & Design\nWeek 6-9: Development & Integration\nWeek 10-11: Testing & QA\nWeek 12: Launch & Handover"}},
    {"id":"7","type":"cta","order":6,"visible":true,"data":{"heading":"Ready to Transform {{organization_name}}?","button":"Schedule a Discovery Call","email":"contact@croissantsmoon.studio"}}
  ]'
),
(
  'Dashboard System Proposal',
  'For analytics dashboards and administrative systems.',
  'dashboard_system',
  '[
    {"id":"1","type":"hero","order":0,"visible":true,"data":{"headline":"A Next-Generation Dashboard for {{organization_name}}","subheadline":"Centralized intelligence. Real-time insights. Executive clarity."}},
    {"id":"2","type":"greeting","order":1,"visible":true,"data":{"message":"Dear {{contact_person}},\n\nThis proposal outlines our vision for a comprehensive dashboard system designed specifically for {{organization_name}}''s operational needs."}},
    {"id":"3","type":"features","order":2,"visible":true,"data":{"features":"Real-time data visualization\nCustomizable dashboard modules\nRole-based access control\nMobile-responsive interface\nAutomated reporting\nAPI integrations\nAudit logging"}},
    {"id":"4","type":"pricing","order":3,"visible":true,"data":{"package":"Enterprise Dashboard Package","price":"IDR 95,000,000"}},
    {"id":"5","type":"timeline","order":4,"visible":true,"data":{"timeline":"Week 1-2: Requirements & Architecture\nWeek 3-4: UI/UX Design\nWeek 5-9: Development\nWeek 10: Testing\nWeek 11-12: Deployment & Training"}},
    {"id":"6","type":"cta","order":5,"visible":true,"data":{"heading":"Ready to Centralize Your Intelligence?","button":"Begin the Conversation","email":"contact@croissantsmoon.studio"}}
  ]'
);
