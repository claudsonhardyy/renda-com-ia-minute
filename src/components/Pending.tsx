"use client";

import { createContext, useContext } from "react";

// "Modo pendente": mostra o que ainda falta configurar (links vazios, itens de carrossel
// sem conteúdo). Ligado em desenvolvimento e na pré-visualização do painel; nunca no site público.
const PendingContext = createContext(false);

export function PendingProvider({ value, children }: { value: boolean; children: React.ReactNode }) {
  return <PendingContext.Provider value={value}>{children}</PendingContext.Provider>;
}

export function usePending() {
  return useContext(PendingContext);
}

export function PendingOnly({ children }: { children: React.ReactNode }) {
  return usePending() ? <>{children}</> : null;
}

export function PendingNote({ children }: { children: React.ReactNode }) {
  if (!usePending()) return null;
  return (
    <p className="mt-2 rounded-md border border-dashed border-amber-300/60 bg-amber-300/10 px-2 py-1 text-xs text-amber-200">
      Pendente: {children}
    </p>
  );
}
