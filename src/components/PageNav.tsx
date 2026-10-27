"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "./Icon";

// Navegação entre as páginas (seções), presente em todos os aparelhos:
// - computador: coluna fixa à direita com seta para cima, uma bolinha por página e seta para baixo;
// - celular/tablet: duas setas pequenas flutuando no canto inferior direito.
// A página atual é detectada pela posição de rolagem; "Como funciona" conta como parte do Início.
export function PageNav({ nav }: { nav: { id: string; label: string }[] }) {
  const [current, setCurrent] = useState(0); // índice entre todas as <section> do <main>
  const [sections, setSections] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const list = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    setSections(list);
    const update = () => {
      const mid = window.innerHeight * 0.45;
      let idx = 0;
      list.forEach((s, i) => {
        if (s.getBoundingClientRect().top <= mid) idx = i;
      });
      setCurrent(idx);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const target = sections[Math.max(0, Math.min(sections.length - 1, i))];
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [sections],
  );

  if (sections.length === 0) return null;
  const currentId = sections[current]?.id;
  // Bolinha acesa: a última página do menu que já começou (Como funciona → Início)
  const navIds = nav.map((n) => n.id);
  let activeNav = 0;
  sections.slice(0, current + 1).forEach((s) => {
    const k = navIds.indexOf(s.id);
    if (k >= 0) activeNav = k;
  });
  const atTop = current === 0;
  const atEnd = current === sections.length - 1;

  const arrow =
    "grid place-items-center rounded-full border border-lime/60 bg-bg/80 text-lime transition hover:bg-lime hover:text-lime-ink disabled:pointer-events-none disabled:opacity-0";

  return (
    <>
      {/* Computador */}
      <nav aria-label="Páginas" className="fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex xl:right-5">
        <button type="button" onClick={() => goTo(current - 1)} disabled={atTop} aria-label="Página anterior" className={`${arrow} size-[26px]`}>
          <Icon name="chevronRight" className="size-3.5 -rotate-90" strokeWidth={2.4} />
        </button>
        <ul className="flex flex-col items-center gap-1.5 py-1">
          {nav.map((n, i) => {
            const active = i === activeNav;
            return (
              <li key={n.id} className="group relative flex">
                <button
                  type="button"
                  onClick={() => goTo(sections.findIndex((s) => s.id === n.id))}
                  aria-label={n.label}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full transition-all duration-300 ${
                    active ? "h-5 w-2 bg-lime" : "size-2 border-[1.5px] border-lime/55 hover:bg-lime/40"
                  }`}
                />
                <span className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 rounded-md bg-bg-2 px-2 py-1 text-xs font-semibold whitespace-nowrap opacity-0 ring-1 ring-lime/30 transition group-hover:opacity-100">
                  {n.label}
                </span>
              </li>
            );
          })}
        </ul>
        <button type="button" onClick={() => goTo(current + 1)} disabled={atEnd} aria-label="Próxima página" className={`${arrow} size-[26px]`}>
          <Icon name="chevronRight" className="size-3.5 rotate-90" strokeWidth={2.4} />
        </button>
      </nav>

      {/* Celular e tablet */}
      <div className="fixed right-3 bottom-3 z-40 flex flex-col gap-2 lg:hidden" data-current={currentId}>
        <button type="button" onClick={() => goTo(current - 1)} disabled={atTop} aria-label="Página anterior" className={`${arrow} size-10 shadow-lg`}>
          <Icon name="chevronRight" className="size-5 -rotate-90" strokeWidth={2.4} />
        </button>
        <button type="button" onClick={() => goTo(current + 1)} disabled={atEnd} aria-label="Próxima página" className={`${arrow} size-10 shadow-lg`}>
          <Icon name="chevronRight" className="size-5 rotate-90" strokeWidth={2.4} />
        </button>
      </div>
    </>
  );
}
