# Renda com IA — Guia Hub + MINUTE

Site-guia independente que ensina, passo a passo, como ganhar uma renda extra gravando tarefas do
dia a dia: cadastro na **Hub**, configuração do app **MINUTE**, pagamentos, suporte de cabeça, dicas
de gravação, celulares compatíveis, propósito do projeto e contato para dúvidas.

Inclui um **painel `/admin`** para editar links, textos, imagens e vídeos sem mexer no código.

> **Versão final web** — layout aprovado pelo cliente para computador/notebook. A versão para
> celulares é desenvolvida no ramo `mobile`, a partir deste ponto.

---

## Sumário

1. [Tecnologia](#tecnologia)
2. [Rodar localmente](#rodar-localmente)
3. [Regras de layout (web)](#regras-de-layout-web)
4. [Identidade visual](#identidade-visual)
5. [Páginas do site](#páginas-do-site)
6. [Painel de edição (/admin)](#painel-de-edição-admin)
7. [Estrutura do código](#estrutura-do-código)
8. [Mídias](#mídias)
9. [Banco de dados (Supabase)](#banco-de-dados-supabase)
10. [Pendências do cliente](#pendências-do-cliente)

---

## Tecnologia

| Item | Versão / uso |
|------|--------------|
| Next.js | 16.4 (App Router, Turbopack) |
| React | 19.3 |
| Tailwind CSS | 4.3 (tokens de cor em `@theme`, em `src/app/globals.css`) |
| TypeScript | 7.0 |
| Supabase | Autenticação do painel, conteúdo (tabela `site_content`) e upload de mídias (bucket `media`) |

## Rodar localmente

```bash
npm install
npm run dev          # desenvolvimento em http://localhost:3000
npm run build        # versão de produção
npm start            # serve a versão de produção
```

Em desenvolvimento, conteúdos ainda não configurados aparecem marcados como **Pendente** (amarelo).
Em produção esses avisos não aparecem.

## Regras de layout (web)

- **Uma página por tela:** cada seção ocupa exatamente a altura da janela e cabe inteira, sem rolar
  dentro dela. A rolagem para de página em página (`scroll-snap`).
- Tamanhos de texto e imagens acompanham a altura da tela (`vh`/`dvh`), para caber em notebooks.
- Conferido sem cortes e sem rolagem lateral em **1280×548, 1280×600, 1366×600, 1366×657,
  1440×790, 1536×730 e 1920×960**.
- Menu fixo no topo com a página atual destacada; no celular, o menu vira um botão "Menu".

## Identidade visual

| Token | Cor | Uso |
|-------|-----|-----|
| `bg` | `#06251B` (verde-floresta escuro) | Fundo principal |
| `lime` | `#A6F774` (verde-lima luminoso) | Títulos em destaque, botões, setas, ícones |
| `alert` | `#FF4B4B` (vermelho) | Somente ícones de aviso (!), ✗ e o selo "Dica" |
| `card` | `#0D3427` | Cartões, com contorno verde fino |

- Fonte única: **Plus Jakarta Sans**. Títulos com a parte final em verde.
- Classes de tipografia padronizadas: `.hero-title`, `.page-title`, `.page-sub`, `.block-title`,
  `.card-title`, `.card-text`, `.step-title`, `.step-text`.
- Setas dos carrosséis: círculo verde de 38 px com pulsação suave (3,2 s).
- Indicador de passo: bolinhas, uma por item, e a verde acesa desliza até o item atual.

## Páginas do site

Ordem fixa, igual à numeração das referências do cliente no Drive.

| # | Página (menu) | ID | Conteúdo |
|---|---------------|----|----------|
| 1 | **Início** | `inicio` | Título "Transforme seu celular em uma ferramenta de renda extra.", texto, botão **Ver passo a passo** (vai para *Como funciona*) e botão **Pausar vídeo / Assistir ao vídeo**. No centro, um celular que toca os **vídeos 1 e 2** em sequência, sozinho e sem som (com botão de som na tela). À direita, a colagem de fotos com as bordas esfumadas. |
| 1.1 | *(extensão do Início)* | `como-funciona` | "Como funciona?" — 4 passos clicáveis que levam às páginas seguintes. |
| 2 | **Cadastro** | `cadastro-hub` | Passo a passo de cadastro na Hub (5 passos). O passo 2 mostra o código de indicação **[RENDACOMIA]** e o aviso para usá-lo. Celular com a tela de cadastro da Hub, com **RENDACOMIA** no campo do código e uma seta tracejada animada ligando o campo do celular ao passo 2. |
| 3 | **App MINUTE** | `app-minute` | Apresentação do app, botões **App Store** e **Google Play** (links oficiais do *Minute Data*) e aviso de login. Carrossel de **7 telas do app** dentro de um celular no formato 1:2, com hora, sinal e bateria; o título e o texto ao lado trocam junto com a tela. Lupa ao passar o mouse para ler os detalhes. |
| 4 | **Pagamentos** | `pagamentos` | Carteira de exemplo (**R$ 1.124,50**, valor fictício), 3 etapas (vídeo aprovado → saldo → saque), aviso sobre a chave Pix e informações de saldo e dias de saque. |
| 5 | **Suporte** | `suporte` | Suporte de cabeça: foto do produto (45°) e sequência de uso; duas opções — **Pelo site da Hub** (gratuito) e **Compre online** (mais rápido) — e a faixa "Dica" em vermelho. |
| 6 | **Gravação** | `dicas-gravacao` | "Dicas de gravação." com subtítulo em 2 linhas. Carrossel de **8 dicas** montadas no padrão do site (mesmo quadro, número, título, selos ✓/✗, ícones, linha e rodapé com o ! vermelho), com as fotos recortadas das imagens do cliente. Navegação por setas e bolinhas. |
| 7 | **Compatibilidade** | `celulares-compativeis` | iPhone 12 ou mais novo · Pixel 6 ou mais novo · Galaxy S21 ou mais novo (exceto FE), com fotos dos aparelhos e o botão **Verificar no site da Hub** (https://app.hub.xyz). |
| 8 | **Propósito** | `proposito` | "Entenda o propósito." — imagem do robô, 3 etapas (você grava → a IA aprende → o futuro avança) e o fechamento "Você faz parte disso!". |
| 9 | **Dúvidas** | `duvidas` | Contato por e-mail: endereço **duvidasrendacomia@gmail.com** com botão **Copiar endereço** e a instrução de envio (assunto "Dúvidas Renda com IA"); cartão com o que informar (nome, dúvida, prints opcionais) e o prazo de **resposta em até 24 horas**. |

Rodapé: nome do guia e o aviso de que é um guia independente.

### Links configurados

| Link | Destino |
|------|---------|
| App Store (MINUTE) | https://apps.apple.com/br/app/minute-data/id6760918280 |
| Google Play (MINUTE) | https://play.google.com/store/apps/details?id=com.bakerdata.minute |
| Verificar no site da Hub | https://app.hub.xyz |
| E-mail de dúvidas | duvidasrendacomia@gmail.com |

Links ainda vazios aparecem como botões sem ação (nunca levam a um destino inventado) — ver
[Pendências](#pendências-do-cliente).

## Painel de edição (/admin)

Acesse `/admin` e entre com o e-mail e a senha liberados. Cada aba corresponde a uma página:
**Links · Identidade do guia · Menu superior · 1 Início · 2 Como funciona · 3 Cadastro ·
4 App MINUTE · 5 Pagamentos · 6 Suporte · 7 Dicas de gravação · 8 Celulares compatíveis ·
9 Propósito · 10 Dúvidas** (a numeração do painel conta o "Como funciona" como página própria).

- Edita textos, links, imagens e vídeos (upload direto), além dos itens dos carrosséis
  (adicionar, remover, reordenar).
- Fluxo: **Salvar rascunho → Pré-visualizar → Publicar**. O site público só muda ao publicar.
- Links precisam começar com `https://` ou `http://`; o e-mail de dúvidas é validado.
- Marcação nos textos das dicas: `**trecho**` = cor da coluna (verde/vermelho), `++verde++`,
  `!!vermelho!!`, `__branco em negrito__`; quebra de linha = nova linha.

O conteúdo padrão está em [`src/content/site.ts`](src/content/site.ts); o que for salvo no painel
sobrescreve esses valores campo a campo.

## Estrutura do código

```
src/
  app/
    page.tsx              página pública (lê o conteúdo publicado)
    globals.css           cores, tipografia, rolagem por página, animações
    admin/                painel: login, editor, pré-visualização, ações de salvar/publicar
  content/site.ts         TODO o conteúdo padrão (textos, links, mídias, carrosséis)
  components/
    SiteView.tsx          monta o site inteiro na ordem das páginas
    Header.tsx            menu fixo do topo (e menu do celular)
    sections/*.tsx        uma página por arquivo (Inicio, ComoFunciona, Cadastro, AppMinute,
                          Pagamentos, Suporte, Dicas, Celulares, Proposito, Duvidas)
    HeroVideo.tsx         vídeos do celular do Início + botão Pausar/Assistir
    AppCarousel.tsx       carrossel do app (celular, barra de status, texto sincronizado)
    PhoneScreen.tsx       tela do celular do app com lupa
    TipsCarousel.tsx      carrossel das dicas no padrão único
    EmailButton.tsx       endereço de e-mail com botão de copiar
    Connector.tsx         seta tracejada animada do Cadastro
    StepDots.tsx          bolinhas indicadoras dos carrosséis
    ui.tsx                peças comuns: Section, PhoneFrame, CarouselArrow, ExternalLink…
    Icon.tsx              ícones desenhados em SVG (sem dependências)
  lib/                    leitura do conteúdo publicado e clientes do Supabase
supabase/migrations/      tabelas, regras de acesso e bucket de mídias
docs/                     guia do cliente, referências visuais e análise
```

## Mídias

Todas em [`public/media/`](public/media/), em alta resolução:

- `hero-video-1.mp4`, `hero-video-2.mp4` — vídeos do celular do Início (720×1280, H.264).
- `hero-colagem.jpg`, `hero-tela-tarefas.jpg` — colagem do Início e imagem reserva do celular.
- `cadastro-tela-hub.jpg` — tela de cadastro da Hub com o código RENDACOMIA.
- `app-passo-1.jpg` … `app-passo-7.jpg` — telas do carrossel do app (resolução original).
- `dica-N-K.jpg` — fotos das 8 dicas de gravação (N = dica, K = foto).
- `suporte-produto-45.jpg`, `suporte-sequencia.jpg` — suporte de cabeça.
- `celular-iphone-hd.png`, `celular-android-hd.png` — aparelhos compatíveis.
- `proposito-robo.jpg` — imagem do Propósito.

## Banco de dados (Supabase)

Projeto `renda-com-ia-minute` (região São Paulo), em conta própria "Renda com IA".

1. Rode, em ordem, as migrações de [`supabase/migrations/`](supabase/migrations/).
2. Copie `.env.example` para `.env.local` e preencha a URL e a chave publicável
   (as mesmas duas variáveis vão na hospedagem).
3. Crie o usuário editor em **Authentication → Users** e libere o e-mail:
   ```sql
   insert into public.admins (email) values ('email-do-editor@exemplo.com');
   ```

Sem as variáveis de ambiente, o site funciona com o conteúdo padrão.

## Pendências do cliente

- Links ainda vazios: cadastro na Hub (`url_hub_cadastro`), suporte pelo site da Hub
  (`url_hub_pedido_suporte`) e compra online do suporte (`url_compra_online`).
- Confirmar o texto do Suporte: "na altura da **festa**" (provável "testa").
- Publicação (deploy) do site.
