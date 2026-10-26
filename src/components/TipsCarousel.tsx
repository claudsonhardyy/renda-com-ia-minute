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
      className={`absolute top-2.5 left-2.5 grid size-11 place-items-center rounded-full ring-4 ${
        ok ? "bg-lime/90 text-lime-ink ring-lime/40" : "bg-red-500/90 text-white ring-red-500/30"
      }`}
    >
      <Icon name={ok ? "check" : "x"} className="size-6" strokeWidth={3} />
      <span className="sr-only">{ok ? "Correto" : "Incorreto"}</span>
    </span>
  );
}

function TipCard({ item, n }: { item: TipItem; n: number }) {
  if (!item.image.src) {
    return (
      <div className="grid aspect-[503/240] place-items-center rounded-2xl border border-dashed border-amber-300/60 bg-amber-300/5 p-6 text-center text-amber-200">
        Pendente: imagem, título e descrição da dica {n} (painel → 7 · Dicas de gravação)
      </div>
    );
  }
  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-lime/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image.src} alt={item.image.alt} className="aspect-[503/240] max-h-[34vh] w-full object-cover" />
        <StatusBadge status={item.status} />
      </div>
      {/* Texto que acompanha a imagem: muda junto a cada dica */}
      <div className="mt-5 flex items-start gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-lime text-lime-ink">
          <Icon name="camera" className="size-7" strokeWidth={2} />
        </span>
        <div>
          <h3 className="text-2xl font-bold">{item.titulo}</h3>
          <p className="mt-1.5 text-white/85">{item.descricao}</p>
        </div>
      </div>
    </>
  );
}

// Miniatura da dica vizinha (como nas referências): clicável, leva àquela dica.
function Peek({ item, onClick, label }: { item: TipItem; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="card hidden w-28 shrink-0 self-stretch overflow-hidden opacity-45 transition hover:opacity-80 xl:block"
    >
      {item.image.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image.src} alt="" className="h-full w-full object-cover" />
      ) : (
        <span className="block h-full bg-amber-300/5" />
      )}
    </button>
  );
}

// Carrossel de dicas de gravação: sem reprodução automática; imagem, selo, título e texto mudam juntos.
export function TipsCarousel({ items: all, hint }: { items: TipItem[]; hint: string[] }) {
  const showPending = usePending();
  const items = all.filter((it) => it.image.src || showPending);
  const { index, goTo, prev, next, regionProps } = useCarousel(items.length);
  if (items.length === 0) return null;
  const many = items.length > 1;
  const at = (d: number) => items[(index + d + items.length) % items.length];

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Dicas de gravação"
      className="rounded-3xl outline-offset-8"
      {...regionProps}
    >
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        {many && <CarouselArrow direction="prev" label="Dica anterior" onClick={prev} />}
        {many && <Peek item={at(-1)} onClick={prev} label="Ver dica anterior" />}

        <div className="card w-full max-w-xl p-4 sm:p-6">
          <div aria-live="polite" aria-atomic="true">
            <p className="sr-only">
              Dica {index + 1} de {items.length}
            </p>
            <div key={index} className="animate-[fade_250ms_ease-out]">
              <TipCard item={items[index]} n={index + 1} />
            </div>
          </div>
          {many && (
            <div className="mt-5 flex justify-center gap-3">
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

        {many && <Peek item={at(1)} onClick={next} label="Ver próxima dica" />}
        {many && (
          <div className="flex shrink-0 flex-col items-center gap-2">
            <CarouselArrow direction="next" label="Próxima dica" onClick={next} />
            <p className="hidden text-center text-sm leading-tight font-semibold sm:block" aria-hidden="true">
              {hint[0]}
              <br />
              <span className="text-lime">{hint[1]}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
