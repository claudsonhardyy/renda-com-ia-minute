import { pagamentos } from "@/content/site";
import { Icon } from "../Icon";
import { Heading, NumberBadge, Section, Tag } from "../ui";

// Referência: 4- Página Pagamentos. Página informativa: nada aqui executa operação financeira.
export function Pagamentos() {
  const { carteira, alertaPix } = pagamentos;
  return (
    <Section id="pagamentos">
      <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Tag icon="wallet">{pagamentos.selo}</Tag>
          <Heading white={pagamentos.tituloBranco} green={pagamentos.tituloVerde} />
          <p className="mt-6 max-w-md text-lg text-white/85">{pagamentos.texto}</p>
        </div>

        {/* Ilustração da carteira (não interativa) */}
        <div aria-hidden="true" className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-4 rounded-[2rem] border border-lime/30" />
          <div className="glow relative rounded-3xl border border-white/10 bg-card p-3">
            <div className="rounded-2xl border border-white/10 bg-bg-2 p-5">
              <p className="flex items-center gap-3 text-white/90">
                <Icon name="wallet" className="size-7 text-lime" />
                {carteira.rotulo}
              </p>
              <p className="mt-5 flex items-center justify-between text-3xl font-extrabold">
                {carteira.valor}
                <Icon name="chevronRight" className="size-6 text-white/80" />
              </p>
              <p className="mt-5 flex items-center justify-center gap-3 rounded-xl bg-lime py-4 font-bold text-lime-ink">
                <Icon name="wallet" className="size-5" />
                {carteira.botao}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-white/10 pt-14">
        <h3 className="text-4xl font-extrabold">{pagamentos.comoFuncionaTitulo}</h3>
        <div className="mt-3 h-0.5 w-20 bg-lime" />
        <ol className="mt-10 grid gap-10 md:grid-cols-3">
          {pagamentos.etapas.map((etapa, i) => (
            <li key={etapa.titulo} className="relative">
              <span className="icon-box size-24">
                <Icon name={etapa.icone} className="size-11" />
              </span>
              {i < pagamentos.etapas.length - 1 && (
                <Icon name="arrowRight" className="absolute top-9 left-36 hidden size-8 text-lime md:block" />
              )}
              <h4 className="mt-5 flex items-center gap-3 text-xl font-bold">
                <NumberBadge n={i + 1} className="size-8 text-base" />
                {etapa.titulo}
              </h4>
              <p className="mt-3 pl-11 text-white/80">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14 grid items-center gap-6 rounded-2xl border border-lime/60 p-6 md:grid-cols-[auto_1fr_auto] md:gap-8 md:p-8">
        <Icon name="pix" className="size-16 text-lime" />
        <div className="md:border-l md:border-white/15 md:pl-8">
          <h4 className="text-2xl font-bold text-lime">{alertaPix.titulo}</h4>
          <p className="mt-2 text-white/85">{alertaPix.texto}</p>
        </div>
        <p className="flex items-center gap-4 text-sm text-white/80 md:max-w-60 md:border-l md:border-white/15 md:pl-8">
          <Icon name="shield" className="size-9 shrink-0 text-lime" />
          {alertaPix.lateral}
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 md:divide-x md:divide-white/10">
        {pagamentos.infos.map((info) => (
          <div key={info.titulo} className="flex gap-5 md:px-6">
            <span className="grid size-16 shrink-0 place-items-center rounded-full border border-lime/50 text-lime">
              <Icon name={info.icone} className="size-7" />
            </span>
            <div>
              <h4 className="text-lg font-bold">{info.titulo}</h4>
              <p className="mt-1 text-white/80">{info.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
