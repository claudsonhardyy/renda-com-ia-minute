"use client";

import { useCallback, useRef, useState } from "react";

// Estado único do índice ativo (Guia, seção 15): imagem, texto e indicadores derivam dele.
// Loop circular; setas do teclado quando o carrossel tem foco; deslize por toque.
export function useCarousel(count: number) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  const wrap = useCallback((i: number) => ((i % count) + count) % count, [count]);
  const goTo = useCallback((i: number) => setIndex(wrap(i)), [wrap]);
  const prev = useCallback(() => setIndex((i) => wrap(i - 1)), [wrap]);
  const next = useCallback(() => setIndex((i) => wrap(i + 1)), [wrap]);

  const regionProps = {
    tabIndex: 0,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    },
    onTouchStart: (e: React.TouchEvent) => {
      touchX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      touchX.current = null;
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    },
  };

  return { index, goTo, prev, next, regionProps };
}
