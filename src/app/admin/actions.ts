"use server";

import { revalidatePath } from "next/cache";
import { defaultContent, type SiteContent } from "@/content/site";
import { isHttpUrl, requireAdmin } from "@/lib/admin";
import { mergeContent } from "@/lib/content";

export type ActionResult = { ok: true; message: string } | { ok: false; message: string };

function validate(content: SiteContent): string | null {
  for (const [key, value] of Object.entries(content.links)) {
    if (value && !isHttpUrl(value)) return `O link "${key}" precisa começar com https:// ou http://`;
  }
  return null;
}

export async function saveDraft(raw: unknown): Promise<ActionResult> {
  const { supabase, user } = await requireAdmin();
  // Normaliza contra o formato esperado: campos desconhecidos são descartados.
  const content = mergeContent(defaultContent, raw);
  const erro = validate(content);
  if (erro) return { ok: false, message: erro };

  const { error } = await supabase
    .from("site_content")
    .update({ content, updated_at: new Date().toISOString(), updated_by: user.email })
    .eq("id", "draft");
  if (error) return { ok: false, message: `Não foi possível salvar: ${error.message}` };
  revalidatePath("/admin/preview");
  return { ok: true, message: "Rascunho salvo." };
}

export async function publish(raw: unknown): Promise<ActionResult> {
  const saved = await saveDraft(raw);
  if (!saved.ok) return saved;

  const { supabase, user } = await requireAdmin();
  const { data: draft, error: readError } = await supabase.from("site_content").select("content").eq("id", "draft").single();
  if (readError) return { ok: false, message: `Não foi possível publicar: ${readError.message}` };

  const { error } = await supabase
    .from("site_content")
    .update({ content: draft.content, updated_at: new Date().toISOString(), updated_by: user.email })
    .eq("id", "published");
  if (error) return { ok: false, message: `Não foi possível publicar: ${error.message}` };

  revalidatePath("/");
  return { ok: true, message: "Publicado! O site já mostra as alterações." };
}

// Volta o rascunho para o que está publicado.
export async function discardDraft(): Promise<ActionResult> {
  const { supabase, user } = await requireAdmin();
  const { data, error: readError } = await supabase.from("site_content").select("content").eq("id", "published").single();
  if (readError) return { ok: false, message: readError.message };
  const { error } = await supabase
    .from("site_content")
    .update({ content: data.content, updated_at: new Date().toISOString(), updated_by: user.email })
    .eq("id", "draft");
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin");
  return { ok: true, message: "Rascunho descartado." };
}
