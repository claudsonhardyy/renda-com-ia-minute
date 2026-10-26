-- Painel de edição do site MINUTE.
-- Conteúdo guardado como JSON em duas linhas: 'draft' (rascunho do painel) e
-- 'published' (o que o site público exibe). Campos ausentes usam o padrão de src/content/site.ts.

create table public.site_content (
  id text primary key check (id in ('draft', 'published')),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by text
);

insert into public.site_content (id) values ('draft'), ('published');

-- Quem pode editar: e-mails cadastrados aqui (a conta é criada em Authentication > Users).
create table public.admins (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

alter table public.site_content enable row level security;
alter table public.admins enable row level security;

-- Público lê apenas a versão publicada; o rascunho nunca sai do painel.
create policy "publico le conteudo publicado" on public.site_content
  for select to anon, authenticated
  using (id = 'published' or (select public.is_admin()));

create policy "admin atualiza conteudo" on public.site_content
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "admin ve lista de admins" on public.admins
  for select to authenticated
  using ((select public.is_admin()));

-- Mídias (imagens e vídeos) trocadas pelo painel.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true, 52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'video/mp4', 'video/webm']
);

create policy "admin envia midias" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and (select public.is_admin()));

create policy "admin atualiza midias" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));

create policy "admin remove midias" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));
