create extension if not exists pgcrypto;

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  hacker_news_id bigint unique not null,
  title text not null,
  summary text not null,
  summary_en text,
  published_at timestamptz,
  hn_url text not null,
  article_url text not null,
  created_at timestamptz not null default now()
);

create index if not exists news_created_at_idx on public.news (created_at desc);
alter table public.news enable row level security;
alter table public.news add column if not exists summary_en text;

-- Yazma işlemleri yalnızca service-role anahtarıyla çalışan API route üzerinden yapılır.
-- İstemci Supabase'e doğrudan bağlanmadığı için public write policy oluşturulmaz.
