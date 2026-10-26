import type { SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { Heading, Section, Tag } from "../ui";

// Referência: Página Entenda o Propósito (sem CTA, conforme o Guia)
export function Proposito({ c }: { c: SiteContent }) {
  const { proposito } = c;
  return (
    <Section id="proposito">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <Tag icon="brain">{proposito.selo}</Tag>
          <Heading white={proposito.tituloBranco} green={proposito.tituloVerde} />
          <p className="mt-6 max-w-md text-lg text-white/85">{proposito.texto}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={proposito.proposito_hero_image.src}
          alt={proposito.proposito_hero_image.alt}
          className="mx-auto w-full max-w-md [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
        />
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-3xl font-extrabold">{proposito.comoFuncionaTitulo}</h3>
        <div className="mx-auto mt-4 h-0.5 w-20 bg-lime" />
      </div>
      <ol className="mt-12 grid gap-10 text-center md:grid-cols-3">
        {proposito.etapas.map((etapa, i) => (
          <li key={etapa.titulo} className="relative flex flex-col items-center">
            <span className="icon-box size-28">
              <Icon name={etapa.icone} className="size-12" strokeWidth={1.5} />
            </span>
            {i < proposito.etapas.length - 1 && (
              <Icon
                name="arrowRight"
                className="absolute top-11 -right-6 hidden size-7 text-lime md:block lg:-right-4"
              />
            )}
            <h4 className="mt-6 text-2xl font-bold">{etapa.titulo}</h4>
            <p className="mt-3 max-w-48 text-white/85">{etapa.texto}</p>
          </li>
        ))}
      </ol>

      <div className="card mt-14 flex flex-col gap-6 p-8 sm:flex-row sm:items-center">
        <Icon name="brain" className="size-14 shrink-0 text-lime sm:mx-6" strokeWidth={1.5} />
        <div className="sm:border-l sm:border-white/15 sm:pl-8">
          <h4 className="text-2xl font-bold text-lime">{proposito.fechamento.titulo}</h4>
          <p className="mt-2 max-w-md text-lg text-white/85">{proposito.fechamento.texto}</p>
        </div>
      </div>
    </Section>
  );
}
