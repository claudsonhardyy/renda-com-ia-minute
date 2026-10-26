import type { SiteContent } from "@/content/site";
import { HeroMedia } from "../HeroMedia";
import { Icon } from "../Icon";
import { TutorialButton } from "../TutorialButton";
import { PhoneFrame, Section } from "../ui";

// Referência: 1- Página Inicial — título, texto, botões, celular (em destaque) e foto na mesma tela.
export function Inicio({ c }: { c: SiteContent }) {
  const { hero, links } = c;
  return (
    <Section id="inicio">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <h1 className="hero-title max-w-[11ch]">
            {hero.tituloBranco} <span className="text-lime">{hero.tituloVerde}</span>
          </h1>
          <p className="page-sub mt-5 max-w-md text-white/85">{hero.texto}</p>
          <div className="mt-7 flex max-w-xs flex-col gap-3">
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-lime px-6 py-3.5 text-lg font-bold text-lime-ink transition hover:brightness-105 active:scale-[0.98]"
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

        {/* Celular na frente, em destaque; a foto fica atrás, à direita, com bordas esfumadas */}
        <div className="relative mx-auto flex items-center lg:mx-0">
          <PhoneFrame ratio="202/456" className="relative z-10 h-[min(calc(100dvh-8rem),720px)]">
            <HeroMedia media={hero.hero_video_or_image} />
          </PhoneFrame>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero.foto.src}
            alt={hero.foto.alt}
            className="soft-frame relative z-0 -ml-10 hidden h-[min(calc(100dvh-11rem),610px)] w-auto object-contain sm:block"
          />
        </div>
      </div>
    </Section>
  );
}
