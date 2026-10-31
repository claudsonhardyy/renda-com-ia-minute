import type { SiteContent } from "@/content/site";
import { Header } from "./Header";
import { PendingProvider } from "./Pending";
import { AppMinute } from "./sections/AppMinute";
import { Cadastro } from "./sections/Cadastro";
import { Celulares } from "./sections/Celulares";
import { ComoFunciona } from "./sections/ComoFunciona";
import { Dicas } from "./sections/Dicas";
import { Duvidas } from "./sections/Duvidas";
import { Inicio } from "./sections/Inicio";
import { Pagamentos } from "./sections/Pagamentos";
import { Proposito } from "./sections/Proposito";
import { Suporte } from "./sections/Suporte";

// O site inteiro a partir de um conteúdo — usado pela página pública e pela pré-visualização.
// Ordem = numeração dos arquivos de referência no Drive.
export function SiteView({ c, showPending }: { c: SiteContent; showPending: boolean }) {
  return (
    <PendingProvider value={showPending}>
      <Header nav={c.nav} guia={c.guia} />
      <main>
        <Inicio c={c} />
        <ComoFunciona c={c} />
        <Cadastro c={c} />
        <AppMinute c={c} />
        <Pagamentos c={c} />
        <Suporte c={c} />
        <Dicas c={c} />
        <Celulares c={c} />
        <Proposito c={c} />
        <Duvidas c={c} />
      </main>
      <footer className="snap-end border-t border-white/10 px-4 py-6 text-center text-sm text-white/55">
        <strong className="text-white/80">{c.guia.nome}</strong> · {c.guia.rodape} {c.guia.dadosHub}
        <details className="mt-2">
          <summary className="inline-block cursor-pointer list-none underline underline-offset-2 hover:text-white/80">
            {c.guia.privacidadeTitulo}
          </summary>
          <p className="mx-auto mt-2 max-w-2xl text-left text-xs leading-relaxed">{c.guia.privacidadeTexto}</p>
        </details>
      </footer>
    </PendingProvider>
  );
}
