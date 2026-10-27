"use client";

import type { AppCarouselItem } from "@/content/site";
import { Icon } from "./Icon";
import { usePending } from "./Pending";
import { CarouselArrow, PhoneFrame } from "./ui";
import { StepDots } from "./StepDots";
import { useCarousel } from "./useCarousel";

// Barra de status do celular (hora, sinal, Wi-Fi e bateria), desenhada por cima de todas as
// telas para parecer um celular de verdade. Tamanhos em cqw acompanham a largura do celular.
function StatusBar() {
  return (
    <div aria-hidden="true" className="flex h-[11cqw] shrink-0 items-center justify-between bg-black px-[8cqw] pt-[1.5cqw] text-white">
      <span className="text-[4.6cqw] font-semibold tracking-tight">19:38</span>
      <span className="flex items-center gap-[1.6cqw]">
        {/* sinal */}
        <svg viewBox="0 0 18 12" className="h-[3.6cqw] w-auto" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="10" y="3" width="3" height="9" rx="0.8" />
          <rect x="15" y="0" width="3" height="12" rx="0.8" />
        </svg>
        {/* Wi-Fi */}
        <svg viewBox="0 0 16 12" className="h-[3.6cqw] w-auto" fill="currentColor">
          <path d="M8 2.2c2.4 0 4.6.9 6.3 2.5l1.3-1.4A10.9 10.9 0 0 0 8 .2 10.9 10.9 0 0 0 .4 3.3l1.3 1.4A9 9 0 0 1 8 2.2zm0 3.8c1.4 0 2.7.5 3.7 1.4L13 6a7.4 7.4 0 0 0-10 0l1.3 1.4c1-.9 2.3-1.4 3.7-1.4zm0 3.7c-.6 0-1.2.2-1.6.6L8 12l1.6-1.7c-.4-.4-1-.6-1.6-.6z" />
        </svg>
        {/* bateria */}
        <svg viewBox="0 0 27 12" className="h-[3.6cqw] w-auto">
          <rect x="0.6" y="0.6" width="22.8" height="10.8" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
          <rect x="2.2" y="2.2" width="16" height="7.6" rx="1.6" fill="currentColor" />
          <path d="M25 4v4c.8-.3 1.4-1.1 1.4-2S25.8 4.3 25 4z" fill="currentColor" fillOpacity="0.45" />
        </svg>
      </span>
    </div>
  );
}

// Carrossel do app MINUTE: ao trocar a imagem do celular, o texto ao lado troca junto
// (cada tela tem seu próprio título, texto e destaque, editáveis no painel).
export function AppCarousel({ items: all, intro }: { items: AppCarouselItem[]; intro: React.ReactNode }) {
  // Itens sem imagem ainda não foram configurados: no site público ficam de fora;
  // em desenvolvimento/pré-visualização aparecem como "pendente".
  const showPending = usePending();
  const items = all.filter((it) => it.image.src || showPending);
  const { index, goTo, prev, next, regionProps } = useCarousel(items.length);
  if (items.length === 0) return <>{intro}</>;
  const item = items[index];
  const pending = !item.image.src;
  const many = items.length > 1;

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_auto_0.95fr] lg:gap-7">
      {intro}

      <div
        role="region"
        aria-roledescription="carrossel"
        aria-label="Telas do aplicativo MINUTE"
        className="flex flex-col items-center gap-3 rounded-3xl outline-offset-8"
        {...regionProps}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <CarouselArrow direction="prev" label="Imagem anterior do aplicativo" onClick={prev} disabled={!many} />
          {/* Proporção = tela do app (≈0,48) + barra de status no topo: a imagem encaixa sem cortes */}
          <PhoneFrame ratio="300/655" className="h-[min(calc(100dvh-8.1rem),820px,125vw)]">
            <div className="@container flex h-full flex-col">
              <StatusBar />
              <div className="relative min-h-0 flex-1">
                {pending ? (
                  <div className="grid h-full place-items-center p-6 text-center text-sm text-amber-200">
                    Imagem {index + 1} pendente
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={item.image.src}
                    src={item.image.src}
                    alt={item.image.alt}
                    className="absolute inset-0 h-full w-full animate-[fade_250ms_ease-out] object-cover object-top"
                  />
                )}
              </div>
            </div>
          </PhoneFrame>
          <CarouselArrow direction="next" label="Próxima imagem do aplicativo" onClick={next} disabled={!many} />
        </div>
        {/* Bolinhas de passo: a verde acesa anda até o passo atual */}
        <StepDots count={items.length} index={index} onSelect={goTo} itemLabel="o passo" />
      </div>

      {/* Texto sincronizado com a imagem atual do celular */}
      <div className="lg:border-l lg:border-white/15 lg:pl-8" aria-live="polite">
        <span className="inline-block rounded-lg border border-lime/60 bg-lime/10 px-3 py-1 text-sm font-semibold text-lime">
          Passo {index + 1} de {items.length}
        </span>
        <div key={index} className="animate-[fade_250ms_ease-out]">
          {pending ? (
            <p className="mt-5 rounded-md border border-dashed border-amber-300/60 bg-amber-300/10 p-4 text-amber-200">
              Pendente: título, texto e imagem do passo {index + 1} (painel → 4 · App MINUTE).
            </p>
          ) : (
            <>
              <h3 className="page-title mt-3 !text-[clamp(1.6rem,min(4.6vh,2.6vw),2.6rem)]">{item.titulo}</h3>
              <p className="page-sub mt-3 max-w-sm">{item.texto}</p>
              {item.destaque && (
                <div className="card mt-[2.5vh] flex items-center gap-4 p-4">
                  <span className="icon-box size-12 shrink-0">
                    <Icon name="video" />
                  </span>
                  <p className="card-text text-white/90">{item.destaque}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
