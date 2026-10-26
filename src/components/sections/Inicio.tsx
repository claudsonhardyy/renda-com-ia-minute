import type { SiteContent } from "@/content/site";
import { HeroMedia } from "../HeroMedia";
import { Icon } from "../Icon";
import { TutorialButton } from "../TutorialButton";
import { PhoneFrame, Section, Tag } from "../ui";

// Referência: 1- Página Inicial — título, texto, botões, celular e foto na mesma tela.
export function Inicio({ c }: { c: SiteContent }) {
  const { hero, links } = c;
  return (
    <Section id="inicio">
      <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_auto_1fr] lg:gap-10">
        <div>
          <Tag icon="checkCircle">{hero.selo}</Tag>
          <h1 className="page-title mt-4">
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

        <PhoneFrame ratio="202/456" className="mx-auto h-[min(64vh,560px)]">
          <HeroMedia media={hero.hero_video_or_image} />
        </PhoneFrame>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.foto.src}
          alt={hero.foto.alt}
          className="mx-auto h-[min(70vh,620px)] w-full max-w-md rounded-3xl object-cover lg:max-w-none"
        />
      </div>
    </Section>
  );
}
