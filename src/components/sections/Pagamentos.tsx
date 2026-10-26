import type { SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { Heading, NumberBadge, Section, Tag } from "../ui";

// Referência: 4- Página Pagamentos — carteira, 3 etapas, alerta Pix e informações na mesma tela.
// Página informativa: nada aqui executa operação financeira.
export function Pagamentos({ c }: { c: SiteContent }) {
  const { pagamentos } = c;
  const { carteira, alertaPix } = pagamentos;
  return (
    <Section id="pagamentos">
      <div className="grid items-center gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Tag icon="wallet">{pagamentos.selo}</Tag>
          <Heading white={pagamentos.tituloBranco} green={pagamentos.tituloVerde} inline />
          <p className="page-sub mt-2 max-w-xl text-white/85">{pagamentos.texto}</p>
        </div>

        {/* Ilustração da carteira (não interativa), com aviso de valor fictício */}
        <figure className="mx-auto w-full max-w-[17rem] lg:mr-0">
          <div aria-hidden="true" className="glow rounded-2xl border border-white/10 bg-card p-2">
            <div className="rounded-xl border border-white/10 bg-bg-2 p-3.5">
              <p className="flex items-center gap-2.5 text-sm text-white/90">
                <Icon name="wallet" className="size-5 text-lime" />
                {carteira.rotulo}
              </p>
              <p className="mt-2 flex items-center justify-between text-2xl font-extrabold">
                {carteira.valor}
                <Icon name="chevronRight" className="size-5 text-white/80" />
              </p>
              <p className="mt-2.5 flex items-center justify-center gap-2 rounded-lg bg-lime py-2.5 text-sm font-bold text-lime-ink">
                <Icon name="wallet" className="size-4" />
                {carteira.botao}
              </p>
            </div>
          </div>
          <figcaption className="mt-2 flex items-center justify-center gap-1.5 text-xs text-white/65 italic">
            <Icon name="alertCircle" className="size-3.5 text-lime" />
            {carteira.nota}
          </figcaption>
        </figure>
      </div>

      <div className="mt-[3vh] border-t border-white/10 pt-[2.5vh]">
        <h3 className="block-title">{pagamentos.comoFuncionaTitulo}</h3>
        <ol className="mt-4 grid gap-5 md:grid-cols-3">
          {pagamentos.etapas.map((etapa, i) => (
            <li key={etapa.titulo} className="relative flex gap-3.5">
              <span className="icon-box size-12 shrink-0">
                <Icon name={etapa.icone} className="size-6" />
              </span>
              <div>
                <h4 className="card-title flex items-center gap-2">
                  <NumberBadge n={i + 1} className="size-6 text-xs" />
                  {etapa.titulo}
                </h4>
                <p className="card-text mt-1">{etapa.texto}</p>
              </div>
              {i < pagamentos.etapas.length - 1 && (
                <Icon name="arrowRight" className="absolute top-3 -right-4 hidden size-5 text-lime md:block" />
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-[3vh] grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex items-center gap-3.5 rounded-xl border border-lime/60 bg-lime/[0.05] px-4 py-3">
          <Icon name="pix" className="size-8 shrink-0 text-lime" />
          <div>
            <h4 className="card-title text-lime">{alertaPix.titulo}</h4>
            <p className="card-text">{alertaPix.texto}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-white/65">
              <Icon name="shield" className="size-3.5 shrink-0 text-lime" />
              {alertaPix.lateral}
            </p>
          </div>
        </div>
        {pagamentos.infos.map((info) => (
          <div key={info.titulo} className="card flex items-center gap-3 rounded-xl px-4 py-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-lime/50 text-lime">
              <Icon name={info.icone} className="size-5" />
            </span>
            <div>
              <h4 className="card-title">{info.titulo}</h4>
              <p className="card-text">{info.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
