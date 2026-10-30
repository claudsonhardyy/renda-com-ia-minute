// Conteúdo editável do site MINUTE.
// Tudo o que o Guia de Especificação Mestre marca como editável (textos, links e mídias)
// vive aqui, centralizado. O painel /admin vai gravar estes mesmos campos no banco;
// enquanto ele não existe, este arquivo é o valor inicial.
//
// Regras do Guia:
// - Links começam VAZIOS ("") até o proprietário informar — nunca usar URL fictícia.
// - Textos ilegíveis nas referências ficam vazios e marcados como pendentes.

export type Links = {
  url_hub_cadastro: string;
  url_hub_pedido_suporte: string;
  url_compra_online: string;
  url_hub_celulares: string;
  url_compra_shopee: string;
  url_compra_amazon: string;
  url_compra_mercado_livre: string;
  url_compra_site_proprio: string;
  url_app_store_minute: string;
  url_google_play_minute: string;
  url_tutorial: string;
  url_suporte_contato: string;
};

export type Media = { src: string; alt: string; type?: "image" | "video" };

export type AppCarouselItem = {
  image: Media;
  titulo: string;
  texto: string;
  destaque: string;
};

// Dica de gravação, montada no padrão do site (número, título, selos, ícones, linha e rodapé
// sempre do mesmo tamanho), com as fotos recortadas das imagens do cliente. Marcação nos textos:
// **trecho** = cor da coluna (verde ou vermelho), ++trecho++ = verde, !!trecho!! = vermelho,
// __trecho__ = branco em negrito; quebra de linha vira nova linha.
export type TipColumn = {
  tipo: "correto" | "incorreto";
  icone: string; // ícone ao lado do texto ("" = ✓ ou ✗ conforme o tipo; "-" = sem ícone)
  selo?: boolean; // false = foto sem o selo ✓/✗ no canto
  foco?: "left" | "right"; // lado da foto que fica sempre visível quando o quadro corta as bordas
  imagens: Media[]; // 1 foto; ou várias em sequência (ex.: os 5 dias da semana)
  rotulos: string[]; // legenda de cada foto da sequência (ex.: SEG, TER...)
  titulo: string;
  texto: string;
};

export type TipItem = {
  tituloBranco: string;
  tituloVerde: string;
  subtitulo: string; // linha abaixo do título (opcional)
  lateral: string; // texto à direita do título (opcional)
  layout: "colunas" | "lado" | "semana"; // fotos com texto embaixo · foto com texto ao lado · sequência
  colunas: TipColumn[];
  textoGeral: { icone: string; texto: string }; // texto que vale para as duas fotos (opcional)
  nota: { tipo: "alerta" | "evitar"; texto: string }; // rodapé
};

export const links: Links = {
  url_hub_cadastro: "https://app.hub.xyz/r/RENDER",
  url_hub_pedido_suporte: "https://app.hub.xyz/how-it-works",
  url_compra_online: "https://br.shp.ee/yURDpsu6",
  url_hub_celulares: "https://app.hub.xyz/how-it-works",
  url_compra_shopee: "",
  url_compra_amazon: "",
  url_compra_mercado_livre: "",
  url_compra_site_proprio: "",
  url_app_store_minute: "https://apps.apple.com/br/app/minute-data/id6760918280",
  url_google_play_minute: "https://play.google.com/store/apps/details?id=com.bakerdata.minute",
  url_tutorial: "",
  url_suporte_contato: "",
};

// Ordem das seções = numeração dos arquivos de referência no Drive (ver README).
export const nav: { id: string; label: string }[] = [
  { id: "inicio", label: "Início" },
  { id: "cadastro-hub", label: "Cadastro" },
  { id: "app-minute", label: "App MINUTE" },
  { id: "pagamentos", label: "Pagamentos" },
  { id: "suporte", label: "Suporte" },
  { id: "dicas-gravacao", label: "Gravação" },
  { id: "celulares-compativeis", label: "Compatibilidade" },
  { id: "proposito", label: "Propósito" },
  { id: "duvidas", label: "Dúvidas" },
];

// Identidade do guia: é um guia independente sobre a Hub e o app MINUTE, não o site de nenhum dos dois.
export const guia = {
  nome: "Hub + MINUTE",
  selo: "Guia independente",
  rodape:
    "Guia independente sobre a Hub e o aplicativo MINUTE. Este site não é o site oficial da Hub nem do MINUTE.",
};

export const hero = {
  selo: "Guia completo Hub + MINUTE",
  tituloBranco: "Transforme seu celular em uma",
  tituloVerde: "ferramenta de renda extra.",
  texto:
    "Aprenda a se cadastrar, configurar o MINUTE e gravar tarefas do dia a dia com mais segurança.",
  botaoPrincipal: "Ver passo a passo",
  // Botão ao lado do título que pausa / retoma os vídeos da tela do celular
  botaoVideo: { pausar: "Pausar vídeo", assistir: "Assistir ao vídeo" },
  // Vídeos da tela do celular (pasta “Vídeo página inicial” do Drive), tocados na ordem 1 → 2
  videos: [
    { src: "/media/hero-video-1.mp4", alt: "Vídeo 1 do guia Hub + MINUTE", type: "video" },
    { src: "/media/hero-video-2.mp4", alt: "Vídeo 2 do guia Hub + MINUTE", type: "video" },
  ] as Media[],
  // Imagem mostrada na tela do celular se não houver vídeo
  hero_video_or_image: {
    src: "/media/hero-tela-tarefas.jpg",
    alt: "Tela de tarefas do app MINUTE",
    type: "image",
  } as Media,
  foto: {
    src: "/media/hero-colagem.jpg",
    alt: "Pessoas trabalhando com o celular preso a um suporte de cabeça: na cozinha, na barbearia, no salão e na obra",
  } as Media,
};

export const comoFunciona = {
  titulo: "Como funciona?",
  subtitulo: "Siga estes passos para começar a gravar suas tarefas.",
  passos: [
    {
      icone: "user",
      titulo: "Cadastro na Hub",
      texto: "Crie sua conta e se torne parte da nossa comunidade.",
      destino: "#cadastro-hub",
    },
    {
      icone: "phone",
      titulo: "Configure o MINUTE",
      texto: "Baixe o app, faça login e ajuste as permissões do seu celular.",
      destino: "#app-minute",
    },
    {
      icone: "video",
      titulo: "Grave suas tarefas",
      texto: "Siga as instruções, grave os vídeos e envie enquanto realiza suas tarefas.",
      destino: "#dicas-gravacao",
    },
    {
      icone: "dollar",
      titulo: "Análise e pagamento",
      texto:
        "Seus vídeos são avaliados para aprovação. O pagamento é realizado conforme cada plataforma.",
      destino: "#pagamentos",
    },
  ],
  bloco: {
    tituloForte: "O MINUTE",
    titulo: "é o aplicativo de gravação.",
    texto: "Depois do envio, os vídeos seguem para análise na Hub.",
    destino: "#app-minute",
  },
};

export const cadastro = {
  selo: "Guia independente e atualizado",
  tituloBranco: "Como se",
  tituloVerde: "cadastrar",
  subtitulo: "Siga a ordem para configurar tudo sem complicação.",
  passo1: {
    titulo: "Acesse a Hub pelo link indicado",
    texto: "Clique no botão abaixo para ir para a página de cadastro da Hub.",
    botao: "Acessar a Hub",
  },
  passo2: {
    titulo: "Na tela de cadastro, localize “Código de indicação”",
    texto: "Insira o código da organização no campo indicado.",
    campoRotulo: "Código de indicação",
    campoValor: "[RENDER]",
    alerta:
      "Use exatamente este código para o cadastro ficar correto. Entrou por outro link? Digite-o neste campo.",
  },
  passo3: {
    titulo: "Preencha seus dados reais",
    texto: "Confira seu nome, e-mail e dados de pagamento antes de enviar.",
  },
  passo4: {
    titulo: "Após criar a conta, entre na área “Como funciona” > “Cadastrar a MINUTE”",
    texto: "Localize o e-mail fornecido pela Hub.",
  },
  passo5: {
    titulo: "Baixe a MINUTE e cadastre usando o login fornecido no site da Hub ou o login que a Hub te fornecer.",
    texto: "Depois, adicione os códigos das organizações informados pela Hub.",
  },
  aviso: "Não invente dados nem use e-mails diferentes entre as contas.",
  cadastro_phone_image: {
    src: "/media/cadastro-tela-hub.jpg",
    alt: "Tela “Crie uma conta” da Hub com o campo para inserir o código de indicação",
  } as Media,
};

export const appMinute = {
  selo: "App MINUTE",
  tituloBranco: "O app onde tudo",
  tituloVerde: "acontece.",
  texto:
    "A MINUTE é o aplicativo que você usa para fazer as gravações. É por lá que suas atividades são analisadas, aprovadas e enviadas para a Hub.",
  slogan: "Grave. Contribua. Ganhe.",
  // Botões de download (destinos nos links url_app_store_minute e url_google_play_minute)
  appStore: { chamada: "Baixe aqui na", nome: "App Store" },
  googlePlay: { chamada: "Baixe aqui na", nome: "Google Play" },
  aviso:
    "Os dados de login da MINUTE são fornecidos pela Hub. Confira quais são as informações que a Hub te passou para acessar o aplicativo.",
  // app_minute_carousel_images[] + app_minute_carousel_texts[] — telas e textos da pasta
  // “Carrossel página Minute” do Drive, na ordem numerada (1 a 7).
  carrossel: [
    {
      image: { src: "/media/app-passo-1.jpg", alt: "Página do app Minute Data na App Store" },
      titulo: "Baixe o app",
      texto:
        "Após o cadastro, baixe o aplicativo Minute na loja de apps do seu celular e faça o login.",
      destaque: "",
    },
    {
      image: { src: "/media/app-passo-2.jpg", alt: "Tela de login do app MINUTE com os campos de e-mail e senha" },
      titulo: "Faça login no Minute",
      texto:
        "Use o login e a senha gerados pela Hub (acesse a aba “Como funciona” para encontrá-los). Esse e-mail é obrigatório para vincular os vídeos à sua conta e garantir o envio correto.",
      destaque: "",
    },
    {
      image: { src: "/media/app-passo-3.jpg", alt: "Tela de configurações do app com o ícone do menu destacado na barra inferior" },
      titulo: "Acesse o menu",
      texto:
        "No aplicativo Minute, toque no ícone do menu (as três linhas), localizado na barra inferior da tela, para acessar as opções.",
      destaque: "",
    },
    {
      image: { src: "/media/app-passo-4.jpg", alt: "Tela de configurações com a opção Organização destacada" },
      titulo: "Escolha sua organização",
      texto:
        "Acesse a opção “Organização” para alternar entre o modo residencial e o comercial, de acordo com o tipo de atividade que deseja realizar.",
      destaque: "",
    },
    {
      image: { src: "/media/app-passo-5.jpg", alt: "Opções Hub - Residential e Hub - Commercial para trocar de organização" },
      titulo: "Selecione o tipo de organização",
      texto:
        "Escolha o Hub - Residential para tarefas domésticas ou o Hub - Commercial para tarefas profissionais. Grave sempre no ambiente correspondente, sem misturar as categorias.",
      destaque: "",
    },
    {
      image: { src: "/media/app-passo-6.jpg", alt: "Lista de tarefas disponíveis no app MINUTE" },
      titulo: "Escolha da Tarefa",
      texto:
        "Leia as instruções de cada tarefa e escolha aquela que corresponde à atividade que será gravada, garantindo que a gravação siga as especificações exigidas.",
      destaque: "",
    },
    {
      image: { src: "/media/app-passo-7.jpg", alt: "Tela de gravação do app com o botão vermelho para começar" },
      titulo: "Como Iniciar a Gravação",
      texto:
        "Posicione o celular conforme indicado, toque em Play e comece a gravar. Cada vídeo tem duração de 30 minutos, e o aplicativo avisará quando o tempo limite for atingido.",
      destaque: "",
    },
  ] as AppCarouselItem[],
};

export const pagamentos = {
  selo: "Pagamentos",
  tituloBranco: "Seu trabalho",
  tituloVerde: "vira saldo.",
  texto:
    "Depois que seus vídeos são aprovados, o valor das tarefas fica na sua carteira da Hub e você solicita o saque quando estiver disponível.",
  carteira: {
    rotulo: "Minha carteira",
    valor: "R$ 1.124,50",
    botao: "Solicitar saque",
    nota: "Valor fictício, apenas para demonstração.",
  },
  comoFuncionaTitulo: "Como funciona?",
  etapas: [
    {
      icone: "play",
      titulo: "Vídeo aprovado",
      texto: "A tarefa é analisada automaticamente e enviada para a Hub.",
    },
    {
      icone: "wallet",
      titulo: "Saldo na carteira",
      texto: "O valor correspondente às tarefas aprovadas é contabilizado no seu perfil da Hub.",
    },
    {
      icone: "pix",
      titulo: "Solicite o saque",
      texto:
        "Nos dias disponíveis, você solicita o saque pela própria plataforma da Hub. O valor cai na sua conta via Pix.",
    },
  ],
  alertaPix: {
    titulo: "Atenção à chave Pix!",
    texto:
      "Cadastre a chave Pix correta no seu perfil da Hub. É por ela que o dinheiro será enviado para a sua conta.",
    lateral: "Use sempre seus dados cadastrados na plataforma para evitar erros e atrasos.",
  },
  infos: [
    {
      icone: "wallet",
      titulo: "Saldo na carteira da Hub",
      texto: "O valor fica seguro na sua carteira do perfil, até você solicitar o saque.",
    },
    {
      icone: "calendar",
      titulo: "Dias de saque",
      texto:
        "Os saques só podem ser solicitados nos dias disponibilizados pela Hub. Confira o calendário na plataforma.",
    },
  ],
};

export const suporte = {
  selo: "Suporte de cabeça",
  tituloBranco: "O suporte que",
  tituloVerde: "mantém seu celular no lugar certo.",
  // "festa" está assim na referência (provável "testa"); aguardando confirmação do cliente.
  texto:
    "Com ele, o celular fica preso à sua cabeça, na altura da festa, com a câmera virada para baixo, captando o que suas mãos estão fazendo.",
  suporte_product_image: {
    src: "/media/suporte-produto-45.jpg",
    alt: "Suporte de cabeça com celular encaixado e detalhe do ângulo de 45°",
  } as Media,
  legendaProduto: "Suporte de cabeça (modelo ilustrativo)",
  suporte_usage_image: {
    src: "/media/suporte-sequencia.jpg",
    alt: "Sequência de fotos mostrando como prender o suporte na cabeça e o ângulo de 45° da câmera",
  } as Media,
  comoConseguirTitulo: "Como conseguir o suporte?",
  hub: {
    titulo: "Pelo site da Hub",
    tag: "Gratuito",
    texto: "Solicite o seu suporte de cabeça gratuitamente pelo site da Hub.",
  },
  online: {
    titulo: "Compre online",
    tag: "Mais rápido",
    texto: "Garanta o seu suporte agora e comece o quanto antes.",
  },
  // **texto** aparece em verde e negrito; quebra de linha vira nova linha
  dica: {
    rotulo: "Dica",
    texto:
      "Pelo site da Hub ele é **gratuito**, mas pode demorar.\nSe quiser começar antes, a compra online é a melhor opção.",
  },
};

export const dicas = {
  selo: "Guia Independente",
  tituloBranco: "Dicas de",
  tituloVerde: "gravação.",
  texto:
    "Confira orientações simples para gravar seus vídeos com mais qualidade e segurança e evitar que seus vídeos sejam rejeitados.",
  // gravacao_carousel_items[] — conteúdo da pasta “Carrossel da página dicas de gravação atualizada”
  // do Drive, na ordem numerada; as fotos foram recortadas das imagens originais.
  itens: [
    {
      tituloBranco: "Posicionamento e",
      tituloVerde: "enquadramento",
      subtitulo: "",
      lateral: "",
      layout: "colunas",
      colunas: [
        {
          tipo: "correto",
          icone: "angle45",
          imagens: [{ src: "/media/dica-1-1.jpg", alt: "Pessoa com o celular preso na cabeça, inclinado em 45°, cortando um tomate" }],
          rotulos: [],
          titulo: "Incline o celular em 45°",
          texto: "Mantenha o celular na cabeça, com a câmera virada para frente e levemente para baixo.",
        },
        {
          tipo: "correto",
          icone: "frame",
          selo: false,
          foco: "left",
          imagens: [{ src: "/media/dica-1-2.jpg", alt: "Visão da câmera gravando: mãos cortando um tomate, bem enquadradas" }],
          rotulos: [],
          titulo: "Enquadre as mãos e a atividade",
          texto: "O foco deve ser nas suas mãos e no que está sendo feito.",
        },
      ],
      textoGeral: { icone: "", texto: "" },
      nota: { tipo: "evitar", texto: "__Evite filmar:__ não grave o teto, as paredes ou os pés." },
    },
    {
      tituloBranco: "Mantenha as",
      tituloVerde: "mãos visíveis",
      subtitulo: "",
      lateral: "",
      layout: "colunas",
      colunas: [
        {
          tipo: "correto",
          icone: "",
          imagens: [{ src: "/media/dica-2-1.jpg", alt: "Duas mãos visíveis cortando pepino na tábua" }],
          rotulos: [],
          titulo: "",
          texto: "",
        },
        {
          tipo: "correto",
          icone: "",
          imagens: [{ src: "/media/dica-2-2.jpg", alt: "Duas mãos visíveis lavando um prato na pia" }],
          rotulos: [],
          titulo: "",
          texto: "",
        },
      ],
      textoGeral: { icone: "hands", texto: "__As duas mãos devem permanecer no enquadramento durante__ ++toda a gravação.++" },
      nota: { tipo: "alerta", texto: "Evite deixar a imagem sem mostrar ++nenhuma das mãos.++" },
    },
    {
      tituloBranco: "Execute a tarefa",
      tituloVerde: "corretamente",
      subtitulo: "Exemplo: a tarefa selecionada foi lavar louça.",
      lateral: "",
      layout: "colunas",
      colunas: [
        {
          tipo: "correto",
          icone: "",
          imagens: [{ src: "/media/dica-3-1.jpg", alt: "Gravação correta: mãos lavando louça na pia" }],
          rotulos: [],
          titulo: "",
          texto: "__Selecionada:__ ++lavar louça.++\n__Gravada:__ ++lavar louça.++",
        },
        {
          tipo: "incorreto",
          icone: "",
          imagens: [{ src: "/media/dica-3-2.jpg", alt: "Gravação incorreta: mãos mexendo uma panela no fogão" }],
          rotulos: [],
          titulo: "",
          texto: "__Selecionada:__ ++lavar louça.++\n__Gravada:__ !!cozinhar.!!",
        },
      ],
      textoGeral: { icone: "", texto: "" },
      nota: { tipo: "alerta", texto: "Grave exatamente a atividade escolhida no aplicativo. Tarefas diferentes podem levar à rejeição do vídeo." },
    },
    {
      tituloBranco: "Movimentos naturais e",
      tituloVerde: "contínuos",
      subtitulo: "",
      lateral: "",
      layout: "colunas",
      colunas: [
        {
          tipo: "correto",
          icone: "",
          imagens: [{ src: "/media/dica-4-1.jpg", alt: "Pessoa pintando a parede com rolo em ritmo natural" }],
          rotulos: [],
          titulo: "Execute as ações em **ritmo natural.**",
          texto: "Mantenha um fluxo contínuo na atividade, sem movimentos muito lentos ou muito rápidos.",
        },
        {
          tipo: "incorreto",
          icone: "",
          imagens: [{ src: "/media/dica-4-2.jpg", alt: "Pessoa parada com o rolo de pintura, com símbolo de pausa" }],
          rotulos: [],
          titulo: "Evite **pausas prolongadas.**",
          texto: "Não pare a atividade por muito tempo e não faça movimentos bruscos ou acelerados.",
        },
      ],
      textoGeral: { icone: "", texto: "" },
      nota: { tipo: "alerta", texto: "Movimentos naturais e contínuos ajudam a garantir um ++vídeo claro, real e útil++ para o treinamento da IA." },
    },
    {
      tituloBranco: "Evite",
      tituloVerde: "movimentar o celular",
      subtitulo: "",
      lateral: "",
      layout: "colunas",
      colunas: [
        {
          tipo: "correto",
          icone: "",
          imagens: [{ src: "/media/dica-5-1.jpg", alt: "Homem furando a parede com o celular estável, imagem nítida" }],
          rotulos: [],
          titulo: "Mantenha o celular **estável** durante a gravação.",
          texto: "Isso garante um vídeo claro, nítido e de boa qualidade.",
        },
        {
          tipo: "incorreto",
          icone: "",
          imagens: [{ src: "/media/dica-5-2.jpg", alt: "Imagem tremida e borrada por movimento brusco do celular" }],
          rotulos: [],
          titulo: "Não mova **o celular.**",
          texto: "Movimentos bruscos deixam a imagem tremida e fora de foco.",
        },
      ],
      textoGeral: { icone: "", texto: "" },
      nota: { tipo: "alerta", texto: "Mantenha o celular estável para garantir um vídeo claro, nítido e de boa qualidade para o treinamento da IA." },
    },
    {
      tituloBranco: "Preserve a",
      tituloVerde: "privacidade",
      subtitulo: "",
      lateral: "Evite expor informações pessoais e mantenha o foco na atividade e nos seus preparos.",
      layout: "lado",
      colunas: [
        {
          tipo: "correto",
          icone: "-",
          imagens: [{ src: "/media/dica-6-1.jpg", alt: "Mãos cortando pepino, sem rostos, documentos ou telas na imagem" }],
          rotulos: [],
          titulo: "Evite filmar apenas\n**partes sensíveis.**",
          texto: "Mantenha o foco na atividade e nas suas mãos, sem mostrar rostos, documentos ou telas.",
        },
        {
          tipo: "incorreto",
          icone: "-",
          imagens: [{ src: "/media/dica-6-2.jpg", alt: "Sala com criança e televisão ao fundo, com ícones de proibido para rosto, documento, tela e celular" }],
          rotulos: [],
          titulo: "Não exponha\n**informações pessoais.**",
          texto: "Evite filmar rostos (principalmente de crianças), documentos, dados confidenciais, televisões ou outras telas.",
        },
      ],
      textoGeral: { icone: "", texto: "" },
      nota: { tipo: "alerta", texto: "Sua privacidade e a de outras pessoas são muito importantes." },
    },
    {
      tituloBranco: "Varie as",
      tituloVerde: "tarefas e os ambientes",
      subtitulo: "",
      lateral: "",
      layout: "semana",
      colunas: [
        {
          tipo: "incorreto",
          icone: "",
          imagens: [{ src: "/media/dica-7-1.jpg", alt: "Lavando louça na mesma pia — segunda" }, { src: "/media/dica-7-2.jpg", alt: "Lavando louça na mesma pia — terça" }, { src: "/media/dica-7-3.jpg", alt: "Lavando louça na mesma pia — quarta" }, { src: "/media/dica-7-4.jpg", alt: "Lavando louça na mesma pia — quinta" }, { src: "/media/dica-7-5.jpg", alt: "Lavando louça na mesma pia — sexta" }],
          rotulos: ["SEG", "TER", "QUA", "QUI", "SEX"],
          titulo: "Mesma tarefa, mesmo lugar, mesmo jeito = **repetição.**",
          texto: "",
        },
        {
          tipo: "correto",
          icone: "",
          imagens: [{ src: "/media/dica-7-6.jpg", alt: "Arrumando a cama — segunda" }, { src: "/media/dica-7-7.jpg", alt: "Regando plantas — terça" }, { src: "/media/dica-7-8.jpg", alt: "Passando pano no chão — quarta" }, { src: "/media/dica-7-9.jpg", alt: "Limpando a mesa — quinta" }, { src: "/media/dica-7-10.jpg", alt: "Dando banho no cachorro — sexta" }],
          rotulos: ["SEG", "TER", "QUA", "QUI", "SEX"],
          titulo: "Alterne **atividades**, **ambientes** e formas de **execução.**",
          texto: "",
        },
      ],
      textoGeral: { icone: "", texto: "" },
      nota: { tipo: "alerta", texto: "Na parte comercial, pode ser a mesma tarefa, mas com ++objetos, técnicas++ e ++abordagens diferentes.++" },
    },
    {
      tituloBranco: "Garanta uma",
      tituloVerde: "boa iluminação",
      subtitulo: "",
      lateral: "",
      layout: "lado",
      colunas: [
        {
          tipo: "correto",
          icone: "lightbulb",
          imagens: [{ src: "/media/dica-8-1.jpg", alt: "Banho em cachorro em ambiente bem iluminado" }],
          rotulos: [],
          titulo: "Faça **assim.**",
          texto: "Grave em locais ++bem iluminados,++ de preferência durante o dia. Assim, o vídeo fica claro, nítido e com boa qualidade.",
        },
        {
          tipo: "incorreto",
          icone: "lightbulb",
          imagens: [{ src: "/media/dica-8-2.jpg", alt: "A mesma cena em ambiente escuro, com pouca luz" }],
          rotulos: [],
          titulo: "Evite **assim.**",
          texto: "Evite ambientes !!escuros, sombras e pouca luz.!! Isso pode comprometer a qualidade do vídeo e levar à rejeição.",
        },
      ],
      textoGeral: { icone: "", texto: "" },
      nota: { tipo: "alerta", texto: "++Dica:++ grave de dia e mantenha o ambiente ++bem iluminado.++" },
    },
  ] as TipItem[],
};

// Versão minimalista, com a mesma informação do site da Hub.
export const celulares = {
  tituloBranco: "Quais celulares",
  tituloVerde: "funcionam?",
  texto: "Modelos compatíveis:",
  iphone: {
    titulo: "iPhone",
    etiqueta: "Compatíveis",
    imagem: { src: "/media/celular-iphone-hd.png", alt: "iPhone" } as Media,
    modelos: ["iPhone 12 ou mais novo"],
  },
  android: {
    titulo: "Android",
    etiqueta: "Compatíveis",
    imagem: { src: "/media/celular-android-hd.png", alt: "Celular Android" } as Media,
    modelos: ["Pixel 6 ou mais novo", "Galaxy S21 ou mais novo (exceto modelos FE)"],
  },
  verificar: {
    texto: "Você pode também verificar se o seu aparelho está disponível pelo site da Hub.",
    botao: "Verificar no site da Hub",
  },
};

export const proposito = {
  selo: "Guia Independente",
  tituloBranco: "Entenda o",
  tituloVerde: "propósito.",
  texto: "Você grava tarefas reais, e essas gravações ajudam a treinar a inteligência artificial.",
  proposito_hero_image: {
    src: "/media/proposito-robo.jpg",
    alt: "Robô humanoide com um celular preso a um suporte de cabeça",
  } as Media,
  comoFuncionaTitulo: "Como funciona?",
  etapas: [
    { icone: "phone", titulo: "1. Você grava", texto: "Tarefas do dia a dia, na sua rotina." },
    { icone: "brain", titulo: "2. A IA aprende", texto: "Com esses dados reais." },
    { icone: "bot", titulo: "3. O futuro avança", texto: "Robôs podem contribuir com as pessoas." },
  ],
  fechamento: {
    titulo: "Você faz parte disso!",
    texto: "Cada gravação é um passo para uma IA mais humana, segura e preparada para o futuro.",
  },
};

// Página de dúvidas: o botão abre o e-mail do suporte com nome e dúvida já no corpo da mensagem.
export const duvidas = {
  selo: "Suporte",
  tituloBranco: "Ficou com alguma",
  tituloVerde: "dúvida?",
  texto:
    "Fale com o nosso suporte por e-mail. Conte quem você é e qual é a sua dúvida: respondemos em até 24 horas e ajudamos no que estiver ao nosso alcance.",
  // E-mail que recebe as dúvidas (vazio até o proprietário criar o endereço)
  email: "duvidasrendacomia@gmail.com",
  botao: "Enviar minha dúvida por e-mail",
  assunto: "Dúvidas Renda com IA",
  // Cartão ao lado do botão: o que a pessoa deve escrever no e-mail
  cartaoTitulo: "No seu e-mail, informe:",
  passos: [
    { icone: "user", titulo: "Seu nome", texto: "Para sabermos com quem estamos falando." },
    { icone: "message", titulo: "Sua dúvida bem explicada", texto: "Conte o que aconteceu e em qual etapa você está." },
    { icone: "image", titulo: "Prints da tela (opcional)", texto: "Se quiser, anexe prints para mostrar o que está vendo." },
  ],
  prazo: "Resposta em até 24 horas",
};

export const defaultContent = {
  guia,
  links,
  nav,
  hero,
  comoFunciona,
  cadastro,
  appMinute,
  pagamentos,
  suporte,
  dicas,
  celulares,
  proposito,
  duvidas,
};

export type SiteContent = typeof defaultContent;
