import type { SiteContent } from "@/content/site";
import { HeroMedia } from "../HeroMedia";
import { Icon } from "../Icon";
import { TutorialButton } from "../TutorialButton";
import { PhoneFrame, Section } from "../ui";

// Modelo do cliente (docs/referencias/v2/1.webp): título e botões à esquerda, celular no centro
// (a tela recebe o vídeo tutorial) e a colagem de fotos ocupando a lateral direita, esfumada.
export function Inicio({ c }: { c: SiteContent }) {
  const { hero, links } = c;
  return (
    <Section id="inicio" className="overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.foto.src}
        alt={hero.foto.alt}
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[55%] object-cover object-left lg:block [mask-image:linear-gradient(to_right,transparent,black_14%),linear-gradient(to_bottom,black_82%,transparent)] [mask-composite:intersect]"
      />

      <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_auto_minmax(0,1.5fr)] lg:gap-8">
        <div>
          <h1 className="hero-title !text-[clamp(2.1rem,min(6.6vh,3.6vw),4.4rem)]">
            {hero.tituloBranco} <span className="text-lime">{hero.tituloVerde}</span>
          </h1>
          <p className="page-sub mt-4 max-w-sm">{hero.texto}</p>
          <div className="mt-6 flex max-w-xs flex-col gap-3">
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-lime px-6 py-3.5 text-lg font-bold text-lime-ink shadow-[0_0_28px_-6px_rgb(166_247_116/0.6)] transition hover:brightness-105 active:scale-[0.98]"
            >
              {hero.botaoPrincipal}
              <Icon name="arrowRight" className="size-6" />
            </a>
            <TutorialButton
              url={links.url_tutorial}
              label={hero.botaoTutorial}
              className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-lime px-6 py-3 text-lg font-bold text-white transition hover:bg-lime/10"
            />
          </div>
        </div>

        <PhoneFrame ratio="276/557" className="relative z-10 mx-auto h-[min(calc(100dvh-8.5rem),700px)]">
          <HeroMedia media={hero.hero_video_or_image} />
        </PhoneFrame>

        {/* No celular/tablet a colagem aparece abaixo, como imagem normal */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.foto.src} alt="" aria-hidden="true" className="w-full rounded-3xl lg:hidden" />
      </div>
    </Section>
  );
}
