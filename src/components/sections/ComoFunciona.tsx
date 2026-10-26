import type { SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { NumberBadge, Section } from "../ui";

// Referência: 1.1- Página inicial (Como funciona)
export function ComoFunciona({ c }: { c: SiteContent }) {
  const { comoFunciona } = c;
  const { bloco } = comoFunciona;
  return (
    <Section id="como-funciona">
      <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{comoFunciona.titulo}</h2>
      <p className="mt-2 text-lg text-white/85">{comoFunciona.subtitulo}</p>

      <ol className="mt-8 space-y-4">
        {comoFunciona.passos.map((passo, i) => (
          <li key={passo.titulo}>
            <a
              href={passo.destino}
              className="card group flex items-center gap-4 px-4 py-5 transition hover:border-lime/70 hover:bg-lime/[0.04] active:scale-[0.995] sm:gap-6 sm:px-6"
            >
              <NumberBadge n={i + 1} className="size-11 text-lg sm:size-12 sm:text-xl" />
              <Icon name={passo.icone} className="hidden size-9 shrink-0 text-white sm:block" strokeWidth={1.5} />
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-bold sm:text-xl">{passo.titulo}</span>
                <span className="mt-1 block text-white/80">{passo.texto}</span>
              </span>
              <Icon
                name="arrowRight"
                className="size-6 shrink-0 text-white/90 transition group-hover:translate-x-1 group-hover:text-lime"
              />
            </a>
          </li>
        ))}
      </ol>

      <a
        href={bloco.destino}
        className="mt-6 flex items-center gap-5 rounded-2xl border border-lime/60 bg-gradient-to-r from-lime/10 to-lime/[0.03] px-5 py-5 transition hover:border-lime sm:px-6"
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
    </Section>
  );
}
