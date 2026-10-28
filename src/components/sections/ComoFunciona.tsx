import type { SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { NumberBadge, Section } from "../ui";

// Referência: 1.1- Página inicial (Como funciona) — os 4 passos e o bloco do app na mesma tela.
// É uma extensão da página Início: não aparece no menu superior.
export function ComoFunciona({ c }: { c: SiteContent }) {
  const { comoFunciona } = c;
  const { bloco } = comoFunciona;
  return (
    <Section id="como-funciona" className="!border-t-0">
      <div className="grid items-center gap-8 max-lg:gap-[2svh] lg:grid-cols-[0.85fr_1.4fr] lg:gap-14">
        <div>
          <h2 className="page-title max-lg:!text-[clamp(1.6rem,4.4svh,1.9rem)]">{comoFunciona.titulo}</h2>
          <p className="page-sub mt-4 max-w-sm text-white/85 max-lg:mt-1.5 max-lg:!text-[clamp(0.85rem,2.2svh,0.95rem)]">{comoFunciona.subtitulo}</p>
          <a
            href={bloco.destino}
            className="mt-8 flex items-center gap-5 rounded-2xl border border-lime/60 bg-gradient-to-r from-lime/15 to-lime/[0.03] p-5 transition hover:border-lime max-lg:mt-[2svh] max-lg:gap-3 max-lg:rounded-xl max-lg:px-3.5 max-lg:py-2.5"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-lime text-lime-ink max-lg:size-9 max-lg:rounded-lg">
              <Icon name="phone" className="size-7 max-lg:size-5" strokeWidth={2} />
            </span>
            <span>
              <span className="card-title block font-normal max-lg:!text-sm">
                <strong className="font-bold">{bloco.tituloForte}</strong> {bloco.titulo}
              </span>
              <span className="card-text mt-1 block max-lg:mt-0 max-lg:!text-xs">{bloco.texto}</span>
            </span>
          </a>
        </div>

        <ol className="space-y-3 max-lg:space-y-[1.2svh]">
          {comoFunciona.passos.map((passo, i) => (
            <li key={passo.titulo}>
              <a
                href={passo.destino}
                className="card group flex items-center gap-4 px-4 py-4 transition hover:border-lime/70 hover:bg-lime/[0.04] active:scale-[0.995] sm:gap-5 sm:px-6 max-lg:py-[min(0.85rem,1.6svh)]"
              >
                <NumberBadge n={i + 1} className="size-11 text-lg max-lg:size-9 max-lg:text-base" />
                <Icon name={passo.icone} className="hidden size-8 shrink-0 text-white sm:block" strokeWidth={1.5} />
                <span className="min-w-0 flex-1">
                  <span className="card-title block">{passo.titulo}</span>
                  <span className="card-text mt-0.5 block max-lg:!text-[clamp(0.76rem,1.95svh,0.85rem)]">{passo.texto}</span>
                </span>
                <Icon
                  name="arrowRight"
                  className="size-6 shrink-0 text-white/90 transition group-hover:translate-x-1 group-hover:text-lime"
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
