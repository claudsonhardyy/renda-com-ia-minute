import type { SiteContent } from "@/content/site";
import { HeroPlaylist, HeroVideoButton, HeroVideoProvider } from "../HeroVideo";
import { Icon } from "../Icon";
import { PhoneFrame, Section } from "../ui";

// Recortes da colagem para o fundo do celular no mobile (cozinheira, barbeiro, cabeleireira,
// pedreiro): o celular cobre o lado de dentro de cada recorte, deixando o rosto, o suporte na
// cabeça e o que cada um está fazendo à mostra nas laterais.
const COLAGEM_MOBILE = [
  { src: "/media/hero-m-1.jpg", pos: "top-0 left-0 object-left", mask: "[mask-image:linear-gradient(to_right,black_72%,transparent),linear-gradient(to_bottom,transparent,black_8%,black_86%,transparent)]" },
  { src: "/media/hero-m-2.jpg", pos: "top-0 right-0 object-right", mask: "[mask-image:linear-gradient(to_left,black_72%,transparent),linear-gradient(to_bottom,transparent,black_8%,black_86%,transparent)]" },
  { src: "/media/hero-m-3.jpg", pos: "bottom-0 left-0 object-left", mask: "[mask-image:linear-gradient(to_right,black_72%,transparent),linear-gradient(to_bottom,transparent,black_14%,black_92%,transparent)]" },
  { src: "/media/hero-m-4.jpg", pos: "bottom-0 right-0 object-right", mask: "[mask-image:linear-gradient(to_left,black_72%,transparent),linear-gradient(to_bottom,transparent,black_14%,black_92%,transparent)]" },
];

// Modelo do cliente (docs/referencias/v2/1.webp): título e botões à esquerda, celular no centro
// (a tela toca os vídeos do guia; o botão ao lado pausa/retoma) e a colagem de fotos ocupando a
// lateral direita, esfumada.
// No celular a página inteira cabe na tela: título → texto → celular com o vídeo (com a colagem
// esfumada atrás, nas laterais) → botão "Ver passo a passo". Pausar/som ficam na barra do vídeo.
export function Inicio({ c }: { c: SiteContent }) {
  const { hero } = c;
  return (
    <Section id="inicio" className="overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.foto.src}
        alt={hero.foto.alt}
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[55%] object-cover object-left lg:block [mask-image:linear-gradient(to_right,transparent,black_14%),linear-gradient(to_bottom,black_82%,transparent)] [mask-composite:intersect]"
      />

      <HeroVideoProvider>
        <div className="relative grid items-center gap-5 max-lg:flex max-lg:h-[calc(100svh-4rem-2rem)] max-lg:flex-col max-lg:items-stretch max-lg:gap-[1.6svh] lg:grid-cols-[minmax(0,0.92fr)_auto_minmax(0,1.5fr)] lg:gap-8">
          {/* No celular este bloco "se desfaz" (contents) para cada parte ocupar sua posição na ordem */}
          <div className="max-lg:contents">
            <h1 className="hero-title !text-[clamp(2.1rem,min(6.6vh,3.6vw),4.4rem)] max-lg:order-1 max-lg:shrink-0 max-lg:!text-[clamp(1.55rem,min(7.6vw,4.3svh),2.4rem)]">
              {hero.tituloBranco} <span className="text-lime">{hero.tituloVerde}</span>
            </h1>
            <p className="page-sub max-w-sm max-lg:order-2 max-lg:shrink-0 max-lg:!text-[clamp(0.85rem,min(3.9vw,2.1svh),1rem)] max-lg:!leading-snug lg:mt-4">{hero.texto}</p>
            <div className="flex w-full max-w-xs flex-col gap-3 max-lg:order-4 max-lg:mx-auto max-lg:shrink-0 lg:mt-6">
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-lime px-6 py-3.5 text-lg font-bold text-lime-ink shadow-[0_0_28px_-6px_rgb(166_247_116/0.6)] transition hover:brightness-105 active:scale-[0.98] max-lg:py-[min(0.8rem,1.5svh)]"
              >
                {hero.botaoPrincipal}
                <Icon name="arrowRight" className="size-6" />
              </a>
              <HeroVideoButton
                labels={hero.botaoVideo}
                className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-lime px-6 py-3 text-lg font-bold text-white transition hover:bg-lime/10 max-lg:hidden"
              />
            </div>
          </div>

          {/* Celular: no mobile ocupa todo o espaço que sobra, com a colagem ao fundo */}
          <div className="relative flex justify-center max-lg:order-3 max-lg:-mx-4 max-lg:min-h-0 max-lg:flex-1 max-lg:py-1">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-80 lg:hidden">
              {COLAGEM_MOBILE.map((f) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={f.src} src={f.src} alt="" className={`absolute h-[53%] w-[31%] object-cover ${f.pos} ${f.mask} [mask-composite:intersect]`} />
              ))}
            </div>
            <PhoneFrame
              ratio="276/557"
              className="relative z-10 mx-auto h-[min(calc(100dvh-8.5rem),700px)] max-lg:h-[94%] max-lg:max-h-[min(560px,calc((100vw-2*5.5rem)*2.02))] max-lg:self-center"
            >
              <HeroPlaylist videos={hero.videos} fallback={hero.hero_video_or_image} />
            </PhoneFrame>
          </div>
        </div>
      </HeroVideoProvider>
    </Section>
  );
}
