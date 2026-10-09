-- Only signed-in users need is_admin() (the admin pages call it); anonymous visitors never do.
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- Makes the intent explicit: an admin can see their own row, nobody can list the table.
create policy "Admins see their own row" on public.admins
  for select to authenticated
  using (user_id = (select auth.uid()));
