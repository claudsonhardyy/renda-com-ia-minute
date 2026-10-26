"use client";

import type { AppCarouselItem } from "@/content/site";
import { Icon } from "./Icon";
import { PhoneFrame } from "./ui";
import { usePending } from "./Pending";
import { useCarousel } from "./useCarousel";

const arrowClass =
  "grid size-14 shrink-0 place-items-center rounded-full border border-lime/60 text-white transition hover:bg-lime/10 hover:text-lime active:scale-95";

// Carrossel do app MINUTE: a imagem do celular e o texto ao lado mudam juntos.
export function AppCarousel({ items: all }: { items: AppCarouselItem[] }) {
  // Itens sem imagem ainda não foram configurados: em produção ficam de fora;
  // em desenvolvimento aparecem como "pendente" para lembrar o que falta.
  const showPending = usePending();
  const items = all.filter((it) => it.image.src || showPending);
  const total = all.length;
  const { index, goTo, prev, next, regionProps } = useCarousel(items.length);
  if (items.length === 0) return null;
  const item = items[index];
  const pending = !item.image.src;

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Telas do aplicativo MINUTE"
      className="mt-12 grid items-center gap-10 rounded-3xl outline-offset-8 md:grid-cols-[1fr_1fr] md:gap-0"
      {...regionProps}
    >
      <div className="flex items-center justify-center gap-3 sm:gap-6">
        <button type="button" onClick={prev} aria-label="Imagem anterior do aplicativo" className={arrowClass}>
          <Icon name="chevronLeft" />
        </button>
        <PhoneFrame className="w-[min(58vw,260px)]">
          <div className="aspect-[240/477]">
            {pending ? (
              <div className="grid h-full place-items-center p-6 text-center text-sm text-amber-200">
                Imagem {index + 1} pendente
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={item.image.src} src={item.image.src} alt={item.image.alt} className="h-full w-full object-cover object-top" />
            )}
          </div>
        </PhoneFrame>
        <button type="button" onClick={next} aria-label="Próxima imagem do aplicativo" className={arrowClass}>
          <Icon name="chevronRight" />
        </button>
      </div>

      <div className="md:border-l md:border-white/15 md:pl-10" aria-live="polite">
        <span className="inline-block rounded-lg border border-lime/60 bg-lime/10 px-3 py-1 text-sm font-semibold text-lime">
          Passo {index + 1} de {showPending ? total : items.length}
        </span>
        {pending ? (
          <p className="mt-5 rounded-md border border-dashed border-amber-300/60 bg-amber-300/10 p-4 text-amber-200">
            Pendente: título, texto e imagem do passo {index + 1} (app_minute_carousel).
          </p>
        ) : (
          <>
            <h3 className="mt-5 text-3xl font-bold">{item.titulo}</h3>
            <p className="mt-5 max-w-sm text-xl leading-relaxed text-white/85">{item.texto}</p>
            {item.destaque && (
              <div className="card mt-8 flex items-center gap-5 p-5">
                <span className="icon-box size-14 shrink-0">
                  <Icon name="video" />
                </span>
                <p className="text-white/90">{item.destaque}</p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex justify-center gap-3 md:col-span-2 md:mt-8 md:justify-start md:pl-24">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir para o passo ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={`h-2.5 rounded-full transition-all ${i === index ? "w-7 bg-lime" : "w-2.5 bg-white/30 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}
