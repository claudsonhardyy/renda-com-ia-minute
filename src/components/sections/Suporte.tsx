import type { SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { PendingNote } from "../Pending";
import { RichText } from "../RichText";
import { ExternalLink, Heading, Section, Tag } from "../ui";

function OptionCard({
  href,
  icon,
  titulo,
  tag,
  texto,
  pendingKey,
}: {
  href: string;
  icon: string;
  titulo: string;
  tag: string;
  texto: string;
  pendingKey: string;
}) {
  return (
    <ExternalLink
      href={href}
      pendingLabel={`Link "${titulo}" ainda não configurado`}
      className="card group flex items-center gap-4 p-[2.2vh] transition hover:border-lime/80"
    >
      <span className="grid size-12 shrink-0 place-items-center self-start rounded-full border border-lime/60 text-lime">
        <Icon name={icon} className="size-6" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="card-title block">{titulo}</span>
        <span className="mt-1.5 inline-block rounded-full bg-lime px-3 py-0.5 text-sm font-bold text-lime-ink">{tag}</span>
        <span className="card-text mt-2 block text-white/85">{texto}</span>
        {!href && <PendingNote>{pendingKey}</PendingNote>}
      </span>
      <Icon name="arrowRight" className="size-6 shrink-0 text-lime transition group-hover:translate-x-1" />
    </ExternalLink>
  );
}

// Modelo do cliente (docs/referencias/v2/3.webp): texto, opções de compra e dica à esquerda;
// foto do suporte (em cima) e sequência de uso com o ângulo de 45° (embaixo) à direita.
export function Suporte({ c }: { c: SiteContent }) {
  const { links, suporte } = c;
  return (
    <Section id="suporte">
      <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <Tag icon="headset">{suporte.selo}</Tag>
          <Heading white={suporte.tituloBranco} green={suporte.tituloVerde} />
          <p className="page-sub mt-3 max-w-xl">{suporte.texto}</p>

          <h3 className="block-title mt-[3vh]">{suporte.comoConseguirTitulo}</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <OptionCard href={links.url_hub_pedido_suporte} icon="monitor" pendingKey="url_hub_pedido_suporte" {...suporte.hub} />
            <OptionCard href={links.url_compra_online} icon="cart" pendingKey="url_compra_online" {...suporte.online} />
          </div>

          <div className="card mt-3 flex items-center gap-4 px-4 py-3">
            <Icon name="alertCircle" className="size-9 shrink-0 text-alert" strokeWidth={2.2} />
            <span className="h-9 w-px bg-white/20" />
            <span className="rounded-full bg-alert px-3 py-0.5 text-sm font-bold text-white">{suporte.dica.rotulo}</span>
            <span className="h-9 w-px bg-white/20" />
            <p className="card-text text-white/90">
              <RichText text={suporte.dica.texto} />
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <figure className="card overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={suporte.suporte_product_image.src}
              alt={suporte.suporte_product_image.alt}
              className="block max-h-[calc((100dvh-11rem)/2)] w-auto"
            />
            <figcaption className="px-4 py-2 text-sm text-white/80">{suporte.legendaProduto}</figcaption>
          </figure>
          <div className="card overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={suporte.suporte_usage_image.src}
              alt={suporte.suporte_usage_image.alt}
              className="block max-h-[calc((100dvh-9rem)/2)] w-auto"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
