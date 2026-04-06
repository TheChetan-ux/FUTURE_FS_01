create extension if not exists "uuid-ossp";
create extension if not exists postgis;

create type public.user_role as enum ('admin', 'owner', 'renter');
create type public.asset_kind as enum ('property', 'vehicle');
create type public.verification_status as enum ('pending', 'approved', 'rejected', 'resubmission_required');
create type public.booking_status as enum ('pending', 'confirmed', 'cancelled', 'completed', 'fined');
create type public.property_booking_mode as enum ('daily', 'monthly', 'hybrid');
create type public.subscription_tier as enum ('bronze', 'silver', 'gold');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role public.user_role not null default 'renter',
  city text,
  avatar_url text,
  membership_tier public.subscription_tier,
  created_at timestamptz not null default now()
);

create table if not exists public.properties (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  slug text unique not null,
  description text,
  property_type text not null,
  address text not null,
  city text not null,
  state text not null,
  pincode text,
  location geography(point, 4326),
  daily_rate numeric(10, 2),
  weekend_rate numeric(10, 2),
  monthly_rate numeric(10, 2),
  booking_mode public.property_booking_mode not null default 'hybrid',
  verification_status public.verification_status not null default 'pending',
  is_live boolean not null default false,
  cover_image_url text,
  image_urls text[] not null default '{}',
  verification_doc_urls text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.vehicles (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  slug text unique not null,
  vehicle_type text not null,
  brand text,
  model text,
  registration_number text unique not null,
  city text not null,
  location geography(point, 4326),
  block_rate numeric(10, 2) not null default 500,
  fuel_policy text not null default 'dry',
  dl_required boolean not null default true,
  dl_verification_status public.verification_status not null default 'pending',
  verification_status public.verification_status not null default 'pending',
  is_live boolean not null default false,
  image_urls text[] not null default '{}',
  verification_doc_urls text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.vehicle_time_slots (
  id uuid primary key default uuid_generate_v4(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  slot_start timestamptz not null,
  slot_end timestamptz not null,
  is_available boolean not null default true,
  check (slot_end = slot_start + interval '6 hours')
);

create table if not exists public.bookings (
  id uuid primary key default uuid_generate_v4(),
  asset_kind public.asset_kind not null,
  property_id uuid references public.properties(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete cascade,
  renter_id uuid not null references public.profiles(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  booking_status public.booking_status not null default 'pending',
  start_at timestamptz not null,
  end_at timestamptz not null,
  total_amount numeric(10, 2) not null default 0,
  booking_fee numeric(10, 2) not null default 0,
  late_fee numeric(10, 2) not null default 0,
  damage_fee numeric(10, 2) not null default 0,
  created_at timestamptz not null default now(),
  check (
    (asset_kind = 'property' and property_id is not null and vehicle_id is null) or
    (asset_kind = 'vehicle' and vehicle_id is not null and property_id is null)
  )
);

create table if not exists public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  tier public.subscription_tier not null,
  amount_paid numeric(10, 2) not null,
  status text not null default 'active',
  starts_at timestamptz not null default now(),
  ends_at timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.vehicles enable row level security;
alter table public.vehicle_time_slots enable row level security;
alter table public.bookings enable row level security;
alter table public.subscriptions enable row level security;
