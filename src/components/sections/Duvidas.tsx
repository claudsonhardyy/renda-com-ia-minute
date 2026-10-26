import type { SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { PendingNote } from "../Pending";
import { Heading, Section, Tag } from "../ui";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// Página de dúvidas: título, texto, botão que abre o e-mail do suporte com a mensagem pronta,
// três passos e, à direita, um cartão ilustrando a mensagem (preenche a página sem poluir).
export function Duvidas({ c }: { c: SiteContent }) {
  const { duvidas } = c;
  const email = duvidas.email.trim();
  const href = isEmail(email)
    ? `mailto:${email}?subject=${encodeURIComponent(duvidas.assunto)}&body=${encodeURIComponent("Nome:\nDúvida:\n")}`
    : "";

  const botaoClasse =
    "inline-flex items-center gap-2.5 rounded-full bg-lime px-6 py-3.5 text-lg font-bold text-lime-ink shadow-[0_0_28px_-6px_rgb(166_247_116/0.6)] transition hover:brightness-105";

  return (
    <Section id="duvidas">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div>
          <Tag icon="message">{duvidas.selo}</Tag>
          <Heading white={duvidas.tituloBranco} green={duvidas.tituloVerde} />
          <p className="page-sub mt-4 max-w-lg">{duvidas.texto}</p>

          <div className="mt-[3vh]">
            {href ? (
              <a href={href} className={botaoClasse}>
                <Icon name="mail" className="size-6" />
                {duvidas.botao}
              </a>
            ) : (
              <span role="link" aria-disabled="true" title="E-mail do suporte ainda não configurado" className={`${botaoClasse} cursor-default`}>
                <Icon name="mail" className="size-6" />
                {duvidas.botao}
                <span className="sr-only"> (e-mail ainda não configurado)</span>
              </span>
            )}
            {!href && <PendingNote>e-mail do suporte (painel → 10 · Dúvidas)</PendingNote>}
          </div>

          <ol className="mt-[4vh] grid gap-4 sm:grid-cols-3">
            {duvidas.passos.map((passo, i) => (
              <li key={passo.titulo} className="flex gap-3">
                <span className="icon-box size-11 shrink-0">
                  <Icon name={passo.icone} className="size-5" />
                </span>
                <div>
                  <h3 className="card-title">
                    <span className="text-lime">{i + 1}.</span> {passo.titulo}
                  </h3>
                  <p className="card-text mt-0.5">{passo.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Ilustração: como a mensagem chega ao suporte */}
        <div aria-hidden="true" className="relative mx-auto w-full max-w-md">
          <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-lime/10 blur-3xl" />
          <div className="card relative overflow-hidden rounded-3xl p-0">
            <div className="flex items-center gap-3 border-b border-white/10 bg-black/20 px-5 py-3.5">
              <span className="grid size-9 place-items-center rounded-full bg-lime text-lime-ink">
                <Icon name="mail" className="size-5" />
              </span>
              <span className="font-semibold">Nova mensagem</span>
              <span className="ml-auto flex gap-1.5">
                <span className="size-2.5 rounded-full bg-white/25" />
                <span className="size-2.5 rounded-full bg-white/25" />
                <span className="size-2.5 rounded-full bg-lime/70" />
              </span>
            </div>
            <div className="space-y-3 px-5 py-4 text-sm">
              <p className="flex gap-3 border-b border-white/10 pb-2.5">
                <span className="w-16 shrink-0 text-white/55">Para</span>
                <span className="font-medium">Suporte do guia</span>
              </p>
              <p className="flex gap-3 border-b border-white/10 pb-2.5">
                <span className="w-16 shrink-0 text-white/55">Assunto</span>
                <span className="font-medium">{duvidas.assunto}</span>
              </p>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3.5 leading-relaxed">
                <p>
                  <span className="text-lime">Nome:</span> <span className="text-white/60">seu nome</span>
                </p>
                <p className="mt-1">
                  <span className="text-lime">Dúvida:</span> <span className="text-white/60">escreva aqui a sua dúvida…</span>
                </p>
                <span className="mt-3 block h-2 w-3/4 rounded-full bg-white/10" />
                <span className="mt-2 block h-2 w-1/2 rounded-full bg-white/10" />
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-lime/50 bg-lime/10 px-3 py-1.5 text-xs font-semibold text-lime">
                  <Icon name="clock" className="size-4" />
                  {duvidas.prazo}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-sm font-bold text-lime-ink">
                  Enviar
                  <Icon name="send" className="size-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
