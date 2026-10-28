import type { SiteContent } from "@/content/site";
import { AppCarousel } from "../AppCarousel";
import { Icon } from "../Icon";
import { ExternalLink, Heading, Section, Tag } from "../ui";

function StoreButton({ href, icon, chamada, nome }: { href: string; icon: string; chamada: string; nome: string }) {
  return (
    <ExternalLink
      href={href}
      pendingLabel={`Link da ${nome} ainda não configurado`}
      className="flex items-center gap-2.5 rounded-xl border-2 border-lime/80 px-3 py-2 whitespace-nowrap transition hover:bg-lime/10"
    >
      <Icon name={icon} className="size-7 shrink-0 text-lime" />
      <span className="flex-1 leading-tight">
        <span className="block text-xs text-white/80">{chamada}</span>
        <span className="block text-base font-bold">{nome}</span>
      </span>
      <Icon name="chevronRight" className="size-5 text-white/80" />
    </ExternalLink>
  );
}

// Modelo do cliente (docs/referencias/v2/4.webp): apresentação, botões das lojas e aviso à esquerda;
// celular com setas no centro; texto do passo (que muda junto com a imagem) à direita.
export function AppMinute({ c }: { c: SiteContent }) {
  const { appMinute, links } = c;
  return (
    <Section id="app-minute" tight>
      <AppCarousel
        items={appMinute.carrossel}
        intro={
          // No celular a apresentação ocupa a tela inteira e termina com o aviso do tutorial abaixo
          <div className="max-lg:flex max-lg:min-h-[calc(100svh-4rem-2rem)] max-lg:flex-col max-lg:justify-center">
            <Tag icon="video">{appMinute.selo}</Tag>
            <Heading white={appMinute.tituloBranco} green={appMinute.tituloVerde} />
            <p className="page-sub mt-3 max-w-md">{appMinute.texto}</p>
            <div className="mt-[2.5vh] flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-black text-2xl font-medium ring-1 ring-white/10">
                M.
              </span>
              <div>
                <p className="text-xl font-light tracking-[0.3em]">MINUTE</p>
                <p className="text-sm text-white/70">{appMinute.slogan}</p>
              </div>
            </div>
            <div className="mt-[2.5vh] grid gap-3 sm:grid-cols-2">
              <StoreButton href={links.url_app_store_minute} icon="apple" {...appMinute.appStore} />
              <StoreButton href={links.url_google_play_minute} icon="googlePlay" {...appMinute.googlePlay} />
            </div>
            <p className="card mt-3 flex items-center gap-3 rounded-xl px-4 py-3">
              <Icon name="alertCircle" className="size-6 shrink-0 text-alert" strokeWidth={2.2} />
              <span className="card-text text-white/85">{appMinute.aviso}</span>
            </p>
            <a
              href="#app-minute-tutorial"
              className="mt-[3svh] flex items-center gap-3 rounded-2xl border border-lime/50 bg-lime/[0.07] px-4 py-3 lg:hidden"
            >
              <span className="grid size-10 shrink-0 animate-bounce place-items-center rounded-full bg-lime text-lime-ink">
                <Icon name="chevronRight" className="size-5 rotate-90" strokeWidth={3} />
              </span>
              <span className="text-sm leading-snug text-white/90">
                <strong className="block text-lime">Logo abaixo: tutorial de cadastro na MINUTE</strong>
                Role para baixo e passe as telas do celular para o lado para ver cada passo.
              </span>
            </a>
          </div>
        }
      />
    </Section>
  );
}
