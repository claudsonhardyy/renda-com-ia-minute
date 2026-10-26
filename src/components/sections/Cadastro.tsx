import type { SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { PendingNote } from "../Pending";
import { ExternalLink, Heading, NumberBadge, PhoneFrame, Section, Tag } from "../ui";

function Step({ n, icon, children }: { n: number; icon: string; children: React.ReactNode }) {
  return (
    <li className="card relative flex gap-4 p-5 sm:gap-5 sm:p-6">
      <NumberBadge n={n} className="size-11 text-xl sm:size-12 sm:text-2xl" />
      <span className="icon-box hidden size-14 shrink-0 text-white sm:grid">
        <Icon name={icon} className="size-6" />
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </li>
  );
}

// Referência: 2- Página de cadastro
export function Cadastro({ c }: { c: SiteContent }) {
  const { cadastro, links } = c;
  const { passo1, passo2, passo3, passo4, passo5 } = cadastro;
  return (
    <Section id="cadastro-hub">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <Tag icon="checkCircle">{cadastro.selo}</Tag>
          <Heading white={cadastro.tituloBranco} green={cadastro.tituloVerde} inline />
          <p className="mt-4 max-w-sm text-xl text-white/85">{cadastro.subtitulo}</p>

          <ol className="mt-8 space-y-4">
            <Step n={1} icon="link">
              <h3 className="text-lg font-bold">{passo1.titulo}</h3>
              <p className="mt-1 text-white/80">{passo1.texto}</p>
              <ExternalLink
                href={links.url_hub_cadastro}
                pendingLabel="Link de cadastro da Hub ainda não configurado"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-lime px-5 py-3 font-bold text-lime-ink transition hover:brightness-105"
              >
                {passo1.botao}
                <Icon name="arrowRight" className="size-5" />
              </ExternalLink>
              {!links.url_hub_cadastro && <PendingNote>url_hub_cadastro (link da Hub com o seu código)</PendingNote>}
            </Step>

            <Step n={2} icon="file">
              <h3 className="text-lg font-bold">{passo2.titulo}</h3>
              <p className="mt-1 text-white/80">{passo2.texto}</p>
              <div className="mt-4 rounded-xl border-2 border-lime/80 p-3">
                <p className="text-sm text-white/80">{passo2.campoRotulo}</p>
                <p className="mt-2 rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 font-medium">
                  {passo2.campoValor}
                </p>
              </div>
            </Step>

            <Step n={3} icon="user">
              <h3 className="text-lg font-bold">{passo3.titulo}</h3>
              <p className="mt-1 text-white/80">{passo3.texto}</p>
            </Step>

            <Step n={4} icon="mail">
              <h3 className="text-lg font-bold">{passo4.titulo}</h3>
              <p className="mt-1 text-white/80">{passo4.texto}</p>
            </Step>

            <Step n={5} icon="download">
              <h3 className="text-lg font-bold">{passo5.titulo}</h3>
              <p className="mt-1 text-white/80">{passo5.texto}</p>
            </Step>
          </ol>
        </div>

        <div className="flex flex-col items-center gap-8 lg:pt-6">
          <PhoneFrame className="w-[min(82vw,330px)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cadastro.cadastro_phone_image.src}
              alt={cadastro.cadastro_phone_image.alt}
              className="block aspect-[303/724] w-full object-cover object-top"
            />
          </PhoneFrame>
          <div className="card flex w-full max-w-sm items-center gap-4 p-5">
            <Icon name="alert" className="size-9 shrink-0 text-lime" />
            <p className="font-semibold">{cadastro.aviso}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
