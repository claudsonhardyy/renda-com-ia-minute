import type { SiteContent } from "@/content/site";
import { HeroPlaylist, HeroVideoButton, HeroVideoProvider } from "../HeroVideo";
import { Icon } from "../Icon";
import { PhoneFrame, Section } from "../ui";

// Modelo do cliente (docs/referencias/v2/1.webp): título e botões à esquerda, celular no centro
// (a tela toca os vídeos do guia; o botão ao lado pausa/retoma) e a colagem de fotos ocupando a
// lateral direita, esfumada.
// No celular a ordem muda para ficar natural de ler: título → texto → celular com o vídeo →
// botões (logo abaixo do vídeo que eles controlam) → colagem de fotos.
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
        <div className="relative grid items-center gap-5 lg:grid-cols-[minmax(0,0.92fr)_auto_minmax(0,1.5fr)] lg:gap-8">
          {/* No celular este bloco "se desfaz" (contents) para cada parte ocupar sua posição na ordem */}
          <div className="max-lg:contents">
            <h1 className="hero-title !text-[clamp(2.1rem,min(6.6vh,3.6vw),4.4rem)] max-lg:order-1 max-lg:!text-[clamp(1.9rem,8.4vw,2.6rem)]">
              {hero.tituloBranco} <span className="text-lime">{hero.tituloVerde}</span>
            </h1>
            <p className="page-sub max-w-sm max-lg:order-2 lg:mt-4">{hero.texto}</p>
            <div className="flex w-full max-w-xs flex-col gap-3 max-lg:order-4 max-lg:mx-auto lg:mt-6">
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-lime px-6 py-3.5 text-lg font-bold text-lime-ink shadow-[0_0_28px_-6px_rgb(166_247_116/0.6)] transition hover:brightness-105 active:scale-[0.98]"
              >
                {hero.botaoPrincipal}
                <Icon name="arrowRight" className="size-6" />
              </a>
              <HeroVideoButton
                labels={hero.botaoVideo}
                className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-lime px-6 py-3 text-lg font-bold text-white transition hover:bg-lime/10"
              />
            </div>
          </div>

          <PhoneFrame
            ratio="276/557"
            className="relative z-10 mx-auto h-[min(calc(100dvh-8.5rem),700px)] max-lg:order-3 max-lg:mt-1 max-lg:h-[min(62svh,520px)]"
          >
            <HeroPlaylist videos={hero.videos} fallback={hero.hero_video_or_image} />
          </PhoneFrame>

          {/* No celular/tablet a colagem aparece abaixo, como imagem normal */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.foto.src} alt="" aria-hidden="true" className="w-full rounded-3xl max-lg:order-5 max-lg:mt-2 lg:hidden" />
        </div>
      </HeroVideoProvider>
    </Section>
  );
}
