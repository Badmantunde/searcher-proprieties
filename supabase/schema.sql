-- Searcher Properties — run in Supabase SQL Editor

create extension if not exists "pgcrypto";

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  property_type text not null check (property_type in ('developed', 'developing')),
  title text not null,
  location text not null,
  description text not null,
  long_description text not null,
  card_image_url text not null,
  gallery_hero_url text not null,
  gallery_thumbnail_urls jsonb not null default '[]'::jsonb,
  price_range text,
  amenities jsonb not null default '[]'::jsonb,
  lease_label text,
  progress integer check (progress >= 0 and progress <= 100),
  completion text,
  units jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  featured_primary_badge text,
  featured_secondary_badge text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists properties_type_published_idx
  on public.properties (property_type, published);

create index if not exists properties_featured_idx
  on public.properties (featured)
  where featured = true and published = true;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists properties_updated_at on public.properties;
create trigger properties_updated_at
  before update on public.properties
  for each row execute function public.set_updated_at();

alter table public.properties enable row level security;

drop policy if exists "Public read published properties" on public.properties;
create policy "Public read published properties"
  on public.properties for select
  using (published = true);

drop policy if exists "Admins manage properties" on public.properties;
create policy "Admins manage properties"
  on public.properties for all
  to authenticated
  using (true)
  with check (true);

-- Storage bucket (create in Dashboard → Storage, or run below if allowed)
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read property images" on storage.objects;
create policy "Public read property images"
  on storage.objects for select
  using (bucket_id = 'property-images');

drop policy if exists "Admins upload property images" on storage.objects;
create policy "Admins upload property images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'property-images');

drop policy if exists "Admins update property images" on storage.objects;
create policy "Admins update property images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'property-images');

drop policy if exists "Admins delete property images" on storage.objects;
create policy "Admins delete property images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'property-images');
