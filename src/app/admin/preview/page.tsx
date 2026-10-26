import type { Metadata } from "next";
import { SiteView } from "@/components/SiteView";
import { requireAdmin } from "@/lib/admin";
import { getDraftContent } from "@/lib/content";

export const metadata: Metadata = { title: "Pré-visualização — Painel MINUTE", robots: { index: false } };

// Mostra o rascunho exatamente como o site vai ficar, com os itens pendentes destacados.
export default async function PreviewPage() {
  await requireAdmin();
  const c = await getDraftContent();
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[60] flex items-center justify-center gap-4 bg-amber-300 px-4 py-2 text-sm font-semibold text-black">
        Pré-visualização do rascunho — ainda não publicado.
        <a href="/admin" className="underline">Voltar ao painel</a>
      </div>
      <SiteView c={c} showPending />
    </>
  );
}
