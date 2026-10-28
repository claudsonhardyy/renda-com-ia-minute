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
    <article className="card relative flex flex-col items-center gap-5 overflow-hidden px-5 py-4 max-lg:gap-3 max-lg:px-2 max-lg:py-3 lg:flex-row lg:gap-7 lg:px-7">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imagem.src} alt={imagem.alt} className="relative h-[min(calc(100dvh-22rem),360px,70vw)] w-auto shrink-0 max-lg:h-[min(24svh,200px)]" />
      <div className="relative flex min-w-0 flex-col max-lg:items-center">
        {/* Pílula do modelo do cliente: ícone | nome / COMPATÍVEIS */}
        <div className="inline-flex items-center gap-4 self-start rounded-full border-2 border-lime/80 bg-black/20 py-2.5 pr-6 pl-4 shadow-[0_0_24px_-6px_rgb(166_247_116/0.6)] max-lg:gap-2 max-lg:self-center max-lg:py-1.5 max-lg:pr-3.5 max-lg:pl-2.5">
          <Icon name={icon} className="size-9 shrink-0 text-lime max-lg:size-6" />
          <span className="h-9 w-px bg-white/25 max-lg:h-6" />
          <span className="leading-tight">
            <span className="block text-xl font-semibold max-lg:text-base lg:text-2xl">{titulo}</span>
            <span className="block text-xs font-semibold tracking-[0.2em] text-lime uppercase max-lg:text-[0.6rem] max-lg:tracking-[0.14em]">{etiqueta}</span>
          </span>
        </div>
        <ul className="mt-5 space-y-2.5 max-lg:mt-3 max-lg:space-y-1.5">
          {modelos.map((m) => (
            <li key={m} className="page-sub flex items-start gap-2.5 !text-white max-lg:gap-1.5 max-lg:!text-[0.8rem] max-lg:!leading-snug">
              <Icon name="checkCircle" className="mt-1 size-5 shrink-0 text-lime max-lg:mt-px max-lg:size-4" strokeWidth={2.2} />
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

      <div className="mt-[3vh] grid grid-cols-2 gap-5 max-lg:mt-[2.5svh] max-lg:gap-2.5">
        <PlatformCard icon="apple" {...iphone} />
        <PlatformCard icon="android" {...android} />
      </div>

      <div className="card mt-5 flex flex-wrap items-center justify-between gap-4 px-5 py-4 max-lg:mt-[2.5svh] max-lg:gap-2.5 max-lg:border-white/10 max-lg:px-3 max-lg:py-2.5">
        <p className="flex items-center gap-3 max-lg:gap-2">
          <Icon name="alertCircle" className="size-7 shrink-0 text-alert max-lg:size-5" strokeWidth={2.2} />
          <span className="card-text text-white/90 max-lg:!text-xs max-lg:text-white/75">{verificar.texto}</span>
        </p>
        <ExternalLink
          href={links.url_hub_celulares}
          pendingLabel="Link para verificar o aparelho no site da Hub ainda não configurado"
          className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-bold text-lime-ink transition hover:brightness-105 max-lg:gap-1.5 max-lg:px-3.5 max-lg:py-1.5 max-lg:text-xs"
        >
          {verificar.botao}
          <Icon name="arrowRight" className="size-5 max-lg:size-4" />
        </ExternalLink>
        {!links.url_hub_celulares && <PendingNote>url_hub_celulares</PendingNote>}
      </div>
    </Section>
  );
}
