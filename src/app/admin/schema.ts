// Descrição dos campos do painel: cada grupo corresponde a uma área do site.
// Caminhos usam ponto ("hero.foto", "dicas.itens") sobre o objeto SiteContent.

export type Field =
  | { kind: "text" | "textarea" | "url"; path: string; label: string; hint?: string }
  | { kind: "lines"; path: string; label: string; hint?: string } // string[] — um item por linha
  | { kind: "media"; path: string; label: string; hint?: string; video?: boolean } // { src, alt, type? }
  | { kind: "select"; path: string; label: string; options: { value: string; label: string }[] }
  | {
      kind: "list";
      path: string;
      label: string;
      itemLabel: string;
      fields: Field[];
      // Listas fixas (ex.: os 4 passos) só editam; listas livres permitem adicionar/remover/ordenar.
      fixed?: boolean;
      newItem?: unknown;
    };

export type Group = { id: string; title: string; fields: Field[] };

const t = (path: string, label: string, hint?: string): Field => ({ kind: "text", path, label, hint });
const ta = (path: string, label: string, hint?: string): Field => ({ kind: "textarea", path, label, hint });
const media = (path: string, label: string, video = false): Field => ({ kind: "media", path, label, video });
const titulo = (sec: string): Field[] => [
  t(`${sec}.selo`, "Selo (acima do título)"),
  t(`${sec}.tituloBranco`, "Título — parte branca"),
  t(`${sec}.tituloVerde`, "Título — parte verde"),
];

export const linkFields: { key: string; label: string }[] = [
  { key: "url_hub_cadastro", label: "Cadastro na Hub (com o seu código)" },
  { key: "url_hub_pedido_suporte", label: "Suporte — botão “Pelo site da Hub”" },
  { key: "url_compra_online", label: "Suporte — botão “Compre online”" },
  { key: "url_hub_celulares", label: "Celulares — botão “Verificar no site da Hub”" },
  { key: "url_tutorial", label: "Vídeo tutorial (YouTube, Vimeo ou arquivo .mp4)" },
  { key: "url_app_store_minute", label: "App MINUTE — botão “App Store” (iPhone)" },
  { key: "url_google_play_minute", label: "App MINUTE — botão “Google Play” (Android)" },
  { key: "url_suporte_contato", label: "Contato / suporte" },
];

export const groups: Group[] = [
  {
    id: "links",
    title: "Links",
    fields: linkFields.map((l) => ({ kind: "url", path: `links.${l.key}`, label: l.label, hint: l.key })),
  },
  {
    id: "geral",
    title: "Identidade do guia",
    fields: [
      t("guia.nome", "Nome do guia (no topo do site)"),
      t("guia.selo", "Selo abaixo do nome"),
      ta("guia.rodape", "Texto do rodapé (aviso de guia independente)"),
    ],
  },
  {
    id: "nav",
    title: "Menu superior",
    fields: [
      { kind: "list", path: "nav", label: "Itens do menu", itemLabel: "Item", fixed: true, fields: [t("label", "Rótulo")] },
    ],
  },
  {
    id: "inicio",
    title: "1 · Início",
    fields: [
      t("hero.tituloBranco", "Título — parte branca"),
      t("hero.tituloVerde", "Título — parte verde"),
      ta("hero.texto", "Texto"),
      t("hero.botaoPrincipal", "Botão principal"),
      t("hero.botaoTutorial", "Botão do tutorial"),
      media("hero.hero_video_or_image", "Dentro do celular: vídeo tutorial (ou imagem)", true),
      media("hero.foto", "Colagem de fotos à direita"),
    ],
  },
  {
    id: "como-funciona",
    title: "2 · Como funciona",
    fields: [
      t("comoFunciona.titulo", "Título"),
      t("comoFunciona.subtitulo", "Subtítulo"),
      {
        kind: "list",
        path: "comoFunciona.passos",
        label: "Passos",
        itemLabel: "Passo",
        fixed: true,
        fields: [t("titulo", "Título"), ta("texto", "Texto")],
      },
      t("comoFunciona.bloco.tituloForte", "Bloco final — parte em negrito"),
      t("comoFunciona.bloco.titulo", "Bloco final — resto do título"),
      ta("comoFunciona.bloco.texto", "Bloco final — texto"),
    ],
  },
  {
    id: "cadastro",
    title: "3 · Cadastro",
    fields: [
      t("cadastro.tituloBranco", "Título — parte branca"),
      t("cadastro.tituloVerde", "Título — parte verde"),
      ta("cadastro.subtitulo", "Subtítulo"),
      t("cadastro.passo1.titulo", "Passo 1 — título"),
      ta("cadastro.passo1.texto", "Passo 1 — texto"),
      t("cadastro.passo1.botao", "Passo 1 — botão (destino: link “Cadastro na Hub”)"),
      t("cadastro.passo2.titulo", "Passo 2 — título"),
      ta("cadastro.passo2.texto", "Passo 2 — texto"),
      t("cadastro.passo2.campoRotulo", "Passo 2 — rótulo do campo"),
      t("cadastro.passo2.campoValor", "Passo 2 — valor do campo (seu código)"),
      ta("cadastro.passo2.alerta", "Passo 2 — aviso para usar o código"),
      t("cadastro.passo3.titulo", "Passo 3 — título"),
      ta("cadastro.passo3.texto", "Passo 3 — texto"),
      t("cadastro.passo4.titulo", "Passo 4 — título"),
      ta("cadastro.passo4.texto", "Passo 4 — texto"),
      t("cadastro.passo5.titulo", "Passo 5 — título"),
      ta("cadastro.passo5.texto", "Passo 5 — texto"),
      ta("cadastro.aviso", "Aviso"),
      media("cadastro.cadastro_phone_image", "Imagem dentro do celular"),
    ],
  },
  {
    id: "app",
    title: "4 · App MINUTE",
    fields: [
      ...titulo("appMinute"),
      ta("appMinute.texto", "Texto"),
      t("appMinute.slogan", "Slogan"),
      t("appMinute.appStore.chamada", "Botão App Store — texto pequeno"),
      t("appMinute.appStore.nome", "Botão App Store — texto grande"),
      t("appMinute.googlePlay.chamada", "Botão Google Play — texto pequeno"),
      t("appMinute.googlePlay.nome", "Botão Google Play — texto grande"),
      ta("appMinute.aviso", "Aviso abaixo dos botões"),
      {
        kind: "list",
        path: "appMinute.carrossel",
        label: "Carrossel do celular",
        itemLabel: "Tela",
        newItem: { image: { src: "", alt: "" }, titulo: "", texto: "", destaque: "" },
        fields: [
          media("image", "Imagem"),
          t("titulo", "Título"),
          ta("texto", "Texto explicativo"),
          ta("destaque", "Texto do cartão em destaque (opcional)"),
        ],
      },
    ],
  },
  {
    id: "pagamentos",
    title: "5 · Pagamentos",
    fields: [
      ...titulo("pagamentos"),
      ta("pagamentos.texto", "Texto"),
      t("pagamentos.carteira.rotulo", "Carteira — rótulo"),
      t("pagamentos.carteira.valor", "Carteira — valor ilustrativo"),
      t("pagamentos.carteira.botao", "Carteira — botão ilustrativo"),
      t("pagamentos.carteira.nota", "Carteira — aviso de valor fictício"),
      t("pagamentos.comoFuncionaTitulo", "Título “Como funciona?”"),
      {
        kind: "list",
        path: "pagamentos.etapas",
        label: "Etapas",
        itemLabel: "Etapa",
        fixed: true,
        fields: [t("titulo", "Título"), ta("texto", "Texto")],
      },
      t("pagamentos.alertaPix.titulo", "Alerta Pix — título"),
      ta("pagamentos.alertaPix.texto", "Alerta Pix — texto"),
      ta("pagamentos.alertaPix.lateral", "Alerta Pix — texto lateral"),
      {
        kind: "list",
        path: "pagamentos.infos",
        label: "Blocos informativos",
        itemLabel: "Bloco",
        fixed: true,
        fields: [t("titulo", "Título"), ta("texto", "Texto")],
      },
    ],
  },
  {
    id: "suporte",
    title: "6 · Suporte",
    fields: [
      ...titulo("suporte"),
      ta("suporte.texto", "Texto"),
      media("suporte.suporte_product_image", "Imagem do produto"),
      t("suporte.legendaProduto", "Legenda do produto"),
      media("suporte.suporte_usage_image", "Foto do suporte em uso"),
      t("suporte.comoConseguirTitulo", "Título “Como conseguir”"),
      t("suporte.hub.titulo", "Opção Hub — título (destino: aba Links)"),
      t("suporte.hub.tag", "Opção Hub — etiqueta"),
      ta("suporte.hub.texto", "Opção Hub — texto"),
      t("suporte.online.titulo", "Opção online — título (destino: aba Links)"),
      t("suporte.online.tag", "Opção online — etiqueta"),
      ta("suporte.online.texto", "Opção online — texto"),
      t("suporte.dica.rotulo", "Faixa de dica — etiqueta"),
      ta("suporte.dica.texto", "Faixa de dica — texto", "Use **palavra** para destacar em verde; Enter quebra a linha."),
    ],
  },
  {
    id: "dicas",
    title: "7 · Dicas de gravação",
    fields: [
      t("dicas.tituloBranco", "Título — parte branca"),
      t("dicas.tituloVerde", "Título — parte verde"),
      ta("dicas.texto", "Texto"),
      t("dicas.passeParaOLado.0", "Dica de navegação — linha 1"),
      t("dicas.passeParaOLado.1", "Dica de navegação — linha 2 (verde)"),
      {
        kind: "list",
        path: "dicas.itens",
        label: "Carrossel de dicas",
        itemLabel: "Dica",
        newItem: { image: { src: "", alt: "" }, titulo: "", descricao: "", status: null },
        fields: [
          media("image", "Imagem"),
          t("titulo", "Título"),
          ta("descricao", "Descrição"),
          {
            kind: "select",
            path: "status",
            label: "Selo",
            options: [
              { value: "", label: "Sem selo" },
              { value: "correto", label: "✓ Correto" },
              { value: "incorreto", label: "✗ Incorreto" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "celulares",
    title: "8 · Celulares compatíveis",
    fields: [
      t("celulares.tituloBranco", "Título — parte branca"),
      t("celulares.tituloVerde", "Título — parte verde"),
      t("celulares.texto", "Subtítulo"),
      t("celulares.iphone.titulo", "iPhone — título"),
      t("celulares.iphone.etiqueta", "iPhone — etiqueta da pílula"),
      { kind: "lines", path: "celulares.iphone.modelos", label: "iPhone — modelos", hint: "Um item por linha" },
      t("celulares.android.titulo", "Android — título"),
      t("celulares.android.etiqueta", "Android — etiqueta da pílula"),
      { kind: "lines", path: "celulares.android.modelos", label: "Android — modelos", hint: "Um item por linha" },
      ta("celulares.verificar.texto", "Texto final"),
      t("celulares.verificar.botao", "Botão (destino: aba Links)"),
    ],
  },
  {
    id: "proposito",
    title: "9 · Propósito",
    fields: [
      t("proposito.tituloBranco", "Título — parte branca"),
      t("proposito.tituloVerde", "Título — parte verde"),
      ta("proposito.texto", "Texto"),
      media("proposito.proposito_hero_image", "Imagem principal"),
      t("proposito.comoFuncionaTitulo", "Título “Como funciona?”"),
      {
        kind: "list",
        path: "proposito.etapas",
        label: "Etapas",
        itemLabel: "Etapa",
        fixed: true,
        fields: [t("titulo", "Título"), ta("texto", "Texto")],
      },
      t("proposito.fechamento.titulo", "Bloco final — título"),
      ta("proposito.fechamento.texto", "Bloco final — texto"),
    ],
  },
  {
    id: "duvidas",
    title: "10 · Dúvidas",
    fields: [
      t("duvidas.email", "E-mail do suporte (recebe as dúvidas)", "Ex.: suporte@seudominio.com.br — enquanto vazio, o botão fica sem ação"),
      t("duvidas.selo", "Selo (acima do título)"),
      t("duvidas.tituloBranco", "Título — parte branca"),
      t("duvidas.tituloVerde", "Título — parte verde"),
      ta("duvidas.texto", "Texto"),
      t("duvidas.botao", "Texto do botão"),
      t("duvidas.assunto", "Assunto do e-mail"),
      {
        kind: "list",
        path: "duvidas.passos",
        label: "Passos",
        itemLabel: "Passo",
        fixed: true,
        fields: [t("titulo", "Título"), ta("texto", "Texto")],
      },
      t("duvidas.prazo", "Selo de prazo"),
    ],
  },
];
