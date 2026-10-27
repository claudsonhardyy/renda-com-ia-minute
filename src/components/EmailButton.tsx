"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

// Botão "Enviar minha dúvida por e-mail": não dá para saber qual e-mail a pessoa usa, então o
// botão abre uma lista curta com os serviços mais comuns. Cada opção abre um e-mail novo já com
// o destinatário e o assunto preenchidos — a pessoa só escreve a mensagem e envia.
export function EmailButton({ email, assunto, label, className }: { email: string; assunto: string; label: string; className: string }) {
  const [open, setOpen] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const to = encodeURIComponent(email);
  const su = encodeURIComponent(assunto);

  const opcoes = [
    { nome: "Gmail", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}` },
    { nome: "Outlook / Hotmail", href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}` },
    { nome: "Yahoo Mail", href: `https://compose.mail.yahoo.com/?to=${to}&subject=${su}` },
    { nome: "Outro aplicativo de e-mail", href: `mailto:${email}?subject=${su}` },
  ];

  // Fecha ao clicar fora ou apertar Esc
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(email);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {}
  }

  return (
    <div ref={box} className="relative inline-block">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="menu" className={className}>
        <Icon name="mail" className="size-6" />
        {label}
        <Icon name="chevronRight" className={`size-5 transition ${open ? "-rotate-90" : "rotate-90"}`} strokeWidth={2.6} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute bottom-full left-0 z-30 mb-3 w-[min(22rem,calc(100vw-2rem))] animate-[fade_200ms_ease-out] overflow-hidden rounded-2xl border border-lime/50 bg-bg-2 shadow-[0_18px_50px_rgb(0_0_0/0.6)]"
        >
          <p className="border-b border-white/10 px-4 py-2.5 text-sm text-white/75">Escolha onde está o seu e-mail:</p>
          {opcoes.map((o) => (
            <a
              key={o.nome}
              role="menuitem"
              href={o.href}
              target={o.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-3 px-4 py-2.5 font-semibold transition hover:bg-lime/10 hover:text-lime"
            >
              {o.nome}
              <Icon name="arrowRight" className="size-4 text-lime" />
            </a>
          ))}
          <button
            type="button"
            role="menuitem"
            onClick={copiar}
            className="flex w-full items-center justify-between gap-3 border-t border-white/10 px-4 py-2.5 text-left text-sm text-white/80 transition hover:bg-lime/10"
          >
            <span>
              {copiado ? "Copiado!" : "Copiar o endereço"} <span className="text-lime">{email}</span>
            </span>
            <Icon name={copiado ? "check" : "file"} className="size-4 text-lime" />
          </button>
        </div>
      )}
    </div>
  );
}
