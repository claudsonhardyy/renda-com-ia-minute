import type { SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { PendingNote } from "../Pending";
import { ExternalLink, Heading, NumberBadge, PhoneFrame, Section, Tag } from "../ui";

function Step({ n, icon, children }: { n: number; icon: string; children: React.ReactNode }) {
  return (
    <li className="card flex gap-4 p-3.5">
      <NumberBadge n={n} className="size-10 text-lg" />
      <span className="icon-box hidden size-11 shrink-0 text-white sm:grid">
        <Icon name={icon} className="size-5" />
      </span>
      <div className="min-w-0 flex-1 text-sm">{children}</div>
    </li>
  );
}

// Referência: 2- Página de cadastro — 5 passos em duas colunas + celular, tudo na mesma tela.
export function Cadastro({ c }: { c: SiteContent }) {
  const { cadastro, links } = c;
  const { passo1, passo2, passo3, passo4, passo5 } = cadastro;
  return (
    <Section id="cadastro-hub">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-10">
        <div>
          <Tag icon="checkCircle">{cadastro.selo}</Tag>
          <Heading white={cadastro.tituloBranco} green={cadastro.tituloVerde} inline />
          <p className="page-sub mt-3 text-white/85">{cadastro.subtitulo}</p>

          <ol className="mt-5 grid gap-3 md:grid-cols-2">
            <Step n={1} icon="link">
              <h3 className="text-base font-bold">{passo1.titulo}</h3>
              <p className="mt-1 text-white/80">{passo1.texto}</p>
              <ExternalLink
                href={links.url_hub_cadastro}
                pendingLabel="Link de cadastro da Hub ainda não configurado"
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-lime px-4 py-2.5 font-bold text-lime-ink transition hover:brightness-105"
              >
                {passo1.botao}
                <Icon name="arrowRight" className="size-5" />
              </ExternalLink>
              {!links.url_hub_cadastro && <PendingNote>url_hub_cadastro (link da Hub com o seu código)</PendingNote>}
            </Step>

            <Step n={2} icon="file">
              <h3 className="text-base font-bold">{passo2.titulo}</h3>
              <p className="mt-1 text-white/80">{passo2.texto}</p>
              <div className="mt-2 rounded-lg border-2 border-lime/80 px-3 py-2">
                <p className="text-xs text-white/70">{passo2.campoRotulo}</p>
                <p className="mt-1 font-semibold">{passo2.campoValor}</p>
              </div>
            </Step>

            <Step n={3} icon="user">
              <h3 className="text-base font-bold">{passo3.titulo}</h3>
              <p className="mt-1 text-white/80">{passo3.texto}</p>
            </Step>

            <Step n={4} icon="mail">
              <h3 className="text-base font-bold">{passo4.titulo}</h3>
              <p className="mt-1 text-white/80">{passo4.texto}</p>
            </Step>

            <Step n={5} icon="download">
              <h3 className="text-base font-bold">{passo5.titulo}</h3>
              <p className="mt-1 text-white/80">{passo5.texto}</p>
            </Step>

            <li className="card flex items-center gap-4 border-lime/60 p-4">
              <Icon name="alert" className="size-9 shrink-0 text-lime" />
              <p className="font-semibold">{cadastro.aviso}</p>
            </li>
          </ol>
        </div>

        <PhoneFrame ratio="303/724" className="mx-auto h-[min(76vh,640px)]">
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
