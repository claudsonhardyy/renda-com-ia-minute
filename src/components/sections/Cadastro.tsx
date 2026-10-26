import type { SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { PendingNote } from "../Pending";
import { ExternalLink, Heading, NumberBadge, PhoneFrame, Section } from "../ui";

function Step({ n, children, className = "" }: { n: number; children: React.ReactNode; className?: string }) {
  return (
    <li className={`card flex gap-3 p-3 ${className}`}>
      <NumberBadge n={n} className="size-8 text-base" />
      <div className="min-w-0 flex-1 text-sm">{children}</div>
    </li>
  );
}

// Referência: 2- Página de cadastro — passos compactos + celular grande, tudo na mesma tela.
// O campo do código de indicação é o destaque da página.
export function Cadastro({ c }: { c: SiteContent }) {
  const { cadastro, links } = c;
  const { passo1, passo2, passo3, passo4, passo5 } = cadastro;
  return (
    <Section id="cadastro-hub">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-10">
        <div>
          <Heading white={cadastro.tituloBranco} green={cadastro.tituloVerde} inline />
          <p className="page-sub mt-2 text-white/85">{cadastro.subtitulo}</p>

          <ol className="mt-5 grid gap-2.5 md:grid-cols-2">
            <Step n={1}>
              <h3 className="font-bold">{passo1.titulo}</h3>
              <p className="mt-0.5 text-white/80">{passo1.texto}</p>
              <ExternalLink
                href={links.url_hub_cadastro}
                pendingLabel="Link de cadastro da Hub ainda não configurado"
                className="mt-2 inline-flex items-center gap-2 rounded-lg bg-lime px-3.5 py-2 font-bold text-lime-ink transition hover:brightness-105"
              >
                {passo1.botao}
                <Icon name="arrowRight" className="size-4" />
              </ExternalLink>
              {!links.url_hub_cadastro && <PendingNote>url_hub_cadastro (link da Hub com o seu código)</PendingNote>}
            </Step>

            {/* Passo 2 em destaque: é onde a pessoa insere o seu código */}
            <Step n={2} className="border-lime/70 bg-lime/[0.06] md:row-span-2">
              <h3 className="font-bold">{passo2.titulo}</h3>
              <p className="mt-0.5 text-white/80">{passo2.texto}</p>
              <div className="glow mt-3 rounded-xl border-2 border-lime bg-black/30 px-4 py-3">
                <p className="text-xs font-semibold tracking-wide text-lime uppercase">{passo2.campoRotulo}</p>
                <p className="mt-1 text-xl font-extrabold tracking-wide sm:text-2xl">{passo2.campoValor}</p>
              </div>
            </Step>

            <Step n={3}>
              <h3 className="font-bold">{passo3.titulo}</h3>
              <p className="mt-0.5 text-white/80">{passo3.texto}</p>
            </Step>

            <Step n={4}>
              <h3 className="font-bold">{passo4.titulo}</h3>
              <p className="mt-0.5 text-white/80">{passo4.texto}</p>
            </Step>

            <Step n={5}>
              <h3 className="font-bold">{passo5.titulo}</h3>
              <p className="mt-0.5 text-white/80">{passo5.texto}</p>
            </Step>
          </ol>

          <p className="mt-2.5 flex items-center gap-2.5 rounded-lg border border-lime/40 px-3 py-2 text-sm font-semibold">
            <Icon name="alert" className="size-5 shrink-0 text-lime" />
            {cadastro.aviso}
          </p>
        </div>

        <PhoneFrame ratio="303/724" className="mx-auto h-[min(calc(100dvh-7rem),780px)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cadastro.cadastro_phone_image.src}
            alt={cadastro.cadastro_phone_image.alt}
            className="block h-full w-full object-cover object-top"
          />
        </PhoneFrame>
      </div>
    </Section>
  );
}
