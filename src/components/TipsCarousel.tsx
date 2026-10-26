"use client";

import type { TipItem } from "@/content/site";
import { Icon } from "./Icon";
import { showPending } from "./ui";
import { useCarousel } from "./useCarousel";

function StatusBadge({ status }: { status: TipItem["status"] }) {
  if (!status) return null;
  const ok = status === "correto";
  return (
    <span
      className={`absolute top-2.5 left-2.5 grid size-12 place-items-center rounded-full ring-4 ${
        ok ? "bg-lime/90 text-lime-ink ring-lime/40" : "bg-red-500/90 text-white ring-red-500/30"
      }`}
    >
      <Icon name={ok ? "check" : "x"} className="size-7" strokeWidth={3} />
      <span className="sr-only">{ok ? "Correto" : "Incorreto"}</span>
    </span>
  );
}

function TipCard({ item, n }: { item: TipItem; n: number }) {
  if (!item.image.src) {
    return (
      <div className="grid aspect-[503/240] place-items-center rounded-2xl border border-dashed border-amber-300/60 bg-amber-300/5 p-6 text-center text-amber-200">
        Pendente: imagem, título e descrição da dica {n} (gravacao_carousel_items)
      </div>
    );
  }
  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-lime/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image.src} alt={item.image.alt} className="aspect-[503/240] w-full object-cover" />
        <StatusBadge status={item.status} />
      </div>
      <div className="mt-6 flex items-start gap-5">
        <span className="grid size-16 shrink-0 place-items-center rounded-full bg-lime text-lime-ink">
          <Icon name="camera" className="size-8" strokeWidth={2} />
        </span>
        <div>
          <h3 className="text-2xl font-bold">{item.titulo}</h3>
          <p className="mt-2 text-white/85">{item.descricao}</p>
        </div>
      </div>
    </>
  );
}

// Carrossel de dicas de gravação: sem reprodução automática; o cartão inteiro muda junto.
export function TipsCarousel({ items: all, hint }: { items: TipItem[]; hint: string[] }) {
  const items = all.filter((it) => it.image.src || showPending);
  const { index, goTo, prev, next, regionProps } = useCarousel(items.length);
  if (items.length === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Dicas de gravação"
      className="relative mt-12 rounded-3xl outline-offset-8"
      {...regionProps}
    >
      <div className="flex items-center justify-center gap-4 md:gap-8">
        <button
          type="button"
          onClick={prev}
          aria-label="Dica anterior"
          className="hidden size-14 shrink-0 place-items-center rounded-full border-2 border-lime/60 text-lime transition hover:bg-lime/10 sm:grid"
        >
          <Icon name="arrowRight" className="size-7 rotate-180" />
        </button>

        <div className="card w-full max-w-xl overflow-hidden p-5 sm:p-8">
          <div aria-live="polite" aria-atomic="true">
            <p className="sr-only">
              Dica {index + 1} de {items.length}
            </p>
            <div key={index} className="animate-[fade_250ms_ease-out]">
              <TipCard item={items[index]} n={index + 1} />
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para a dica ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`size-3 rounded-full border-2 transition ${i === index ? "border-lime bg-lime" : "border-lime/60 hover:bg-lime/30"}`}
              />
            ))}
          </div>
        </div>

        <div className="hidden shrink-0 flex-col items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={next}
            aria-label="Próxima dica"
            className="grid size-14 place-items-center rounded-full border-2 border-lime/60 text-lime transition hover:bg-lime/10"
          >
            <Icon name="arrowRight" className="size-7" />
          </button>
          <p className="text-center font-semibold leading-tight" aria-hidden="true">
            {hint[0]}
            <br />
            <span className="text-lime">{hint[1]}</span>
          </p>
        </div>
      </div>

      {/* No celular, as setas ficam abaixo do cartão (além do deslize). */}
      <div className="mt-6 flex items-center justify-center gap-6 sm:hidden">
        <button type="button" onClick={prev} aria-label="Dica anterior" className="grid size-12 place-items-center rounded-full border-2 border-lime/60 text-lime">
          <Icon name="arrowRight" className="size-6 rotate-180" />
        </button>
        <span className="text-sm text-white/70">
          {hint[0]} <span className="text-lime">{hint[1]}</span>
        </span>
        <button type="button" onClick={next} aria-label="Próxima dica" className="grid size-12 place-items-center rounded-full border-2 border-lime/60 text-lime">
          <Icon name="arrowRight" className="size-6" />
        </button>
      </div>
    </div>
  );
}
