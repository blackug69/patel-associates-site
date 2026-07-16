-- =============================================================================
-- Admin authorization hardening (defense-in-depth)
-- Addresses the security review: proxy/middleware is NOT a security boundary for
-- Server Actions. This moves the real boundary into the database: only users in
-- the `admins` allowlist may write content or read leads — even if the proxy is
-- bypassed and an action is invoked directly.
--
-- Apply via the Supabase MCP (apply_migration) or paste into Dashboard → SQL Editor.
-- Safe to run once. Re-running is guarded where practical.
-- =============================================================================

-- 1. Allowlist table -----------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

-- 2. is_admin() — SECURITY DEFINER so it can read admins under RLS. -------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1 from public.admins where user_id = (select auth.uid())
  );
$$;
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- admins table: only admins may see the allowlist.
drop policy if exists admins_self_read on public.admins;
create policy admins_read on public.admins
  for select to authenticated using ((select public.is_admin()));

-- 3. Rewrite content write policies: authenticated → admins only. --------------
-- Public SELECT of published rows is unchanged (anon read stays as-is).
do $$
declare t text;
begin
  foreach t in array array[
    'posts','team_members','testimonials','faqs','services','case_studies'
  ] loop
    execute format('drop policy if exists %I on public.%I', t || '_admin_all', t);
    execute format(
      'create policy %I on public.%I for all to authenticated
         using ((select public.is_admin())) with check ((select public.is_admin()))',
      t || '_admin_all', t
    );
  end loop;
end $$;

-- 4. Leads: public may still INSERT (contact form); only admins read/manage. ----
drop policy if exists leads_admin_all on public.leads;
create policy leads_admin_all on public.leads
  for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
-- leads_public_insert (anon INSERT) stays as-is.

-- 5. Seed the first admin. Replace the email if needed. -------------------------
insert into public.admins (user_id)
select id from auth.users where email = 'qa@admin.com'
on conflict (user_id) do nothing;

-- Verify:  select email from auth.users u join public.admins a on a.user_id = u.id;
