-- ============================================================================
-- Fix: CroissantsMoon Landing CMS write access
-- ============================================================================
-- 002_cm_landing.sql gated writes on a hardcoded portfolio-era email
-- (auth.email() = 'zefanya.kharisma@gmail.com'). The CroissantsMoon CMS admin
-- now signs in as zefanya.kharisma@croissantsmoon.com, so saving the landing
-- page was rejected by RLS ("new row violates row-level security policy"),
-- which surfaced as a generic Server Components render error on save.
--
-- The rest of the CroissantsMoon CMS (leads, proposals, proposal_templates)
-- grants full access to any authenticated user — login is the gate, since the
-- admin layout only checks that a user session exists. Align cm_landing with
-- that model so any signed-in admin can edit the landing page.
-- ============================================================================

drop policy if exists "cm_landing_admin_all" on public.cm_landing;

create policy "cm_landing_admin_all"
  on public.cm_landing
  for all
  to authenticated
  using      (true)
  with check (true);
