-- Run this once in Supabase SQL Editor (Dashboard → SQL Editor → New query → paste → Run)

-- 1. Likes table
create table if not exists public.blog_likes (
  slug text primary key,
  count int not null default 0,
  updated_at timestamptz not null default now()
);

-- 2. Row Level Security: anyone can READ counts, writes only via the RPCs below
alter table public.blog_likes enable row level security;

drop policy if exists "blog_likes_select_all" on public.blog_likes;
create policy "blog_likes_select_all"
  on public.blog_likes for select
  to anon, authenticated
  using (true);

-- 3. Atomic increment / decrement functions (security definer = bypasses RLS for inserts)
create or replace function public.increment_blog_likes(p_slug text)
returns int
language sql
security definer
set search_path = public
as $$
  insert into public.blog_likes (slug, count, updated_at)
  values (p_slug, 1, now())
  on conflict (slug)
    do update set count = public.blog_likes.count + 1, updated_at = now()
  returning count;
$$;

create or replace function public.decrement_blog_likes(p_slug text)
returns int
language sql
security definer
set search_path = public
as $$
  insert into public.blog_likes (slug, count, updated_at)
  values (p_slug, 0, now())
  on conflict (slug)
    do update set count = greatest(public.blog_likes.count - 1, 0), updated_at = now()
  returning count;
$$;

grant execute on function public.increment_blog_likes(text) to anon, authenticated;
grant execute on function public.decrement_blog_likes(text) to anon, authenticated;

-- 4. Enable Realtime on this table (so the website gets live updates via WebSocket)
alter publication supabase_realtime add table public.blog_likes;
