"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/content/site";
import { Icon } from "./Icon";

export function Header({ nav }: { nav: SiteContent["nav"] }) {
  const [active, setActive] = useState<string>(nav[0]?.id ?? "inicio");
  const [open, setOpen] = useState(false);

  // Destaca na barra a seção visível no momento.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const item of nav) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [nav]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-2 font-extrabold tracking-[0.2em]" aria-label="MINUTE — início">
          <span className="grid size-8 place-items-center rounded-lg bg-black text-base tracking-normal ring-1 ring-white/15">
            M.
          </span>
          <span className="text-sm">MINUTE</span>
        </a>

        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    active === item.id ? "bg-lime/15 text-lime" : "text-muted hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg border border-line text-lime lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "x" : "menu"} className="size-5" />
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Seções" className="border-t border-white/5 bg-bg lg:hidden">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-1 px-4 py-3 sm:grid-cols-3">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                    active === item.id ? "bg-lime/15 text-lime" : "text-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
