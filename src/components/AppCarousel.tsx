"use client";

import type { AppCarouselItem } from "@/content/site";
import { Icon } from "./Icon";
import { usePending } from "./Pending";
import { CarouselArrow, PhoneFrame } from "./ui";
import { useCarousel } from "./useCarousel";

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
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
      {intro}

      <div
        role="region"
        aria-roledescription="carrossel"
        aria-label="Telas do aplicativo MINUTE"
        className="flex flex-col items-center gap-4 rounded-3xl outline-offset-8"
        {...regionProps}
      >
        <div className="flex items-center gap-3 sm:gap-5">
          {many && <CarouselArrow direction="prev" label="Imagem anterior do aplicativo" onClick={prev} />}
          <PhoneFrame ratio="240/477" className="h-[min(calc(100dvh-10rem),760px)]">
            {pending ? (
              <div className="grid h-full place-items-center p-6 text-center text-sm text-amber-200">
                Imagem {index + 1} pendente
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={item.image.src} src={item.image.src} alt={item.image.alt} className="h-full w-full animate-[fade_250ms_ease-out] object-cover object-top" />
            )}
          </PhoneFrame>
          {many && <CarouselArrow direction="next" label="Próxima imagem do aplicativo" onClick={next} />}
        </div>
        {many && (
          <div className="flex justify-center gap-2.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para o passo ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-lime" : "w-2.5 bg-white/35 hover:bg-white/70"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Texto sincronizado com a imagem atual do celular */}
      <div className="lg:border-l lg:border-white/15 lg:pl-10" aria-live="polite">
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
              <h3 className="mt-4 text-3xl font-bold">{item.titulo}</h3>
              <p className="page-sub mt-4 max-w-sm text-white/85">{item.texto}</p>
              {item.destaque && (
                <div className="card mt-6 flex items-center gap-4 p-4">
                  <span className="icon-box size-12 shrink-0">
                    <Icon name="video" />
                  </span>
                  <p className="text-white/90">{item.destaque}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
