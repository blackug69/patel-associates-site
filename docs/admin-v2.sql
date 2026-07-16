-- =============================================================================
-- Admin v2 — Storage bucket (photo upload) + site_settings (Settings page)
-- Run in Supabase Dashboard → SQL Editor (or via the MCP once reconnected).
-- Safe to run once; guarded where practical.
-- =============================================================================

-- 1. Public "media" bucket for uploaded images (team photos, blog covers) -------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Public can READ media; only authenticated admins can write.
drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'media');

drop policy if exists "media admin write" on storage.objects;
create policy "media admin write" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');

drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects
  for update to authenticated using (bucket_id = 'media');

drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media');

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
  for all to authenticated using (true) with check (true);

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
