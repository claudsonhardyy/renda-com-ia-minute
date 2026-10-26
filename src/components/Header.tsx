"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/content/site";
import { Icon } from "./Icon";

// Marca do guia (não é o logo da Hub nem do MINUTE): selo "GUIA" + "Hub + MINUTE".
function Brand({ guia }: { guia: SiteContent["guia"] }) {
  return (
    <a href="#inicio" className="flex items-center gap-2.5" aria-label={`${guia.selo}: ${guia.nome} — início`}>
      <span className="rounded-md bg-lime px-2 py-1 text-[11px] leading-none font-extrabold tracking-wider text-lime-ink">
        GUIA
      </span>
      <span className="leading-tight">
        <span className="block text-base font-extrabold tracking-tight">{guia.nome}</span>
        <span className="block text-[11px] text-white/60">{guia.selo}</span>
      </span>
    </a>
  );
}

export function Header({ nav, guia }: { nav: SiteContent["nav"]; guia: SiteContent["guia"] }) {
  const [active, setActive] = useState<string>(nav[0]?.id ?? "inicio");
  const [open, setOpen] = useState(false);

  // Destaca na barra a página visível no momento.
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-lime/25 bg-[#0d211a]/95 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.8)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Brand guia={guia} />

        <nav aria-label="Páginas do guia" className="hidden xl:block">
          <ul className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`block rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors ${
                    active === item.id ? "bg-lime text-lime-ink" : "text-white/90 hover:bg-white/10 hover:text-lime"
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
          className="flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-sm font-bold text-lime-ink xl:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "x" : "menu"} className="size-5" strokeWidth={2.4} />
          {open ? "Fechar" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Páginas do guia" className="border-t border-white/10 bg-[#0d211a] xl:hidden">
          <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-1.5 px-4 py-3 sm:grid-cols-3 lg:grid-cols-5">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    active === item.id ? "bg-lime text-lime-ink" : "bg-white/[0.04] text-white/90"
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
