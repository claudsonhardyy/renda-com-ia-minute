-- Auditoria de segurança (30/10/2026).
-- Rode no SQL Editor do Supabase do site (ou com `supabase db push`). Não apaga nem altera o
-- conteúdo atual: só acrescenta proteções e o histórico de alterações.

-- 1) Histórico de cada alteração do conteúdo (rascunho e publicado).
--    Serve para saber quem mudou o quê e quando, e para voltar a uma versão anterior se o painel
--    for invadido ou alguém publicar algo por engano. Fica no schema "private", que NÃO é exposto
--    pela API pública: só é visível no painel do Supabase (dono do projeto).
create table if not exists private.site_content_history (
  history_id bigint generated always as identity primary key,
  row_id text not null,
  content jsonb not null,
  updated_by text,
  replaced_at timestamptz not null default now(),
  replaced_by_user uuid default auth.uid()
);

revoke all on private.site_content_history from public, anon, authenticated;

create or replace function private.guardar_versao_anterior()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old.content is distinct from new.content then
    insert into private.site_content_history (row_id, content, updated_by)
    values (old.id, old.content, old.updated_by);
  end if;
  return new;
end;
$$;

revoke all on function private.guardar_versao_anterior() from public, anon, authenticated;

drop trigger if exists guardar_versao_anterior on public.site_content;
create trigger guardar_versao_anterior
  before update on public.site_content
  for each row execute function private.guardar_versao_anterior();

-- Para restaurar uma versão (exemplo — troque o número pelo history_id desejado):
--   update public.site_content set content = (select content from private.site_content_history
--     where history_id = 123) where id = 'published';

-- 2) Defesa em profundidade: as tabelas já têm RLS sem regras de inclusão/exclusão (então a API
--    recusa), mas o Supabase concede por padrão todos os privilégios aos papéis da API.
--    TRUNCATE não passa pela RLS; tirar os privilégios que o site nunca usa fecha essa porta.
revoke insert, delete, truncate, references, trigger on public.site_content from anon, authenticated;
revoke update on public.site_content from anon;
revoke insert, update, delete, truncate, references, trigger on public.admins from anon, authenticated;
revoke select on public.admins from anon;

-- 3) Garante que a RLS continua LIGADA nas duas tabelas (se alguém desligou pelo painel, religa).
alter table public.site_content enable row level security;
alter table public.admins enable row level security;

-- 4) Conferência rápida (rode e veja o resultado):
--   select relname, relrowsecurity, relforcerowsecurity from pg_class
--     where relname in ('site_content', 'admins');
--   select * from public.admins;           -- deve listar SÓ o(s) e-mail(s) autorizado(s)
--   select id, content->'links' from public.site_content;  -- links que o site público usa
