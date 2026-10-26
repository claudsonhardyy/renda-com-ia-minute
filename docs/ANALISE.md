# Análise da pasta "Site Hub" (Google Drive)

Analisado em 26/10/2026. A pasta tem 10 arquivos: o Guia de Especificação Mestre (PDF, 17 páginas)
e 9 capturas das telas (JPEG, apesar da extensão `.png` no Drive).

## Mapeamento arquivo → seção

| Arquivo no Drive | Seção no site | Observação |
|---|---|---|
| 1.1- Página Inicial (Como funciona) | 1 · Início / Hero | |
| 1.1- Página inicial (Como funciona).png | 2 · Como funciona | mesmo prefixo "1.1" do hero |
| 2- Página de cadastro.png | 3 · Como se cadastrar | |
| 3- Página do Minute.png | 4 · App MINUTE | |
| 4- Página Pagamentos.png | 5 · Pagamentos | |
| 6- Página de dicas de gravação.png | 6 · Dicas de gravação | |
| 5- Página Suporte da Cabeça.png | 7 · Suporte | numeração do Drive invertida com a 6; vale a ordem do Guia |
| 7- Página Pagamentos.png | 8 · Celulares compatíveis | **nome do arquivo errado** (conteúdo é compatibilidade) |
| Página Entenda o Propósito.png | 9 · Propósito | |

## Conteúdo extraído por seção

1. **Início** — "Faça seu trabalho render ainda mais." · subtítulo · botões "Ver passo a passo →" e "Assistir ao tutorial" · telefone com tela "Tarefas" (Hoje/Processando/Concluídas) · foto de mulher cozinhando com suporte na cabeça.
2. **Como funciona?** — 4 passos (Cadastro na Hub, Configure o MINUTE, Grave suas tarefas, Análise e pagamento) + bloco "O MINUTE é o aplicativo de gravação".
3. **Como se cadastrar** — 5 passos numerados, botão "Acessar a Hub – inserir meu link", telefone com formulário "Criar sua conta" (nome, e-mail, código de indicação, nascimento, CPF, forma de pagamento), aviso "Não invente dados nem use e-mails diferentes entre as contas".
4. **App MINUTE** — "O app onde tudo acontece." · logo "M. MINUTE — Grave. Contribua. Ganhe." · carrossel do telefone com setas · texto sincronizado "Passo 1 de 5 — Grave pelo app".
5. **Pagamentos** — "Seu trabalho vira saldo." · carteira ilustrativa R$ 186,50 · 3 etapas (vídeo aprovado, saldo na carteira, solicite o saque via Pix) · alerta da chave Pix · blocos "Saldo na carteira da Hub" e "Dias de saque".
6. **Dicas de gravação** — carrossel com cartão central (imagem + selo ✓/✗ + título + descrição), cartões laterais parcialmente visíveis, seta "Passe para o lado", 4 indicadores.
7. **Suporte de cabeça** — foto do produto + foto de uso com ângulo de 45° · "Pelo site da Hub (Gratuito)" e "Compre online (Rápido e acessível)" · lista "Links úteis para compra".
8. **Celulares compatíveis** — iPhone 12 ao 16 (todas as variantes) · Android: Samsung S21–S25, Google Pixel 6–9, outras marcas (Xiaomi, Motorola, OnePlus, Realme, Oppo, Vivo) · aviso "Importante!".
9. **Propósito** — robô com suporte na cabeça · 3 etapas (Você grava → A IA aprende → O futuro avança) · bloco "Você faz parte disso!".

## Pendências — conteúdo que o cliente precisa fornecer

- [ ] **Imagens isoladas** (sem texto): as referências são capturas achatadas. Para fidelidade precisamos dos arquivos originais de: foto do hero, telas do app (carrossel), tela do cadastro, foto do produto/uso do suporte, fotos das dicas de gravação, mockups de celulares, robô.
- [ ] **Carrossel do app**: o design indica 5 passos, mas só o texto do passo 1 está visível.
- [ ] **Carrossel de dicas**: 4 indicadores, mas só o item 1 ("Enquadramento correto") está legível; os itens 2–4 aparecem cortados.
- [ ] **Vídeo tutorial** do hero (`url_tutorial` / arquivo).
- [ ] **Todos os links** (`url_hub_cadastro`, `url_hub_pedido_suporte`, Shopee, Amazon, Mercado Livre, site próprio, App Store, Google Play). Começam vazios.
- [ ] **Fonte** exata usada nas artes (parece uma sans geométrica, tipo Plus Jakarta Sans / Manrope).

## Divergências para confirmar com o cliente

- **"Minut" / "Minute"** aparecem nas artes; o Guia manda escrever sempre **MINUTE** → vamos padronizar.
- Seção 7: "na altura da **festa**" — provável erro de digitação de "**testa**". O Guia proíbe corrigir copy sem autorização.
- Seção 7: a arte mostra **3** linhas "Cole o link aqui"; o Guia pede **4** lojas (Shopee, Amazon, Mercado Livre, site próprio).
- Seção 2: o passo 4 se chama "Análise e **pagamento**" na arte e "Análise e **pagamentos**" no Guia.
- Botões de App Store / Google Play são citados no Guia, mas não aparecem nas artes — só exibir se o cliente pedir.

## Proposta técnica

| Necessidade do Guia | Solução |
|---|---|
| Landing page com 9 seções, âncoras, responsiva | Next.js (App Router) + TypeScript + Tailwind CSS |
| Painel protegido para editar textos, links e mídias | Rota `/admin` com Supabase Auth |
| Persistência de conteúdo e validação de URLs | Supabase Postgres (tabela de configurações + itens de carrossel) |
| Upload/troca de imagens e vídeo | Supabase Storage |
| Carrosséis acessíveis com toque e teclado | Componente próprio (Embla Carousel) com `aria-label` e `prefers-reduced-motion` |
| Publicação | Vercel |

Ordem de construção sugerida: estrutura + navegação → 9 seções estáticas fiéis às artes → carrosséis
→ camada de conteúdo (Supabase) → painel `/admin` → testes do checklist da seção 18 do Guia.
