-- Tira is_admin() da API pública (aviso do Security Advisor): a função passa para um
-- schema não exposto e o app confere a permissão lendo public.admins (RLS só devolve
-- linhas para quem é admin).

create schema if not exists private;
grant usage on schema private to anon, authenticated;

create or replace function private.is_admin()
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

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated;

drop policy "publico le conteudo publicado" on public.site_content;
create policy "publico le conteudo publicado" on public.site_content
  for select to anon, authenticated
  using (id = 'published' or (select private.is_admin()));

drop policy "admin atualiza conteudo" on public.site_content;
create policy "admin atualiza conteudo" on public.site_content
  for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

drop policy "admin ve lista de admins" on public.admins;
create policy "admin ve lista de admins" on public.admins
  for select to authenticated
  using ((select private.is_admin()));

drop policy "admin envia midias" on storage.objects;
create policy "admin envia midias" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and (select private.is_admin()));

drop policy "admin atualiza midias" on storage.objects;
create policy "admin atualiza midias" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and (select private.is_admin()));

drop policy "admin remove midias" on storage.objects;
create policy "admin remove midias" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and (select private.is_admin()));

drop function public.is_admin();
