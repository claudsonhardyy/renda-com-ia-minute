"use client";

import { useState } from "react";
import type { TipItem } from "@/content/site";
import { Icon } from "./Icon";
import { Lightbox } from "./Lightbox";
import { usePending } from "./Pending";
import { CarouselArrow } from "./ui";
import { StepDots } from "./StepDots";
import { useCarousel } from "./useCarousel";

function StatusBadge({ status }: { status: TipItem["status"] }) {
  if (!status) return null;
  const ok = status === "correto";
  return (
    <span
      className={`absolute top-3 left-3 grid size-11 place-items-center rounded-full ring-4 ${
        ok ? "bg-lime/90 text-lime-ink ring-lime/40" : "bg-red-500/90 text-white ring-red-500/30"
      }`}
    >
      <Icon name={ok ? "check" : "x"} className="size-6" strokeWidth={3} />
      <span className="sr-only">{ok ? "Correto" : "Incorreto"}</span>
    </span>
  );
}

// Carrossel de dicas de gravação: cada imagem já traz o título, os textos e os ícones da dica
// (idênticas às enviadas pelo cliente) e ocupa o máximo da página, com setas dos dois lados.
// Clicar na imagem abre em tela cheia. Sem reprodução automática, para dar tempo de ler.
export function TipsCarousel({ items: all, hint }: { items: TipItem[]; hint: string[] }) {
  const showPending = usePending();
  const items = all.filter((it) => it.image.src || showPending);
  const { index, goTo, prev, next, regionProps } = useCarousel(items.length);
  const [zoom, setZoom] = useState(false);
  if (items.length === 0) return null;
  const item = items[index];
  const pending = !item.image.src;
  const many = items.length > 1;

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Dicas de gravação"
      className="flex flex-col items-center gap-3 outline-offset-8"
      {...regionProps}
    >
      <div className="flex w-full items-center justify-center gap-3 lg:gap-5">
        <div className="hidden sm:block">
          <CarouselArrow direction="prev" label="Dica anterior" onClick={prev} disabled={!many} />
        </div>
        {/* Quadro de proporção fixa: as imagens têm proporções quase iguais e ficam inteiras, sem corte */}
        <div className="relative aspect-[1.6] w-full min-w-0 sm:w-auto sm:h-[min(calc(100dvh-11rem-6vh),43rem,calc((100vw-12rem)/1.6))]">
          {pending ? (
            <div className="grid h-full w-full place-items-center rounded-2xl border border-dashed border-amber-300/60 bg-amber-300/5 p-6 text-center text-amber-200">
              Imagem da dica {index + 1} pendente (painel → 7 · Dicas de gravação)
            </div>
          ) : (
            <button type="button" onClick={() => setZoom(true)} aria-label={`Ampliar a dica ${index + 1} em tela cheia`} className="group block h-full w-full cursor-zoom-in">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={`img-${index}`}
                src={item.image.src}
                alt={item.image.alt || item.titulo}
                className="h-full w-full animate-[slide_350ms_ease-out] object-contain"
              />
              <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-lime text-lime-ink opacity-90 shadow-lg transition group-hover:scale-110">
                <Icon name="expand" className="size-5" strokeWidth={2.4} />
              </span>
            </button>
          )}
          <StatusBadge status={item.status} />
        </div>
        <div className="hidden sm:block">
          <CarouselArrow direction="next" label="Próxima dica" onClick={next} disabled={!many} />
        </div>
      </div>

      {/* Contador + bolinhas (a verde acesa anda até a dica atual) + setas no celular */}
      <div className="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-live="polite">
        <span className="rounded-lg border border-lime/60 bg-lime/10 px-3 py-0.5 text-sm font-semibold text-lime">
          Dica {index + 1} de {items.length}
        </span>
        <div className="flex items-center gap-4">
          <div className="sm:hidden">
            <CarouselArrow direction="prev" label="Dica anterior" onClick={prev} disabled={!many} />
          </div>
          <StepDots count={items.length} index={index} onSelect={goTo} itemLabel="a dica" />
          <div className="sm:hidden">
            <CarouselArrow direction="next" label="Próxima dica" onClick={next} disabled={!many} />
          </div>
        </div>
        {many && (
          <button
            type="button"
            onClick={next}
            className="hidden items-center gap-1.5 text-sm font-semibold text-white/85 hover:text-lime sm:inline-flex"
          >
            {hint[0]} <span className="text-lime">{hint[1]}</span>
            <Icon name="arrowRight" className="size-4 text-lime" />
          </button>
        )}
      </div>

      {zoom && !pending && (
        <Lightbox
          src={item.image.src}
          alt={item.image.alt || item.titulo}
          label={`Dica ${index + 1}: ${item.titulo}`}
          onClose={() => setZoom(false)}
          onPrev={prev}
          onNext={next}
          many={many}
        />
      )}
    </div>
  );
}
