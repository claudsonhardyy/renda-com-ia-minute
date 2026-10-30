"use server";

import { revalidatePath } from "next/cache";
import { defaultContent, type SiteContent } from "@/content/site";
import { isHttpUrl, requireAdmin } from "@/lib/admin";
import { mergeContent } from "@/lib/content";
import { MEDIA_BUCKET } from "@/lib/supabase/env";
import { mascararEmail, registrar } from "@/lib/security";

export type ActionResult = { ok: true; message: string } | { ok: false; message: string };

function validate(content: SiteContent): string | null {
  for (const [key, value] of Object.entries(content.links)) {
    if (value && !isHttpUrl(value)) return `O link "${key}" precisa começar com https:// ou http://`;
  }
  const email = content.duvidas.email.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "O e-mail do suporte (aba Dúvidas) não parece válido.";
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
  registrar("painel_salvou_rascunho", { admin: mascararEmail(user.email ?? "") });
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
  registrar("painel_publicou", { admin: mascararEmail(user.email ?? "") });
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
  registrar("painel_descartou", { admin: mascararEmail(user.email ?? "") });
  return { ok: true, message: "Rascunho descartado." };
}

// Envio de imagens e vídeos pelo painel. O servidor confere se é admin, valida tipo e tamanho e
// devolve uma autorização de envio de uso único para aquele arquivo. Assim o navegador nunca
// precisa ter acesso à sessão do admin (o cookie da sessão fica protegido com HttpOnly).
const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif", "video/mp4", "video/webm"];
const EXTENSOES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "video/mp4": "mp4",
  "video/webm": "webm",
};
const TAMANHO_MAXIMO = 50 * 1024 * 1024;

export type UploadAutorizado =
  | { ok: true; path: string; token: string }
  | { ok: false; message: string };

export async function autorizarEnvioMidia(arquivo: { nome: string; tipo: string; tamanho: number }): Promise<UploadAutorizado> {
  const { supabase, user } = await requireAdmin();
  const tipo = String(arquivo?.tipo ?? "");
  const tamanho = Number(arquivo?.tamanho ?? 0);
  if (!TIPOS_PERMITIDOS.includes(tipo)) return { ok: false, message: "Tipo de arquivo não permitido. Use JPG, PNG, WEBP, GIF, AVIF, MP4 ou WEBM." };
  if (!(tamanho > 0) || tamanho > TAMANHO_MAXIMO) return { ok: false, message: "O arquivo precisa ter até 50 MB." };

  // Nome do arquivo no servidor: só letras, números e hífen (sem "../" nem caracteres especiais).
  const base = String(arquivo?.nome ?? "arquivo")
    .replace(/\.[^.]+$/, "")
    .normalize("NFD")
    .replace(/[^A-Za-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "arquivo";
  const path = `uploads/${Date.now()}-${base}.${EXTENSOES[tipo]}`;

  const { data, error } = await supabase.storage.from(MEDIA_BUCKET).createSignedUploadUrl(path);
  if (error || !data) return { ok: false, message: `Não foi possível preparar o envio: ${error?.message ?? "erro desconhecido"}` };
  registrar("painel_envio_midia", { admin: mascararEmail(user.email ?? ""), arquivo: path, tipo, tamanho });
  return { ok: true, path: data.path, token: data.token };
}
