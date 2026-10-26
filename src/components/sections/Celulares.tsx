import type { Media, SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { PendingNote } from "../Pending";
import { ExternalLink, Heading, Section } from "../ui";

function PlatformCard({
  icon,
  titulo,
  etiqueta,
  imagem,
  modelos,
}: {
  icon: string;
  titulo: string;
  etiqueta: string;
  imagem: Media;
  modelos: string[];
}) {
  return (
    <article className="card relative flex items-center gap-5 overflow-hidden px-5 py-4 sm:gap-7 sm:px-7">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imagem.src} alt={imagem.alt} className="relative h-[min(calc(100dvh-22rem),360px)] w-auto shrink-0" />
      <div className="relative min-w-0">
        {/* Pílula do modelo do cliente: ícone | nome / COMPATÍVEIS */}
        <div className="inline-flex items-center gap-4 rounded-full border-2 border-lime/80 bg-black/20 py-2.5 pr-6 pl-4 shadow-[0_0_24px_-6px_rgb(166_247_116/0.6)]">
          <Icon name={icon} className="size-9 shrink-0 text-lime" />
          <span className="h-9 w-px bg-white/25" />
          <span className="leading-tight">
            <span className="block text-2xl font-semibold">{titulo}</span>
            <span className="block text-xs font-semibold tracking-[0.2em] text-lime uppercase">{etiqueta}</span>
          </span>
        </div>
        <ul className="mt-5 space-y-2.5">
          {modelos.map((m) => (
            <li key={m} className="page-sub flex items-start gap-2.5 !text-white">
              <Icon name="checkCircle" className="mt-1 size-5 shrink-0 text-lime" strokeWidth={2.2} />
              {m}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// Versão minimalista, com a mesma informação do site da Hub: iPhone 12+, Pixel 6+ e Galaxy S21+ (exceto FE).
export function Celulares({ c }: { c: SiteContent }) {
  const { celulares, links } = c;
  const { iphone, android, verificar } = celulares;
  return (
    <Section id="celulares-compativeis">
      <Heading white={celulares.tituloBranco} green={celulares.tituloVerde} inline />
      <p className="page-sub mt-2">{celulares.texto}</p>

      <div className="mt-[3vh] grid gap-5 lg:grid-cols-2">
        <PlatformCard icon="apple" {...iphone} />
        <PlatformCard icon="android" {...android} />
      </div>

      <div className="card mt-5 flex flex-wrap items-center justify-between gap-4 px-5 py-4">
        <p className="flex items-center gap-3">
          <Icon name="alertCircle" className="size-7 shrink-0 text-lime" />
          <span className="card-text text-white/90">{verificar.texto}</span>
        </p>
        <ExternalLink
          href={links.url_hub_celulares}
          pendingLabel="Link para verificar o aparelho no site da Hub ainda não configurado"
          className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-bold text-lime-ink transition hover:brightness-105"
        >
          {verificar.botao}
          <Icon name="arrowRight" className="size-5" />
        </ExternalLink>
        {!links.url_hub_celulares && <PendingNote>url_hub_celulares</PendingNote>}
      </div>
    </Section>
  );
}
