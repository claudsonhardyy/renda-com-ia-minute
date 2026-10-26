"use client";

import type { TipItem } from "@/content/site";
import { Icon } from "./Icon";
import { usePending } from "./Pending";
import { CarouselArrow } from "./ui";
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

// Carrossel de dicas de gravação: imagem com setas dos dois lados e, ao lado, um painel de texto
// que troca junto com a imagem (título e descrição de cada dica, editáveis no painel).
// Sem reprodução automática, para dar tempo de ler.
export function TipsCarousel({ items: all, hint }: { items: TipItem[]; hint: string[] }) {
  const showPending = usePending();
  const items = all.filter((it) => it.image.src || showPending);
  const { index, goTo, prev, next, regionProps } = useCarousel(items.length);
  if (items.length === 0) return null;
  const item = items[index];
  const pending = !item.image.src;
  const many = items.length > 1;

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Dicas de gravação"
      className="card grid items-center gap-6 p-4 outline-offset-8 sm:p-6 lg:grid-cols-[1.45fr_1fr] lg:gap-8"
      {...regionProps}
    >
      <div>
        <div className="relative">
          <div key={index} className="relative animate-[fade_250ms_ease-out] overflow-hidden rounded-2xl border border-lime/40">
            {pending ? (
              <div className="grid aspect-[503/240] max-h-[calc(100dvh-20rem)] w-full place-items-center bg-amber-300/5 p-6 text-center text-amber-200">
                Imagem da dica {index + 1} pendente
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image.src}
                alt={item.image.alt}
                className="block aspect-[503/240] max-h-[calc(100dvh-20rem)] w-full object-cover"
              />
            )}
            <StatusBadge status={item.status} />
          </div>
          {many && (
            <>
              <CarouselArrow direction="prev" label="Dica anterior" onClick={prev} className="absolute top-1/2 left-0 -translate-x-1/3 -translate-y-1/2" />
              <CarouselArrow direction="next" label="Próxima dica" onClick={next} className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2" />
            </>
          )}
        </div>
        {many && (
          <div className="mt-4 flex justify-center gap-3">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para a dica ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-3 rounded-full transition-all ${i === index ? "w-8 bg-lime" : "w-3 border-2 border-lime/70 hover:bg-lime/40"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Painel de texto sincronizado com a imagem atual */}
      <div aria-live="polite" aria-atomic="true">
        <span className="inline-block rounded-lg border border-lime/60 bg-lime/10 px-3 py-1 text-sm font-semibold text-lime">
          Dica {index + 1} de {items.length}
        </span>
        <div key={index} className="animate-[fade_250ms_ease-out]">
          {pending ? (
            <p className="mt-4 rounded-md border border-dashed border-amber-300/60 bg-amber-300/10 p-4 text-amber-200">
              Pendente: título e descrição da dica {index + 1} (painel → 7 · Dicas de gravação).
            </p>
          ) : (
            <div className="mt-4 flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-lime text-lime-ink">
                <Icon name="camera" className="size-6" strokeWidth={2} />
              </span>
              <div>
                <h3 className="text-2xl font-bold">{item.titulo}</h3>
                <p className="page-sub mt-2 text-white/85">{item.descricao}</p>
              </div>
            </div>
          )}
        </div>
        {many && (
          <button type="button" onClick={next} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-lime">
            {hint[0]} <span className="text-lime">{hint[1]}</span>
            <Icon name="arrowRight" className="size-4 text-lime" />
          </button>
        )}
      </div>
    </div>
  );
}
