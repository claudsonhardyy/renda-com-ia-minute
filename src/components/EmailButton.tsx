"use client";

import { useState } from "react";
import { Icon } from "./Icon";

// Contato por e-mail: mostra o endereço do suporte com um botão para copiar e uma instrução
// simples — basta copiar e enviar a dúvida para esse endereço pelo e-mail que a pessoa já usa.
export function EmailButton({ email, assunto, className }: { email: string; assunto: string; className: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Sem acesso à área de transferência: seleciona o endereço para a pessoa copiar
      const el = document.getElementById("email-suporte");
      if (el) window.getSelection()?.selectAllChildren(el);
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  }

  return (
    <div className="max-w-lg">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex min-w-0 items-center gap-2.5 rounded-full border border-lime/60 bg-lime/10 px-4 py-3 font-semibold">
          <Icon name="mail" className="size-5 shrink-0 text-lime" />
          <span id="email-suporte" className="truncate select-all">
            {email}
          </span>
        </span>
        <button type="button" onClick={copiar} className={className} aria-live="polite">
          <Icon name={copiado ? "check" : "file"} className="size-5" strokeWidth={2.4} />
          {copiado ? "Copiado!" : "Copiar endereço"}
        </button>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/80">
        Basta <strong className="text-white">copiar o endereço</strong> e enviar a sua dúvida para ele pelo e-mail que você já usa (Gmail,
        Hotmail, Outlook…). No assunto, escreva <strong className="text-lime">{assunto}</strong>.
      </p>
    </div>
  );
}
