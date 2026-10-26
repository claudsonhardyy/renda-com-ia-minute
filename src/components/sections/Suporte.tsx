import type { SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { PendingNote, PendingOnly } from "../Pending";
import { ExternalLink, Heading, Section, Tag } from "../ui";

// Referência: 5- Página Suporte da Cabeça — à esquerda o texto e as opções de compra;
// à direita a foto do suporte (em cima) e a foto de uso com o ângulo de 45° (embaixo), inteiras.
export function Suporte({ c }: { c: SiteContent }) {
  const { links, suporte } = c;
  const lojas = suporte.lojas.map((l) => ({ ...l, url: links[l.linkKey] }));
  const algumaLoja = lojas.some((l) => l.url);
  const linksBox = (
    <div id="links-compra" className="card mt-3 p-3.5">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-lime text-lime-ink">
          <Icon name="link" className="size-4" strokeWidth={2.2} />
        </span>
        <div>
          <h4 className="text-sm font-bold">{suporte.linksTitulo}</h4>
          <p className="text-xs text-white/75">{suporte.linksSubtitulo}</p>
        </div>
      </div>
      <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
        {lojas.map((loja) => {
          const item = (
            <li key={loja.linkKey}>
              <ExternalLink
                href={loja.url}
                pendingLabel={`Link da ${loja.rotulo} ainda não configurado`}
                className="flex items-center gap-2.5 rounded-full border border-line px-3.5 py-1.5 text-sm transition hover:border-lime hover:bg-lime/5"
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
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <div>
          <Tag icon="headset">{suporte.selo}</Tag>
          <Heading white={suporte.tituloBranco} green={suporte.tituloVerde} />
          <p className="page-sub mt-3 max-w-lg text-white/85">{suporte.texto}</p>

          <h3 className="mt-[2.5vh] text-lg font-extrabold">{suporte.comoConseguirTitulo}</h3>
          <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
            <ExternalLink
              href={links.url_hub_pedido_suporte}
              pendingLabel="Link de pedido do suporte na Hub ainda não configurado"
              className="card block p-3.5 transition hover:border-lime/70"
            >
              <span className="flex items-center gap-2.5">
                <span className="icon-box size-10 shrink-0">
                  <Icon name="truck" className="size-5" />
                </span>
                <span className="font-bold">{suporte.hub.titulo}</span>
              </span>
              <span className="mt-2 inline-block rounded-md bg-lime px-2 py-0.5 text-xs font-bold text-lime-ink">
                {suporte.hub.tag}
              </span>
              <span className="mt-1.5 block text-[13px] leading-snug text-white/85">{suporte.hub.texto}</span>
              {!links.url_hub_pedido_suporte && <PendingNote>url_hub_pedido_suporte</PendingNote>}
            </ExternalLink>

            {/* Leva aos links de compra; sem nenhuma loja configurada, não é clicável. */}
            <a
              href={algumaLoja ? "#links-compra" : undefined}
              aria-disabled={!algumaLoja || undefined}
              className={`card block p-3.5 transition ${algumaLoja ? "hover:border-lime/70" : ""}`}
            >
              <span className="flex items-center gap-2.5">
                <span className="icon-box size-10 shrink-0">
                  <Icon name="cart" className="size-5" />
                </span>
                <span className="font-bold">{suporte.online.titulo}</span>
              </span>
              <span className="mt-2 inline-block rounded-md bg-lime px-2 py-0.5 text-xs font-bold text-lime-ink">
                {suporte.online.tag}
              </span>
              <span className="mt-1.5 block text-[13px] leading-snug text-white/85">{suporte.online.texto}</span>
            </a>
          </div>

          {/* Sem nenhuma loja configurada, a caixa inteira fica oculta no site público. */}
          {algumaLoja ? linksBox : <PendingOnly>{linksBox}</PendingOnly>}
        </div>

        <div className="flex flex-col items-center gap-3">
          <figure className="card overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={suporte.suporte_product_image.src}
              alt={suporte.suporte_product_image.alt}
              className="block h-[calc((100dvh-10.5rem)/2)] max-h-[360px] w-auto"
            />
            <figcaption className="px-3 py-1.5 text-xs text-white/75">{suporte.legendaProduto}</figcaption>
          </figure>
          <div className="card overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={suporte.suporte_usage_image.src}
              alt={suporte.suporte_usage_image.alt}
              className="block h-[calc((100dvh-10.5rem)/2)] max-h-[380px] w-auto"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
