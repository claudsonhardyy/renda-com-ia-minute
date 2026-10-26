"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type { SiteContent } from "@/content/site";
import { discardDraft, publish, saveDraft, type ActionResult } from "./actions";
import { FieldEditor, isHttpUrl } from "./fields";
import { signOut } from "./login/actions";
import { setAt } from "./paths";
import { groups, linkFields } from "./schema";

export function Editor({
  initial,
  defaults,
  hasUnpublished,
  email,
}: {
  initial: SiteContent;
  defaults: SiteContent;
  hasUnpublished: boolean;
  email: string;
}) {
  const [content, setContent] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const [unpublished, setUnpublished] = useState(hasUnpublished);
  const [tab, setTab] = useState(groups[0].id);
  const [result, setResult] = useState<ActionResult | null>(null);
  const [busy, startTransition] = useTransition();

  const pendentes = useMemo(() => linkFields.filter((l) => !content.links[l.key as keyof SiteContent["links"]]), [content.links]);
  const invalidos = useMemo(
    () => linkFields.filter((l) => {
      const v = content.links[l.key as keyof SiteContent["links"]];
      return v && !isHttpUrl(v);
    }),
    [content.links],
  );

  // Avisa antes de sair com alterações não salvas.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const onChange = (path: string, value: unknown) => {
    setContent((c) => setAt(c, path, value));
    setDirty(true);
    setResult(null);
  };

  const run = (action: () => Promise<ActionResult>, after?: (r: ActionResult) => void) =>
    startTransition(async () => {
      const r = await action();
      setResult(r);
      after?.(r);
    });

  const save = () => run(() => saveDraft(content), (r) => r.ok && (setDirty(false), setUnpublished(true)));
  const doPublish = () => {
    if (!confirm("Publicar as alterações no site agora?")) return;
    run(() => publish(content), (r) => r.ok && (setDirty(false), setUnpublished(false)));
  };
  const preview = () => {
    // Salva antes para a pré-visualização mostrar exatamente o que está no formulário.
    const win = window.open("about:blank", "_blank");
    run(() => saveDraft(content), (r) => {
      if (r.ok) {
        setDirty(false);
        setUnpublished(true);
        if (win) win.location.href = "/admin/preview";
      } else win?.close();
    });
  };
  const discard = () => {
    if (!confirm("Descartar o rascunho e voltar ao conteúdo publicado?")) return;
    run(discardDraft, (r) => r.ok && window.location.reload());
  };

  const group = groups.find((g) => g.id === tab) ?? groups[0];

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <p className="mr-auto font-bold">
            Painel MINUTE
            <span className="ml-3 text-xs font-normal text-white/60">
              {dirty ? "Alterações não salvas" : unpublished ? "Rascunho salvo, ainda não publicado" : "Tudo publicado"}
            </span>
          </p>
          <button type="button" className="admin-btn text-sm" onClick={save} disabled={busy || !dirty}>
            Salvar rascunho
          </button>
          <button type="button" className="admin-btn text-sm" onClick={preview} disabled={busy}>
            Pré-visualizar
          </button>
          <button type="button" className="admin-btn-primary text-sm" onClick={doPublish} disabled={busy || invalidos.length > 0}>
            Publicar
          </button>
        </div>
        {result && (
          <p role="status" className={`border-t px-4 py-2 text-center text-sm ${result.ok ? "border-lime/30 bg-lime/10 text-lime" : "border-red-400/40 bg-red-500/10 text-red-200"}`}>
            {result.message}
          </p>
        )}
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[220px_1fr]">
        <nav aria-label="Áreas do site" className="min-w-0 md:sticky md:top-24 md:self-start">
          <ul className="flex gap-1 overflow-x-auto pb-2 md:flex-col md:overflow-visible">
            {groups.map((g) => (
              <li key={g.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setTab(g.id)}
                  aria-current={tab === g.id ? "page" : undefined}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm ${tab === g.id ? "bg-lime/15 font-semibold text-lime" : "text-white/75 hover:bg-white/5"}`}
                >
                  {g.title}
                  {g.id === "links" && pendentes.length + invalidos.length > 0 && (
                    <span className="rounded-full bg-amber-300/20 px-1.5 text-xs text-amber-200">{pendentes.length + invalidos.length}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 hidden space-y-2 border-t border-white/10 pt-4 text-xs text-white/50 md:block">
            <p className="truncate">{email}</p>
            <div className="flex gap-2">
              <a href="/" target="_blank" className="underline hover:text-white">Ver site</a>
              {unpublished && (
                <button type="button" onClick={discard} className="underline hover:text-white">Descartar rascunho</button>
              )}
              <form action={signOut}>
                <button type="submit" className="underline hover:text-white">Sair</button>
              </form>
            </div>
          </div>
        </nav>

        <section aria-labelledby="grupo-titulo" className="card min-w-0 p-5 sm:p-7">
          <h1 id="grupo-titulo" className="text-xl font-bold">{group.title}</h1>
          {group.id === "links" && (
            <div className="mt-4 rounded-lg border border-amber-300/40 bg-amber-300/5 p-4 text-sm text-amber-100">
              {pendentes.length === 0 ? (
                "Todos os links estão preenchidos."
              ) : (
                <>
                  <strong>{pendentes.length} link(s) pendente(s).</strong> Enquanto vazios, os botões aparecem desabilitados e as
                  lojas sem link ficam ocultas no site.
                  <ul className="mt-2 list-disc pl-5 text-amber-200/90">
                    {pendentes.map((p) => <li key={p.key}>{p.label}</li>)}
                  </ul>
                </>
              )}
              {invalidos.length > 0 && <p className="mt-2 text-red-300">Corrija os links inválidos para poder publicar.</p>}
            </div>
          )}
          <div className="mt-6 space-y-6">
            {group.fields.map((f) => (
              <FieldEditor key={f.path} field={f} base="" content={content} defaults={defaults} onChange={onChange} />
            ))}
          </div>
        </section>
      </div>

      <div className="flex justify-center gap-4 border-t border-white/10 py-4 text-xs text-white/50 md:hidden">
        <a href="/" target="_blank" className="underline">Ver site</a>
        <form action={signOut}>
          <button type="submit" className="underline">Sair</button>
        </form>
      </div>
    </div>
  );
}
