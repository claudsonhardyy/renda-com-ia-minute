import type { SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { PendingNote, PendingOnly } from "../Pending";
import { ExternalLink, Heading, Section, Tag } from "../ui";

// Referência: 5- Página Suporte da Cabeça — fotos, opções de compra e links na mesma tela.
export function Suporte({ c }: { c: SiteContent }) {
  const { links, suporte } = c;
  const lojas = suporte.lojas.map((l) => ({ ...l, url: links[l.linkKey] }));
  const algumaLoja = lojas.some((l) => l.url);
  const linksBox = (
    <div id="links-compra" className="card p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-lime text-lime-ink">
          <Icon name="link" className="size-5" strokeWidth={2.2} />
        </span>
        <div>
          <h4 className="text-lg font-bold">{suporte.linksTitulo}</h4>
          <p className="text-sm text-white/80">{suporte.linksSubtitulo}</p>
        </div>
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {lojas.map((loja) => {
          const item = (
            <li key={loja.linkKey}>
              <ExternalLink
                href={loja.url}
                pendingLabel={`Link da ${loja.rotulo} ainda não configurado`}
                className="flex items-center gap-3 rounded-full border border-line px-4 py-2.5 text-sm transition hover:border-lime hover:bg-lime/5"
              >
                <Icon name="link" className="size-4 text-white/80" />
                <span className="flex-1 font-semibold">{loja.rotulo}</span>
                {!loja.url && <span className="text-xs text-amber-200">pendente</span>}
                <Icon name="arrowRight" className="size-4" />
              </ExternalLink>
            </li>
          );
          // No site público, lojas sem URL ficam ocultas (Guia, seção 11).
          return loja.url ? item : <PendingOnly key={loja.linkKey}>{item}</PendingOnly>;
        })}
      </ul>
    </div>
  );

  return (
    <Section id="suporte">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        <div>
          <Tag icon="headset">{suporte.selo}</Tag>
          <Heading white={suporte.tituloBranco} green={suporte.tituloVerde} />
          <p className="page-sub mt-4 max-w-lg text-white/85">{suporte.texto}</p>

          <h3 className="mt-6 text-xl font-extrabold">{suporte.comoConseguirTitulo}</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <ExternalLink
              href={links.url_hub_pedido_suporte}
              pendingLabel="Link de pedido do suporte na Hub ainda não configurado"
              className="card group block p-4 transition hover:border-lime/70"
            >
              <span className="flex items-center gap-3">
                <span className="icon-box size-11 shrink-0">
                  <Icon name="truck" className="size-6" />
                </span>
                <span className="text-lg font-bold">{suporte.hub.titulo}</span>
              </span>
              <span className="mt-2 inline-block rounded-md bg-lime px-2 py-0.5 text-xs font-bold text-lime-ink">
                {suporte.hub.tag}
              </span>
              <span className="mt-2 block text-sm text-white/85">{suporte.hub.texto}</span>
              {!links.url_hub_pedido_suporte && <PendingNote>url_hub_pedido_suporte</PendingNote>}
            </ExternalLink>

            {/* Leva aos links de compra; sem nenhuma loja configurada, não é clicável. */}
            <a
              href={algumaLoja ? "#links-compra" : undefined}
              aria-disabled={!algumaLoja || undefined}
              className={`card group block p-4 transition ${algumaLoja ? "hover:border-lime/70" : ""}`}
            >
              <span className="flex items-center gap-3">
                <span className="icon-box size-11 shrink-0">
                  <Icon name="cart" className="size-6" />
                </span>
                <span className="text-lg font-bold">{suporte.online.titulo}</span>
              </span>
              <span className="mt-2 inline-block rounded-md bg-lime px-2 py-0.5 text-xs font-bold text-lime-ink">
                {suporte.online.tag}
              </span>
              <span className="mt-2 block text-sm text-white/85">{suporte.online.texto}</span>
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-[0.8fr_1fr] gap-4">
            <figure className="card relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={suporte.suporte_product_image.src}
                alt={suporte.suporte_product_image.alt}
                className="h-[min(30vh,260px)] w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 px-3 pt-6 pb-2 text-xs text-white/85">
                {suporte.legendaProduto}
              </figcaption>
            </figure>
            <div className="card overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={suporte.suporte_usage_image.src}
                alt={suporte.suporte_usage_image.alt}
                className="h-[min(30vh,260px)] w-full object-cover"
              />
            </div>
          </div>

          {/* Sem nenhuma loja configurada, a caixa inteira fica oculta no site público. */}
          {algumaLoja ? linksBox : <PendingOnly>{linksBox}</PendingOnly>}
        </div>
      </div>
    </Section>
  );
}
