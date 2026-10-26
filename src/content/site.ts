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

export type TipItem = {
  image: Media;
  titulo: string;
  descricao: string;
  status: "correto" | "incorreto" | null;
};

export const links: Links = {
  url_hub_cadastro: "",
  url_hub_pedido_suporte: "",
  url_compra_online: "",
  url_hub_celulares: "",
  url_compra_shopee: "",
  url_compra_amazon: "",
  url_compra_mercado_livre: "",
  url_compra_site_proprio: "",
  url_app_store_minute: "",
  url_google_play_minute: "",
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
  tituloBranco: "Faça seu trabalho",
  tituloVerde: "render ainda mais.",
  texto:
    "Aprenda a se cadastrar, configurar o MINUTE e gravar tarefas do dia a dia com mais segurança.",
  botaoPrincipal: "Ver passo a passo",
  botaoTutorial: "Assistir ao tutorial",
  hero_video_or_image: {
    src: "/media/hero-tela-tarefas.jpg",
    alt: "Tela de tarefas do app MINUTE (será trocada pelo vídeo tutorial)",
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
    campoValor: "[SEU CÓDIGO AQUI]",
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
    titulo: "Baixe a MINUTE e cadastre usando exatamente o mesmo e-mail informado pela Hub.",
    texto: "Depois, adicione os códigos da organização mostrados pela plataforma.",
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
  // app_minute_carousel_images[] + app_minute_carousel_texts[]
  // A referência indica 5 passos; só o passo 1 está legível. Os demais ficam pendentes.
  carrossel: [
    {
      image: { src: "/media/app-tela-tarefas.jpg", alt: "Tela de tarefas do app MINUTE" },
      titulo: "Baixe o app",
      texto:
        "Após o cadastro, baixe o aplicativo MINUTE na loja de apps do seu celular e faça o login com os mesmos dados cadastrados.",
      destaque:
        "O app é sua central de trabalho. É por lá que você faz as gravações e acompanha seu desempenho.",
    },
    { image: { src: "", alt: "" }, titulo: "", texto: "", destaque: "" },
    { image: { src: "", alt: "" }, titulo: "", texto: "", destaque: "" },
    { image: { src: "", alt: "" }, titulo: "", texto: "", destaque: "" },
    { image: { src: "", alt: "" }, titulo: "", texto: "", destaque: "" },
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
    texto: "Solicite o seu suporte de cabeça diretamente pelo site da Hub.",
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
  texto: "Confira orientações simples para gravar seus vídeos com mais qualidade e segurança.",
  passeParaOLado: ["Passe para", "o lado"],
  // gravacao_carousel_items[] — a referência tem 4 indicadores; só o item 1 está legível.
  itens: [
    {
      image: { src: "/media/dica-1.jpg", alt: "Pessoa com suporte de cabeça gravando a pia da cozinha" },
      titulo: "Enquadramento correto",
      descricao: "Mantenha o foco na tarefa, com boa iluminação e o celular bem firme.",
      // A imagem recortada da referência já traz o selo ✓; trocando a imagem, use "correto".
      status: null,
    },
    { image: { src: "", alt: "" }, titulo: "", descricao: "", status: "incorreto" },
    { image: { src: "", alt: "" }, titulo: "", descricao: "", status: null },
    { image: { src: "", alt: "" }, titulo: "", descricao: "", status: null },
  ] as TipItem[],
};

// Versão minimalista, com a mesma informação do site da Hub.
export const celulares = {
  tituloBranco: "Quais celulares",
  tituloVerde: "funcionam?",
  texto: "Modelos compatíveis:",
  iphone: {
    titulo: "iPhone",
    imagem: { src: "/media/celular-iphone.png", alt: "iPhone" } as Media,
    modelos: ["iPhone 12 ou mais novo"],
  },
  android: {
    titulo: "Android",
    imagem: { src: "/media/celular-android.png", alt: "Celular Android" } as Media,
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
};

export type SiteContent = typeof defaultContent;
