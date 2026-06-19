-- Reference DDL for the portfolio's custom analytics layer.
-- Run this once in the Supabase SQL editor when setting up the project.
-- The app never executes this file; it documents the expected schema.

create table if not exists public.analytics_events (
  id          uuid primary key default gen_random_uuid(),
  session_id  text not null,
  event_type  text not null check (event_type in (
    'pageview', 'click', 'scroll', 'pageleave',
    'conversion', 'rage_click', 'dead_click'
  )),
  path        text,
  referrer    text,
  device      text check (device in ('mobile', 'desktop')),
  viewport_w  int,
  viewport_h  int,
  x_pct       real,   -- click x as % of document width  (heatmaps)
  y_pct       real,   -- click y as % of document height (heatmaps)
  scroll_pct  int,    -- max scroll depth reached, 0-100
  duration_ms int,    -- time-on-page, set on pageleave
  meta        jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists analytics_events_path_idx       on public.analytics_events (path);
create index if not exists analytics_events_event_type_idx  on public.analytics_events (event_type);
create index if not exists analytics_events_created_at_idx  on public.analytics_events (created_at desc);

-- Lock the table down: enable RLS with NO public policies.
-- Only the service-role key (used server-side in lib/supabaseAdmin.js) can
-- read or write, since it bypasses RLS. Anonymous clients get nothing.
alter table public.analytics_events enable row level security;

-- Migration for existing installs: widen the event_type constraint to add
-- conversion / rage_click / dead_click without dropping the table.
-- alter table public.analytics_events drop constraint analytics_events_event_type_check;
-- alter table public.analytics_events add check (event_type in (
--   'pageview', 'click', 'scroll', 'pageleave',
--   'conversion', 'rage_click', 'dead_click'
-- ));
