import { hero, links } from "@/content/site";
import { HeroMedia } from "../HeroMedia";
import { Icon } from "../Icon";
import { TutorialButton } from "../TutorialButton";
import { PhoneFrame, Section } from "../ui";

// Referência: 1- Página Inicial
export function Inicio() {
  return (
    <Section id="inicio" className="pt-28 md:pt-32">
      <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.8fr_0.95fr] md:gap-6">
        <div>
          <h1 className="text-5xl leading-[1.02] font-extrabold tracking-tight text-balance lg:text-[4.2rem]">
            {hero.tituloBranco} <span className="text-lime">{hero.tituloVerde}</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/85 lg:text-xl">{hero.texto}</p>
          <div className="mt-8 flex max-w-xs flex-col gap-4">
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-lime px-6 py-4 text-lg font-bold text-lime-ink transition hover:brightness-105 active:scale-[0.98]"
            >
              {hero.botaoPrincipal}
              <Icon name="arrowRight" className="size-6" />
            </a>
            <TutorialButton
              url={links.url_tutorial}
              label={hero.botaoTutorial}
              className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-lime px-6 py-3.5 text-lg font-bold text-white transition hover:bg-lime/10"
            />
          </div>
        </div>

        <PhoneFrame className="mx-auto w-[min(70vw,250px)]">
          <div className="aspect-[202/456]">
            <HeroMedia media={hero.hero_video_or_image} />
          </div>
        </PhoneFrame>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.foto.src}
          alt={hero.foto.alt}
          className="mx-auto w-full max-w-sm rounded-3xl object-cover md:max-w-none [mask-image:linear-gradient(to_right,transparent,black_18%)]"
        />
      </div>
    </Section>
  );
}
