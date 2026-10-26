import { links, suporte } from "@/content/site";
import { Icon } from "../Icon";
import { ExternalLink, Heading, PendingNote, Section, Tag } from "../ui";

// Referência: 5- Página Suporte da Cabeça
export function Suporte() {
  const lojas = suporte.lojas.map((l) => ({ ...l, url: links[l.linkKey] }));
  // Em produção, lojas sem URL somem da lista (Guia, seção 11); em dev aparecem como pendentes.
  const lojasVisiveis = process.env.NODE_ENV === "production" ? lojas.filter((l) => l.url) : lojas;

  return (
    <Section id="suporte">
      <Tag icon="headset">{suporte.selo}</Tag>
      <Heading white={suporte.tituloBranco} green={suporte.tituloVerde} />
      <p className="mt-6 max-w-lg text-lg text-white/85">{suporte.texto}</p>

      <div className="mt-10 grid items-center gap-6 md:grid-cols-[0.8fr_1fr]">
        <figure className="card overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={suporte.suporte_product_image.src} alt={suporte.suporte_product_image.alt} className="w-full" />
          <figcaption className="px-5 pb-5 text-sm text-white/80">{suporte.legendaProduto}</figcaption>
        </figure>
        <div className="card overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={suporte.suporte_usage_image.src} alt={suporte.suporte_usage_image.alt} className="w-full" />
        </div>
      </div>

      <h3 className="mt-16 text-3xl font-extrabold">{suporte.comoConseguirTitulo}</h3>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <ExternalLink
          href={links.url_hub_pedido_suporte}
          pendingLabel="Link de pedido do suporte na Hub ainda não configurado"
          className="card group flex gap-5 p-6 transition hover:border-lime/70"
        >
          <span className="icon-box size-16 shrink-0">
            <Icon name="truck" className="size-8" />
          </span>
          <span className="block">
            <span className="flex items-center gap-2 text-xl font-bold">
              {suporte.hub.titulo}
              <Icon name="arrowRight" className="size-5 text-lime transition group-hover:translate-x-1" />
            </span>
            <span className="mt-2 inline-block rounded-md bg-lime px-2 py-0.5 text-xs font-bold text-lime-ink">
              {suporte.hub.tag}
            </span>
            <span className="mt-3 block text-white/85">{suporte.hub.texto}</span>
            {!links.url_hub_pedido_suporte && <PendingNote>url_hub_pedido_suporte</PendingNote>}
          </span>
        </ExternalLink>

        <a href="#links-compra" className="card group flex gap-5 p-6 transition hover:border-lime/70">
          <span className="icon-box size-16 shrink-0">
            <Icon name="cart" className="size-8" />
          </span>
          <span className="block">
            <span className="flex items-center gap-2 text-xl font-bold">
              {suporte.online.titulo}
              <Icon name="arrowRight" className="size-5 text-lime transition group-hover:translate-x-1" />
            </span>
            <span className="mt-2 inline-block rounded-md bg-lime px-2 py-0.5 text-xs font-bold text-lime-ink">
              {suporte.online.tag}
            </span>
            <span className="mt-3 block text-white/85">{suporte.online.texto}</span>
          </span>
        </a>
      </div>

      <div id="links-compra" className="card mt-8 scroll-mt-24 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-lime text-lime-ink">
            <Icon name="link" className="size-6" strokeWidth={2.2} />
          </span>
          <div>
            <h4 className="text-xl font-bold">{suporte.linksTitulo}</h4>
            <p className="mt-1 text-white/80">{suporte.linksSubtitulo}</p>
          </div>
        </div>
        <ul className="mt-6 space-y-3">
          {lojasVisiveis.map((loja) => (
            <li key={loja.linkKey}>
              <ExternalLink
                href={loja.url}
                pendingLabel={`Link da ${loja.rotulo} ainda não configurado`}
                className="flex items-center gap-4 rounded-full border border-line px-5 py-3 transition hover:border-lime hover:bg-lime/5"
              >
                <Icon name="link" className="size-5 text-white/80" />
                <span className="flex-1">{loja.rotulo}</span>
                {!loja.url && <span className="text-xs text-amber-200">link pendente</span>}
                <Icon name="arrowRight" className="size-5" />
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
