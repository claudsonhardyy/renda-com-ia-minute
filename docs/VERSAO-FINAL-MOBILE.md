# Versão final — site Renda com IA (web + mobile)

Registro completo do site no ponto aprovado em **28/10/2026**: exatamente o que aparece na
pré-visualização (computador e celular). Serve para retomar deste ponto sem perder nada.

| Item | Valor |
|------|-------|
| Repositório | `github.com/claudsonhardyy/renda-com-ia-minute` |
| Ramo | `mobile` |
| Tag deste ponto | **`v2.0-mobile`** (commit "versão final site renda com Ia Mobile") |
| Versão só web (anterior) | tag `v1.0-web`, ramo `main` |
| Conteúdo | 100% em `src/content/site.ts` (o conteúdo publicado no banco está vazio nesta data) |

---

## 1. Como retomar exatamente deste ponto

```bash
git clone https://github.com/claudsonhardyy/renda-com-ia-minute.git
cd renda-com-ia-minute
git checkout v2.0-mobile          # ou: git checkout mobile (ramo, para continuar editando)
npm ci                            # instala as versões exatas do package-lock.json
cp .env.example .env.local        # preencher URL e chave publicável do Supabase (opcional)
npm run build
npx next start -p 3001            # http://localhost:3001
```

- Sem o `.env.local` o site abre igual, com o conteúdo padrão (o painel `/admin` é que precisa
  do Supabase).
- **Ver no celular de verdade:** com o computador e o celular na mesma rede Wi‑Fi, abra no
  celular `http://<IP-do-computador>:3001` (o IP aparece em `ipconfig`).
- **Ver a simulação de celular no computador:** `cd tools && python -m http.server 3002` e abra
  `http://localhost:3002/emulador.html` (botões 390×844, 360×780 e 375×667).
- Para continuar com algo novo **sem mexer nesta versão**, crie um ramo a partir da tag:
  `git checkout -b novo-trabalho v2.0-mobile`. A tag nunca muda.

---

## 2. Tecnologia

| Item | Versão |
|------|--------|
| Next.js | 16.4.3 (App Router, Turbopack) — página pública estática regerada a cada 5 min (`revalidate = 300`) |
| React | 19.3.1 |
| Tailwind CSS | 4.3.3 — cores em `@theme` em `src/app/globals.css` |
| TypeScript | 7.0.2 |
| Supabase | `@supabase/ssr` 0.12.7 e `supabase-js` 2.118.0 — login do painel, tabela `site_content` (rascunho/publicado) e bucket `media` |
| Node | 22 ou mais novo |

---

## 3. Identidade visual (igual em todas as telas)

| Token | Cor | Uso |
|-------|-----|-----|
| `bg` | `#06251B` | Fundo de todas as páginas |
| `lime` | `#A6F774` | Destaques: parte final dos títulos, botões, setas, ícones, bolinhas |
| `lime-ink` | texto escuro sobre o verde | Texto dos botões verdes |
| `alert` | `#FF4B4B` | Somente os "!" de aviso, ✗ e o selo "Dica" |
| `card` | `#0D3427` | Cartões, com contorno verde fino |

- Fonte única **Plus Jakarta Sans**; classes padronizadas `.hero-title`, `.page-title`,
  `.page-sub`, `.block-title`, `.card-title`, `.card-text`, `.step-title`, `.step-text`.
- Imagens sempre na proporção natural (sem esticar), em alta resolução.
- Setas dos carrosséis: círculo verde com pulsação; no celular pulsam um pouco mais forte
  (`pulso-seta`, 1,6 s, escala 1 → 1,14) para chamar atenção.
- Bolinhas indicadoras: uma por item; a verde acesa desliza até o item atual.

---

## 4. Regra principal: uma página por tela

**Computador/notebook:** cada seção tem exatamente a altura da janela e a rolagem para de página
em página (`scroll-snap-type: y mandatory`). Medidas em `vh`/`dvh`. Conferido em 1280×548,
1280×600, 1366×600, 1366×657, 1440×790, 1536×730 e 1920×960.

**Celular (< 1024 px):** tudo o que muda usa `max-lg:`, `max-sm:` ou `lg:hidden`, então **o
computador não é afetado**. Alturas em `svh` (área visível do celular já sem as barras do
navegador). Padrão usado: `max-lg:h-[calc(100svh-4rem-2rem)]` = tela − menu do topo (4rem) −
respiro da seção (`py-4` = 2rem). Rolagem com `scroll-snap-type: y proximity`.

---

## 5. Página por página

Ordem fixa do site (`src/components/SiteView.tsx`). Menu fixo no topo; no celular vira o botão
**Menu**, que abre as 9 páginas em duas colunas.

### 1 · Início (`#inicio` — `sections/Inicio.tsx`, `HeroVideo.tsx`)

- **Computador:** título "Transforme seu celular em uma **ferramenta de renda extra.**", texto,
  botões **Ver passo a passo** (leva a *Como funciona*) e **Pausar vídeo / Assistir ao vídeo**;
  no centro, celular tocando `hero-video-1.mp4` e `hero-video-2.mp4` em sequência, sozinho e sem
  som (botão redondo de som na tela); à direita, a colagem `hero-colagem.jpg` esfumada.
- **Celular:** título → texto → celular com o vídeo → botão **Ver passo a passo**, tudo numa tela.
  - Sem o botão Pausar; no lugar, **barra de vídeo mínima** dentro da tela do celular: play/pausa,
    barra de avanço (verde, `.video-seek`) e som.
  - Atrás do celular, os **4 profissionais** (`hero-m-1..4.jpg`: cozinheira e barbeiro em cima,
    cabeleireira e pedreiro embaixo), 80% de opacidade, bordas esfumadas por máscara, com rosto,
    suporte na cabeça e a atividade visíveis nas laterais. O celular tem largura limitada para
    sobrar faixa para as fotos.

### 1.1 · Como funciona (`#como-funciona` — `sections/ComoFunciona.tsx`)

- 4 passos clicáveis que levam às páginas seguintes, e o quadro da MINUTE.
- **Celular:** título, quadro da MINUTE compacto (ícone menor, texto menor) e os 4 passos
  com espaçamento proporcional à altura da tela — tudo numa tela.

### 2 · Cadastro (`#cadastro-hub` — `sections/Cadastro.tsx`, `Connector.tsx`)

- 5 passos de cadastro na Hub; o passo 2 mostra o código **[RENDACOMIA]** com o aviso para usá-lo.
  Celular com a tela de cadastro da Hub (`cadastro-tela-hub.jpg`) e seta tracejada animada
  ligando o campo do código ao passo 2 (só no computador).
- **Celular:** passos em coluna e celular menor, centralizado (ocupa mais de uma tela).

### 3 · App MINUTE (`#app-minute` — `sections/AppMinute.tsx`, `AppCarousel.tsx`, `PhoneScreen.tsx`)

- **Computador:** apresentação, botões **App Store** / **Google Play** (links oficiais do
  *Minute Data*), aviso de login e o carrossel de **7 telas** (`app-passo-1..7.jpg`) num celular
  1:2 com hora, sinal e bateria; título e texto ao lado trocam junto; lupa ao passar o mouse.
- **Celular — duas telas:**
  1. Apresentação inteira numa tela, terminando com o aviso (círculo verde quicando + seta):
     "**Logo abaixo: tutorial de cadastro na MINUTE**" — "Role para baixo e passe as telas do
     celular para o lado para ver cada passo." Toca e leva ao tutorial.
  2. Tutorial (`#app-minute-tutorial`), numa tela só:
     - linha discreta "‹ Deslize ou toque nas setas para ver os passos ›";
     - celular com as setas dos dois lados, sempre inteiras (a largura do celular é limitada
       pela largura da tela menos o espaço das setas), pulsando;
     - logo abaixo, centralizados: bolinhas + selo "**Passo X de 7**";
     - título e descrição do passo, com o cartão de destaque compacto.

### 4 · Pagamentos (`#pagamentos` — `sections/Pagamentos.tsx`)

- Carteira de exemplo (**R$ 1.124,50**, valor fictício), 3 etapas (vídeo aprovado → saldo →
  saque), aviso sobre a chave Pix, informações de saldo e dias de saque.
- **Celular:** coluna única (ocupa mais de uma tela).

### 5 · Suporte (`#suporte` — `sections/Suporte.tsx`)

- Suporte de cabeça: foto 45° (`suporte-produto-45.jpg`) e sequência de uso
  (`suporte-sequencia.jpg`); opções **Pelo site da Hub** (gratuito) e **Compre online** (mais
  rápido); faixa "Dica" em vermelho.
- **Celular:** faixa "Dica" empilhada (ícone e selo em cima, texto embaixo).

### 6 · Gravação (`#dicas-gravacao` — `sections/Dicas.tsx`, `TipsCarousel.tsx`)

- **Computador:** "Dicas de gravação." com subtítulo em 2 linhas; carrossel de **8 dicas** no
  padrão do site (número, título, selos ✓/✗, ícones, linha, rodapé com o ! vermelho).
- **Celular** (`MobileTips`): **uma foto por tela**, 15 telas no total, na mesma ordem das dicas.
  Cada tela: número, título e o selo "1/2" ou "2/2", texto lateral, a foto (versão de celular
  `dica-m-N-K.jpg`, proporção natural) com o selo ✓/✗, o texto da foto e a nota. A dica da
  semana mostra as 5 fotos lado a lado (SEG…SEX) com as frases. As bolinhas continuam uma por
  dica; tocar numa bolinha vai para a primeira foto daquela dica.

### 7 · Compatibilidade (`#celulares-compativeis` — `sections/Celulares.tsx`)

- iPhone 12 ou mais novo · Pixel 6 ou mais novo · Galaxy S21 ou mais novo (exceto FE), com as
  fotos dos aparelhos e o botão **Verificar no site da Hub** (https://app.hub.xyz).
- **Celular:** os dois cartões lado a lado (fotos com até 24% da altura da tela, listas
  compactas) e o aviso do Hub bem menor e discreto, com botão pequeno.

### 8 · Propósito (`#proposito` — `sections/Proposito.tsx`)

- "Entenda o propósito." — robô (`proposito-robo.jpg`), 3 etapas (você grava → a IA aprende →
  o futuro avança) e o fechamento "**Você faz parte disso!**".
- **Celular:** robô grande ao fundo, no alto à direita, **espelhado olhando para a esquerda**,
  85% de opacidade, bordas esfumadas e o corpo sumindo para baixo. Os textos ficam na parte de
  baixo da tela, com uma sombra escura suave para continuarem legíveis; 3 ícones lado a lado
  com as setas entre eles; cartão de fechamento compacto.

### 9 · Dúvidas (`#duvidas` — `sections/Duvidas.tsx`, `EmailButton.tsx`)

- E-mail **duvidasrendacomia@gmail.com**, assunto "Dúvidas Renda com IA", cartão com o que
  informar e o prazo de **resposta em até 24 horas**.
- **Celular:** um único botão com o ícone de e-mail, o endereço e o chip verde **Copiar** →
  "Copiado!"; abaixo, "Envie pelo seu e-mail com o assunto **Dúvidas Renda com IA**." Cartão
  enxuto (só os títulos de cada item) e faixa do prazo compacta.

Rodapé: nome do guia e o aviso de guia independente.

---

## 6. Conferência feita nesta versão

| Tela | Resultado |
|------|-----------|
| 390×844 (iPhone 12–15) | Início, Como funciona, App MINUTE (2 telas), Gravação (15 telas), Compatibilidade, Propósito e Dúvidas cabem exatamente numa tela cada; tutorial com 36–57 px de folga em todos os 7 passos. Sem rolagem lateral. |
| 360×780 (Android comum) | Mesmo resultado. |
| 375×667 (iPhone SE) | Início, Propósito, Dúvidas e tutorial cabem. Passam um pouco: Como funciona (~21 px), Compatibilidade (~5 px) e algumas telas das Dicas (até ~74 px). |
| Computador (1280×548, 1366×657, 1920×960) | Igual à versão `v1.0-web`. |

Ferramentas usadas: ver `tools/` e a seção *Ferramentas de conferência* do README.

---

## 7. Limitações conhecidas e próximos passos possíveis

- Cadastro, Pagamentos e Suporte ainda ocupam mais de uma tela no celular.
- Ajuste fino para o iPhone SE (375×667) nas páginas citadas acima.
- O passo 7 do tutorial mostra a tela deitada porque a captura original do app é assim.

## 8. Pendências do cliente

- Links ainda vazios (aparecem como botões sem ação): `url_hub_cadastro`,
  `url_hub_pedido_suporte`, `url_compra_online`.
- Confirmar no Suporte: "na altura da **festa**" (provável "testa").
- Publicação (deploy) do site — ainda não feita.

## 9. Histórico até aqui

| Commit / tag | O quê |
|--------------|-------|
| `cb35d06` · `v1.0-web` | Versão final web |
| `4a85f5a` | Primeira adaptação para celular |
| `a6b64ed` | Todas as páginas pedidas cabem numa tela no celular |
| `v2.0-mobile` | **versão final site renda com Ia Mobile** — este documento, README e `tools/` |
