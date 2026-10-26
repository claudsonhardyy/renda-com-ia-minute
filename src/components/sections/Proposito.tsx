import type { SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { Heading, Section } from "../ui";

// Referência: Página Entenda o Propósito — título, 3 etapas, fechamento e imagem na mesma tela (sem CTA).
export function Proposito({ c }: { c: SiteContent }) {
  const { proposito } = c;
  return (
    <Section id="proposito">
      <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div>
          <Heading white={proposito.tituloBranco} green={proposito.tituloVerde} />
          <p className="page-sub mt-3 max-w-md text-white/85">{proposito.texto}</p>

          <h3 className="block-title mt-[3vh]">{proposito.comoFuncionaTitulo}</h3>
          <ol className="mt-4 grid gap-5 sm:grid-cols-3">
            {proposito.etapas.map((etapa, i) => (
              <li key={etapa.titulo} className="relative">
                <span className="icon-box size-14">
                  <Icon name={etapa.icone} className="size-8" strokeWidth={1.5} />
                </span>
                {i < proposito.etapas.length - 1 && (
                  <Icon name="arrowRight" className="absolute top-5 left-20 hidden size-6 text-lime sm:block" />
                )}
                <h4 className="card-title mt-3">{etapa.titulo}</h4>
                <p className="card-text mt-1">{etapa.texto}</p>
              </li>
            ))}
          </ol>

          <div className="card mt-[3vh] flex items-center gap-5 p-4">
            <Icon name="brain" className="size-11 shrink-0 text-lime" strokeWidth={1.5} />
            <div className="border-l border-white/15 pl-5">
              <h4 className="card-title text-lime">{proposito.fechamento.titulo}</h4>
              <p className="card-text mt-1">{proposito.fechamento.texto}</p>
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={proposito.proposito_hero_image.src}
          alt={proposito.proposito_hero_image.alt}
          className="soft-edges mx-auto h-[min(calc(100dvh-8rem),760px)] w-auto max-w-full object-contain"
        />
      </div>
    </Section>
  );
}
