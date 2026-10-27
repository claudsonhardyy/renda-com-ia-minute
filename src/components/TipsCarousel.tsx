"use client";

import type { TipItem } from "@/content/site";
import { Icon } from "./Icon";
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
// (idênticas às enviadas pelo cliente). À esquerda, a lista numerada das dicas acompanha a
// imagem atual e também serve de atalho; à direita, a imagem grande com setas dos dois lados.
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
      className="grid items-center gap-6 outline-offset-8 lg:grid-cols-[19.5rem_auto] lg:justify-center lg:gap-8"
      {...regionProps}
    >
      {/* Lista das dicas (computador): a atual fica destacada, com o resumo logo abaixo */}
      <div className="hidden flex-col lg:flex" aria-live="polite">
        <span className="self-start rounded-lg border border-lime/60 bg-lime/10 px-3 py-1 text-sm font-semibold text-lime">
          Dica {index + 1} de {items.length}
        </span>
        <ol className="mt-[1.6vh] flex flex-col gap-[0.5vh]">
          {items.map((it, i) => {
            const active = i === index;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={active ? "step" : undefined}
                  className={`flex w-full items-start gap-3 rounded-xl px-3 py-[0.55vh] text-left transition ${
                    active ? "bg-lime/10 ring-1 ring-lime/50" : "hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-extrabold ${
                      active ? "bg-lime text-lime-ink" : "border border-lime/50 text-lime"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0 pt-[3px]">
                    <span className={`block text-[15px] leading-tight ${active ? "font-bold text-white" : "font-medium text-white/70"}`}>
                      {it.titulo || `Dica ${i + 1} (pendente)`}
                    </span>
                    {active && it.descricao && (
                      <span className="mt-1 block animate-[fade_250ms_ease-out] text-[13px] leading-snug text-white/75 [@media(max-height:680px)]:hidden">{it.descricao}</span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex w-full items-center gap-3 lg:w-auto lg:gap-4">
          <div className="hidden sm:block">
            <CarouselArrow direction="prev" label="Dica anterior" onClick={prev} disabled={!many} />
          </div>
          {/* Quadro de proporção fixa: as imagens têm proporções quase iguais e ficam inteiras, sem corte */}
          <div className="relative aspect-[1.6] w-full min-w-0 lg:h-[min(calc(100dvh-14.5rem),28rem)] lg:w-auto">
            {pending ? (
              <div className="grid h-full w-full place-items-center rounded-2xl border border-dashed border-amber-300/60 bg-amber-300/5 p-6 text-center text-amber-200">
                Imagem da dica {index + 1} pendente (painel → 7 · Dicas de gravação)
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`img-${index}`}
                src={item.image.src}
                alt={item.image.alt || item.titulo}
                className="h-full w-full animate-[slide_350ms_ease-out] object-contain drop-shadow-[0_0_30px_rgb(166_247_116/0.12)]"
              />
            )}
            <StatusBadge status={item.status} />
          </div>
          <div className="hidden sm:block">
            <CarouselArrow direction="next" label="Próxima dica" onClick={next} disabled={!many} />
          </div>
        </div>

        {/* Bolinhas (uma por imagem; a verde acesa anda até a dica atual) + setas no celular */}
        <div className="flex w-full items-center justify-center gap-4">
          <div className="sm:hidden">
            <CarouselArrow direction="prev" label="Dica anterior" onClick={prev} disabled={!many} />
          </div>
          <StepDots count={items.length} index={index} onSelect={goTo} itemLabel="a dica" />
          <div className="sm:hidden">
            <CarouselArrow direction="next" label="Próxima dica" onClick={next} disabled={!many} />
          </div>
          {many && (
            <button
              type="button"
              onClick={next}
              className="ml-4 hidden items-center gap-1.5 text-sm font-semibold text-white/85 hover:text-lime sm:inline-flex"
            >
              {hint[0]} <span className="text-lime">{hint[1]}</span>
              <Icon name="arrowRight" className="size-4 text-lime" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
