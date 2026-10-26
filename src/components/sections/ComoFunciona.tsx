import type { SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { NumberBadge, Section } from "../ui";

// Referência: 1.1- Página inicial (Como funciona) — os 4 passos e o bloco do app na mesma tela.
export function ComoFunciona({ c }: { c: SiteContent }) {
  const { comoFunciona } = c;
  const { bloco } = comoFunciona;
  return (
    <Section id="como-funciona">
      <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.4fr] lg:gap-14">
        <div>
          <h2 className="page-title">{comoFunciona.titulo}</h2>
          <p className="page-sub mt-4 max-w-sm text-white/85">{comoFunciona.subtitulo}</p>
          <a
            href={bloco.destino}
            className="mt-8 flex items-center gap-5 rounded-2xl border border-lime/60 bg-gradient-to-r from-lime/15 to-lime/[0.03] p-5 transition hover:border-lime"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-lime text-lime-ink">
              <Icon name="phone" className="size-7" strokeWidth={2} />
            </span>
            <span>
              <span className="block text-lg">
                <strong className="font-bold">{bloco.tituloForte}</strong> {bloco.titulo}
              </span>
              <span className="mt-1 block text-white/80">{bloco.texto}</span>
            </span>
          </a>
        </div>

        <ol className="space-y-3">
          {comoFunciona.passos.map((passo, i) => (
            <li key={passo.titulo}>
              <a
                href={passo.destino}
                className="card group flex items-center gap-4 px-4 py-4 transition hover:border-lime/70 hover:bg-lime/[0.04] active:scale-[0.995] sm:gap-5 sm:px-6"
              >
                <NumberBadge n={i + 1} className="size-11 text-lg" />
                <Icon name={passo.icone} className="hidden size-8 shrink-0 text-white sm:block" strokeWidth={1.5} />
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-bold sm:text-xl">{passo.titulo}</span>
                  <span className="mt-0.5 block text-sm text-white/80 sm:text-base">{passo.texto}</span>
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
