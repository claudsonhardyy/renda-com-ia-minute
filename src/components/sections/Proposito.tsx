import type { SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { Heading, Section } from "../ui";

// Referência: Página Entenda o Propósito — título, 3 etapas, fechamento e imagem na mesma tela (sem CTA).
export function Proposito({ c }: { c: SiteContent }) {
  const { proposito } = c;
  return (
    <Section id="proposito" className="overflow-hidden">
      <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        {/* No celular o robô fica ao fundo, no alto à direita, olhando para a esquerda, com as bordas esfumadas */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={proposito.proposito_hero_image.src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-[4rem] -right-[22%] h-auto w-[112%] max-w-[560px] -scale-x-100 opacity-85 lg:hidden [mask-image:radial-gradient(ellipse_52%_54%_at_50%_42%,black_45%,transparent_100%),linear-gradient(to_bottom,black_50%,transparent_92%)] [mask-composite:intersect]"
        />
        <div className="relative max-lg:flex max-lg:min-h-[calc(100svh-6rem-1px)] max-lg:flex-col max-lg:justify-end max-lg:[text-shadow:0_1px_10px_rgb(6_37_27/0.95)]">
          <Heading white={proposito.tituloBranco} green={proposito.tituloVerde} />
          <p className="page-sub mt-3 max-w-md text-white/85 max-lg:max-w-[16rem]">{proposito.texto}</p>

          <h3 className="block-title mt-[3vh] max-lg:mt-[4svh]">{proposito.comoFuncionaTitulo}</h3>
          <ol className="mt-4 grid grid-cols-3 gap-5 max-lg:gap-2.5">
            {proposito.etapas.map((etapa, i) => (
              <li key={etapa.titulo} className="relative">
                <span className="icon-box size-14 max-lg:size-11">
                  <Icon name={etapa.icone} className="size-8 max-lg:size-6" strokeWidth={1.5} />
                </span>
                {i < proposito.etapas.length - 1 && (
                  <Icon name="arrowRight" className="absolute top-5 left-20 size-6 text-lime max-lg:top-3.5 max-lg:left-14 max-lg:size-4" />
                )}
                <h4 className="card-title mt-3 max-lg:mt-2 max-lg:!text-[0.82rem]">{etapa.titulo}</h4>
                <p className="card-text mt-1 max-lg:!text-xs">{etapa.texto}</p>
              </li>
            ))}
          </ol>

          <div className="card mt-[3vh] flex items-center gap-5 p-4 max-lg:mt-[4svh] max-lg:gap-3 max-lg:p-3">
            <Icon name="brain" className="size-11 shrink-0 text-lime max-lg:size-8" strokeWidth={1.5} />
            <div className="border-l border-white/15 pl-5 max-lg:pl-3">
              <h4 className="card-title text-lime">{proposito.fechamento.titulo}</h4>
              <p className="card-text mt-1 max-lg:!text-xs">{proposito.fechamento.texto}</p>
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={proposito.proposito_hero_image.src}
          alt={proposito.proposito_hero_image.alt}
          className="soft-edges mx-auto h-[min(calc(100dvh-8rem),760px)] w-auto max-w-full object-contain max-lg:hidden"
        />
      </div>
    </Section>
  );
}
