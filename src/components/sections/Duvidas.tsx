import type { SiteContent } from "@/content/site";
import { EmailButton } from "../EmailButton";
import { Icon } from "../Icon";
import { PendingNote } from "../Pending";
import { Heading, Section, Tag } from "../ui";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// Página de dúvidas: à esquerda título, texto e o endereço do suporte com o botão de copiar
// e a instrução de envio;
// à direita um cartão simples com o que informar e o prazo de resposta.
export function Duvidas({ c }: { c: SiteContent }) {
  const { duvidas } = c;
  const email = duvidas.email.trim();
  const valido = isEmail(email);

  const botaoCopiar =
    "inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 font-bold text-lime-ink shadow-[0_0_28px_-6px_rgb(166_247_116/0.6)] transition hover:brightness-105";
  const botaoClasse =
    "inline-flex items-center gap-2.5 rounded-full bg-lime px-6 py-3.5 text-lg font-bold text-lime-ink shadow-[0_0_28px_-6px_rgb(166_247_116/0.6)] transition hover:brightness-105";

  return (
    <Section id="duvidas">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <Tag icon="message">{duvidas.selo}</Tag>
          <Heading white={duvidas.tituloBranco} green={duvidas.tituloVerde} />
          <p className="page-sub mt-4 max-w-lg">{duvidas.texto}</p>

          <div className="mt-[4vh]">
            {valido ? (
              <EmailButton email={email} assunto={duvidas.assunto} className={botaoCopiar} />
            ) : (
              <span role="link" aria-disabled="true" title="E-mail do suporte ainda não configurado" className={`${botaoClasse} cursor-default`}>
                <Icon name="mail" className="size-6" />
                {duvidas.botao}
                <span className="sr-only"> (e-mail ainda não configurado)</span>
              </span>
            )}
            {!valido && <PendingNote>e-mail do suporte (painel → 10 · Dúvidas)</PendingNote>}
          </div>
        </div>

        <div className="card relative overflow-hidden p-0">
          <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-lime/10 blur-3xl" />
          <h3 className="card-title border-b border-white/10 px-6 py-4 text-lime">{duvidas.cartaoTitulo}</h3>
          <ul className="divide-y divide-white/10 px-6">
            {duvidas.passos.map((passo) => (
              <li key={passo.titulo} className="flex items-center gap-4 py-[2.2vh]">
                <span className="icon-box size-11 shrink-0">
                  <Icon name={passo.icone} className="size-5" />
                </span>
                <div>
                  <p className="card-title">{passo.titulo}</p>
                  <p className="card-text mt-0.5">{passo.texto}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-3 bg-lime px-6 py-3.5 font-bold text-lime-ink">
            <Icon name="clock" className="size-6 shrink-0" strokeWidth={2.2} />
            {duvidas.prazo}
          </p>
        </div>
      </div>
    </Section>
  );
}
