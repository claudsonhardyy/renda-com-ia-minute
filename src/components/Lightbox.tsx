"use client";

import { useEffect } from "react";
import { Icon } from "./Icon";
import { CarouselArrow } from "./ui";

// Visualização em tela cheia das imagens dos carrosséis: a imagem ocupa o máximo da tela,
// com setas para trocar, Esc/clique fora para fechar e ←/→ no teclado.
export function Lightbox({
  src,
  alt,
  label,
  onClose,
  onPrev,
  onNext,
  many,
}: {
  src: string;
  alt: string;
  label: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  many: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Se o carrossel por trás já tratou a seta (foco dentro dele), não troca duas vezes
      else if (e.defaultPrevented) return;
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = overflow;
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[100] flex animate-[fade_200ms_ease-out] items-center justify-center gap-3 bg-black/90 p-3 backdrop-blur-sm sm:gap-5 sm:p-6"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-lime hover:text-lime-ink"
      >
        <Icon name="x" className="size-6" strokeWidth={2.4} />
      </button>
      <div onClick={(e) => e.stopPropagation()} className="shrink-0">
        <CarouselArrow direction="prev" label="Anterior" onClick={onPrev} disabled={!many} />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={src}
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[calc(100dvh-1.5rem)] min-w-0 max-w-full animate-[fade_200ms_ease-out] rounded-2xl object-contain sm:max-h-[calc(100dvh-3rem)]"
      />
      <div onClick={(e) => e.stopPropagation()} className="shrink-0">
        <CarouselArrow direction="next" label="Próxima" onClick={onNext} disabled={!many} />
      </div>
    </div>
  );
}
