# Renda com IA — Site MINUTE

Landing page longa (9 seções) que guia pessoas a se cadastrar na Hub, configurar o app **MINUTE**,
gravar tarefas do dia a dia e receber pagamentos — com painel de edição para links, textos e mídias.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Em desenvolvimento, o que ainda falta configurar (links vazios,
itens de carrossel sem conteúdo) aparece marcado como **Pendente** em amarelo; em produção
(`npm run build && npm start`) esses avisos somem e itens vazios dos carrosséis ficam ocultos.

## Onde editar

Pelo **painel `/admin`** (login com e-mail e senha): links, textos, menu, imagens/vídeos e itens
dos carrosséis (adicionar, remover, reordenar). O fluxo é **Salvar rascunho → Pré-visualizar → Publicar**;
o site público só muda ao publicar. A aba *Links* lista os links pendentes e bloqueia a publicação
se algum estiver inválido (precisa começar com `https://` ou `http://`).

O conteúdo padrão (valores iniciais) está em [`src/content/site.ts`](src/content/site.ts); o que for
salvo no painel sobrescreve esses valores campo a campo.

## Configurar o banco (Supabase) — uma vez

1. Crie um projeto no Supabase e rode, em ordem, as migrações de [`supabase/migrations/`](supabase/migrations/)
   (SQL Editor do painel do Supabase, ou `supabase db push`). Elas criam as tabelas, o bucket `media` e as regras de acesso.
2. Copie `.env.example` para `.env.local` e preencha com a URL e a chave publicável (Project Settings → API).
   Na hospedagem (ex.: Vercel), cadastre as mesmas duas variáveis.
3. Crie a conta de quem vai editar: **Authentication → Users → Add user** (e-mail e senha, marque *Auto confirm*).
4. Dê permissão de edição a esse e-mail (SQL Editor):
   ```sql
   insert into public.admins (email) values ('email-do-editor@exemplo.com');
   ```
5. Recomendado: em **Authentication → Sign In / Providers**, desligue *Allow new users to sign up*.
   (Mesmo sem isso, só e-mails da tabela `admins` conseguem editar.)

Sem as variáveis de ambiente, o site funciona normalmente com o conteúdo padrão e o painel
mostra como configurar.

## Estado atual

- [x] 9 seções na ordem das referências, navegação por âncoras com seção ativa e menu compacto no celular
- [x] Botões e links conforme o mapa do Guia (seção 14); links vazios ficam desabilitados, nunca `#`
- [x] Carrossel do app (imagem + texto sincronizados) e carrossel de dicas (setas, indicadores, teclado, toque)
- [x] Mídia do celular do hero aceita imagem ou vídeo (play/pause); modal do tutorial (YouTube, Vimeo ou arquivo)
- [x] Verde `#B6F17E`, responsivo (desktop/tablet/celular), sem rolagem horizontal
- [x] Painel `/admin`: login, edição de links/textos/mídias, carrosséis ordenáveis, validação de links, rascunho → pré-visualização → publicação
- [x] Projeto Supabase `renda-com-ia-minute` (São Paulo, conta própria "Renda com IA") com as duas migrações aplicadas; Security Advisor sem avisos
- [ ] Conta de editor criada e liberada na tabela `admins`
- [ ] Publicação (deploy) do site
- [ ] Conteúdo pendente do cliente — ver [docs/ANALISE.md](docs/ANALISE.md)

As imagens iniciais em `public/media/` foram recortadas das referências; troque pelos arquivos
originais em alta resolução quando o cliente enviar.

## Fonte de verdade

- [Guia de Especificação Mestre](docs/Guia_Especificacao_Mestre_Site_MINUTE.pdf) — regras, campos editáveis, mapa de botões e critérios de aceitação.
- [Referências visuais](docs/referencias/) — uma imagem por seção, na ordem do site.
- [Análise das referências](docs/ANALISE.md) — inventário, pendências e decisões em aberto.

## Seções (ordem fixa)

A ordem segue a **numeração dos arquivos de referência no Drive** (decisão do cliente). Ela difere do
Guia apenas em Suporte (6) e Dicas de gravação (7), que no Guia aparecem invertidas.

| # | ID | Arquivo no Drive | Referência |
|---|----|------------------|-----------|
| 1 | `inicio` | 1- Página Inicial | [01-inicio-hero.jpg](docs/referencias/01-inicio-hero.jpg) |
| 2 | `como-funciona` | 1.1- Página inicial (Como funciona) | [02-como-funciona.jpg](docs/referencias/02-como-funciona.jpg) |
| 3 | `cadastro-hub` | 2- Página de cadastro | [03-cadastro-hub.jpg](docs/referencias/03-cadastro-hub.jpg) |
| 4 | `app-minute` | 3- Página do Minute | [04-app-minute.jpg](docs/referencias/04-app-minute.jpg) |
| 5 | `pagamentos` | 4- Página Pagamentos | [05-pagamentos.jpg](docs/referencias/05-pagamentos.jpg) |
| 6 | `suporte` | 5- Página Suporte da Cabeça | [06-suporte.jpg](docs/referencias/06-suporte.jpg) |
| 7 | `dicas-gravacao` | 6- Página de dicas de gravação | [07-dicas-gravacao.jpg](docs/referencias/07-dicas-gravacao.jpg) |
| 8 | `celulares-compativeis` | 7- Página "Pagamentos" (conteúdo: celulares) | [08-celulares-compativeis.jpg](docs/referencias/08-celulares-compativeis.jpg) |
| 9 | `proposito` | Página Entenda o Propósito (sem número → última) | [09-proposito.jpg](docs/referencias/09-proposito.jpg) |

Navegação superior: Início · Como funciona · Cadastro · App MINUTE · Pagamentos · Suporte · Gravação · Compatibilidade · Propósito.

## Identidade

- Fundo escuro (verde-petróleo quase preto), cartões com contorno verde fino e brilho sutil.
- Verde de destaque: **`#B6F17E`** (substitui os verdes das artes).
- Tipografia sans geométrica, títulos em peso bold com a segunda linha em verde.
- Marca sempre escrita **MINUTE**.
