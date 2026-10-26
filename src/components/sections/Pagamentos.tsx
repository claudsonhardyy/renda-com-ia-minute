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
      <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Tag icon="wallet">{pagamentos.selo}</Tag>
          <Heading white={pagamentos.tituloBranco} green={pagamentos.tituloVerde} inline />
          <p className="page-sub mt-3 max-w-xl text-white/85">{pagamentos.texto}</p>
        </div>

        {/* Ilustração da carteira (não interativa) */}
        <div aria-hidden="true" className="glow mx-auto w-full max-w-xs rounded-3xl border border-white/10 bg-card p-2.5 lg:mr-0">
          <div className="rounded-2xl border border-white/10 bg-bg-2 p-4">
            <p className="flex items-center gap-3 text-white/90">
              <Icon name="wallet" className="size-6 text-lime" />
              {carteira.rotulo}
            </p>
            <p className="mt-3 flex items-center justify-between text-3xl font-extrabold">
              {carteira.valor}
              <Icon name="chevronRight" className="size-6 text-white/80" />
            </p>
            <p className="mt-3 flex items-center justify-center gap-3 rounded-xl bg-lime py-3 font-bold text-lime-ink">
              <Icon name="wallet" className="size-5" />
              {carteira.botao}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-6">
        <h3 className="text-2xl font-extrabold">{pagamentos.comoFuncionaTitulo}</h3>
        <ol className="mt-5 grid gap-6 md:grid-cols-3">
          {pagamentos.etapas.map((etapa, i) => (
            <li key={etapa.titulo} className="relative flex gap-4">
              <span className="icon-box size-16 shrink-0">
                <Icon name={etapa.icone} className="size-8" />
              </span>
              <div>
                <h4 className="flex items-center gap-2 text-lg font-bold">
                  <NumberBadge n={i + 1} className="size-7 text-sm" />
                  {etapa.titulo}
                </h4>
                <p className="mt-1.5 text-sm text-white/80">{etapa.texto}</p>
              </div>
              {i < pagamentos.etapas.length - 1 && (
                <Icon name="arrowRight" className="absolute top-5 -right-5 hidden size-6 text-lime md:block" />
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex items-center gap-5 rounded-2xl border border-lime/60 p-5">
          <Icon name="pix" className="size-12 shrink-0 text-lime" />
          <div>
            <h4 className="text-xl font-bold text-lime">{alertaPix.titulo}</h4>
            <p className="mt-1 text-sm text-white/85">{alertaPix.texto}</p>
            <p className="mt-2 flex items-center gap-2 text-xs text-white/70">
              <Icon name="shield" className="size-4 shrink-0 text-lime" />
              {alertaPix.lateral}
            </p>
          </div>
        </div>
        {pagamentos.infos.map((info) => (
          <div key={info.titulo} className="card flex gap-4 p-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-lime/50 text-lime">
              <Icon name={info.icone} className="size-6" />
            </span>
            <div>
              <h4 className="font-bold">{info.titulo}</h4>
              <p className="mt-1 text-sm text-white/80">{info.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
