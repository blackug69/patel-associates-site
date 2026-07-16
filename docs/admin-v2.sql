-- =============================================================================
-- Admin v2 — Storage bucket (photo upload) + site_settings (Settings page)
-- Run in Supabase Dashboard → SQL Editor (or via the MCP once reconnected).
-- Safe to run once; guarded where practical.
-- =============================================================================

-- 0. Admin allowlist + is_admin() (idempotent; also in docs/admin-hardening.sql).
--    Writes below are gated on membership, so a bare `authenticated` session
--    (should public sign-ups ever be on) still cannot write.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean language sql security definer set search_path = '' stable as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- Seed the first admin (edit the email if needed).
insert into public.admins (user_id)
select id from auth.users where email = 'qa@admin.com'
on conflict (user_id) do nothing;

-- 1. Public "media" bucket for uploaded images (team photos, blog covers) -------
--    Images only, 5 MB cap, and NO svg (SVG can carry script).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 5242880,
        array['image/png', 'image/jpeg', 'image/webp', 'image/gif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Public can READ media; only allow-listed admins can write.
drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'media');

drop policy if exists "media admin write" on storage.objects;
create policy "media admin write" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());

-- 2. Single-row site settings --------------------------------------------------
create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  firm_name text,
  tagline text,
  phone text,
  alt_phone text,
  email text,
  address text,
  hours text,
  whatsapp text,
  facebook text,
  instagram text,
  linkedin text,
  seo_default_description text,
  og_image_url text,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;

drop policy if exists site_settings_public_read on public.site_settings;
create policy site_settings_public_read on public.site_settings
  for select to anon using (true);

drop policy if exists site_settings_admin_all on public.site_settings;
create policy site_settings_admin_all on public.site_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into public.site_settings (id, firm_name, tagline, phone, alt_phone, email, address, hours)
values (
  1,
  'Patel Accounting & Legal Services',
  'Your Success. Our Commitment.',
  '+91 98254 42028',
  '+91 89804 13939',
  'saurabhpateloffice2026@gmail.com',
  '4th Floor, Office No. 7, Vinod Chamber, Dariyapur Road, Dariyapur, Ahmedabad 380001',
  'Mon to Sat · 10:00 to 19:00'
)
on conflict (id) do nothing;
