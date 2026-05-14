-- Trek Robotics Database Schema
-- Run this in your Supabase SQL editor

-- Guest requests table
create table if not exists guest_requests (
  id uuid default gen_random_uuid() primary key,
  room_number text not null,
  message text not null,
  category text not null check (category in ('housekeeping', 'room_service', 'concierge', 'maintenance', 'front_desk')),
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'dispatched', 'resolved')),
  ai_handled boolean default false,
  assigned_to text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Robot fleet table
create table if not exists robots (
  id uuid default gen_random_uuid() primary key,
  unit_id text unique not null,
  status text not null default 'idle' check (status in ('online', 'busy', 'idle', 'charging', 'offline')),
  current_task text,
  location text,
  battery integer default 100,
  updated_at timestamptz default now()
);

-- Chat messages table
create table if not exists chat_messages (
  id uuid default gen_random_uuid() primary key,
  room_number text not null,
  role text not null check (role in ('guest', 'ai')),
  content text not null,
  created_at timestamptz default now()
);

-- Enable real-time for live dashboard updates
alter publication supabase_realtime add table guest_requests;
alter publication supabase_realtime add table robots;

-- Seed robot fleet
insert into robots (unit_id, status, current_task, location, battery) values
  ('TR-01', 'busy', 'Delivery to Room 412', 'Floor 4', 87),
  ('TR-02', 'busy', 'Delivery to Room 307', 'Floor 3', 72),
  ('TR-03', 'online', 'Lobby patrol', 'Lobby', 95),
  ('TR-04', 'charging', null, 'Charging Dock', 34),
  ('TR-05', 'idle', null, 'Floor 2', 100)
on conflict (unit_id) do nothing;

-- RLS Policies (enable for production)
-- alter table guest_requests enable row level security;
-- alter table robots enable row level security;
-- alter table chat_messages enable row level security;
