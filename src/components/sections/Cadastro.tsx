import type { SiteContent } from "@/content/site";
import { Connector } from "../Connector";
import { Icon } from "../Icon";
import { PendingNote } from "../Pending";
import { ExternalLink, Heading, NumberBadge, PhoneFrame, Section } from "../ui";

function Step({ n, children, className = "" }: { n: number; children: React.ReactNode; className?: string }) {
  return (
    <li className={`card flex gap-3 rounded-xl px-3.5 py-[1.5vh] ${className}`}>
      <NumberBadge n={n} className="size-7 text-sm" />
      <div className="min-w-0 flex-1">{children}</div>
    </li>
  );
}

// Modelo do cliente (docs/referencias/v2/2.webp): passos 1 e 2 na primeira linha (o 2, com o
// código de indicação, em destaque), passos 3–5 na segunda, aviso embaixo e o celular grande à direita.
export function Cadastro({ c }: { c: SiteContent }) {
  const { cadastro, links } = c;
  const { passo1, passo2, passo3, passo4, passo5 } = cadastro;
  return (
    <Section id="cadastro-hub">
      <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
        <div>
          <Heading white={cadastro.tituloBranco} green={cadastro.tituloVerde} inline />
          <p className="page-sub mt-1">{cadastro.subtitulo}</p>

          <ol className="mt-[2vh] grid gap-2.5 md:grid-cols-[1fr_1.12fr]">
            <Step n={1}>
              <h3 className="step-title">{passo1.titulo}</h3>
              <p className="step-text mt-0.5">{passo1.texto}</p>
              <ExternalLink
                href={links.url_hub_cadastro}
                pendingLabel="Link de cadastro da Hub ainda não configurado"
                className="mt-2.5 inline-flex items-center gap-2 rounded-lg bg-lime px-3.5 py-1.5 text-sm font-bold text-lime-ink transition hover:brightness-105"
              >
                {passo1.botao}
                <Icon name="arrowRight" className="size-4" />
              </ExternalLink>
              {!links.url_hub_cadastro && <PendingNote>url_hub_cadastro (link da Hub com o seu código)</PendingNote>}
            </Step>

            {/* Passo 2 em destaque: é onde a pessoa insere o seu código */}
            <Step n={2} className="glow border-2 border-lime">
              <h3 className="step-title">{passo2.titulo}</h3>
              <p className="step-text mt-0.5">{passo2.texto}</p>
              <div id="codigo-passo2" className="mt-2 rounded-lg border border-white/25 bg-black/25 px-3 py-1.5">
                <p className="text-xs text-white/75">{passo2.campoRotulo}</p>
                <p className="text-base font-semibold tracking-wide text-white">{passo2.campoValor}</p>
              </div>
              <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-snug text-lime">
                <Icon name="alertCircle" className="mt-px size-4 shrink-0" />
                {passo2.alerta}
              </p>
            </Step>
          </ol>

          <ol start={3} className="mt-2.5 grid gap-2.5 md:grid-cols-3">
            <Step n={3}>
              <h3 className="step-title">{passo3.titulo}</h3>
              <p className="step-text mt-0.5">{passo3.texto}</p>
            </Step>
            <Step n={4}>
              <h3 className="step-title">{passo4.titulo}</h3>
              <p className="step-text mt-0.5">{passo4.texto}</p>
            </Step>
            <Step n={5}>
              <h3 className="step-title">{passo5.titulo}</h3>
              <p className="step-text mt-0.5">{passo5.texto}</p>
            </Step>
          </ol>

          <p className="card mt-2.5 flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-sm font-semibold">
            <Icon name="alert" className="size-5 shrink-0 text-lime" />
            {cadastro.aviso}
          </p>
        </div>

        <PhoneFrame ratio="284/606" className="mx-auto h-[min(calc(100dvh-7.4rem),800px)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cadastro.cadastro_phone_image.src}
            alt={cadastro.cadastro_phone_image.alt}
            className="block h-full w-full object-cover object-top"
          />
          {/* Destaque do campo de código na tela da Hub (posição relativa à imagem da tela) */}
          <div
            id="codigo-celular"
            className="absolute top-[29.4%] left-[4%] h-[13.8%] w-[92%] rounded-xl border-2 border-lime shadow-[0_0_24px_rgb(166_247_116/0.55)]"
          />
        </PhoneFrame>
        <Connector fromId="codigo-celular" toId="codigo-passo2" />
      </div>
    </Section>
  );
}
