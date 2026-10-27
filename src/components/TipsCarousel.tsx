"use client";

import type { TipItem } from "@/content/site";
import { Icon } from "./Icon";
import { usePending } from "./Pending";
import { CarouselArrow } from "./ui";
import { StepDots } from "./StepDots";
import { useCarousel } from "./useCarousel";

// Carrossel de dicas de gravação: cada dica é uma imagem pronta do cliente (número, título,
// fotos, ícones e textos), mostrada inteira — sem cortes nem distorção — no maior tamanho que
// cabe no quadro da página, com setas dos dois lados. Sem reprodução automática.
export function TipsCarousel({ items: all, hint }: { items: TipItem[]; hint: string[] }) {
  const showPending = usePending();
  const items = all.filter((it) => it.image.src || showPending);
  const { index, goTo, prev, next, regionProps } = useCarousel(items.length);
  if (items.length === 0) return null;
  const item = items[index];
  const many = items.length > 1;

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Dicas de gravação"
      className="flex flex-col gap-[1.4vh] outline-offset-8 lg:h-full lg:min-h-0"
      {...regionProps}
    >
      <div className="flex min-h-0 items-center gap-3 lg:flex-1 lg:gap-5">
        <div className="hidden sm:block">
          <CarouselArrow direction="prev" label="Dica anterior" onClick={prev} disabled={!many} />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center lg:h-full lg:min-h-0" aria-live="polite">
          {item.image.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.image.src}
              src={item.image.src}
              alt={item.image.alt || item.titulo}
              className="block h-auto w-full animate-[slide_350ms_ease-out] lg:max-h-full lg:w-auto lg:max-w-full"
            />
          ) : (
            <div className="grid aspect-[3/1] w-full place-items-center rounded-2xl border border-dashed border-amber-300/60 text-amber-200">
              Imagem da dica {index + 1} pendente (painel → 7 · Dicas de gravação)
            </div>
          )}
        </div>
        <div className="hidden sm:block">
          <CarouselArrow direction="next" label="Próxima dica" onClick={next} disabled={!many} />
        </div>
      </div>

      {/* Contador + bolinhas (a verde acesa anda até a dica atual) + setas no celular */}
      <div className="flex shrink-0 flex-wrap items-center justify-center gap-x-5 gap-y-2">
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
          <button type="button" onClick={next} className="hidden items-center gap-1.5 text-sm font-semibold text-white/85 hover:text-lime sm:inline-flex">
            {hint[0]} <span className="text-lime">{hint[1]}</span>
            <Icon name="arrowRight" className="size-4 text-lime" />
          </button>
        )}
      </div>
    </div>
  );
}
