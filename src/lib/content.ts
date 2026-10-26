import { defaultContent, type SiteContent } from "@/content/site";
import { createAnonClient, createClient } from "./supabase/server";
import { supabaseConfigured } from "./supabase/env";

type Plain = Record<string, unknown>;
const isPlain = (v: unknown): v is Plain => typeof v === "object" && v !== null && !Array.isArray(v);

// O que vem do banco sobrescreve o padrão campo a campo; listas são trocadas inteiras.
// Assim, um campo novo adicionado no código aparece mesmo em conteúdo salvo antes dele.
export function mergeContent<T>(base: T, override: unknown): T {
  if (!isPlain(base) || !isPlain(override)) {
    if (override === undefined || override === null) return base;
    if (Array.isArray(base) !== Array.isArray(override) || typeof base !== typeof override) return base;
    return override as T;
  }
  const out: Plain = { ...base };
  for (const key of Object.keys(base)) out[key] = mergeContent(base[key], override[key]);
  return out as T;
}

async function readRow(id: "draft" | "published", withSession: boolean): Promise<SiteContent> {
  if (!supabaseConfigured) return defaultContent;
  const supabase = withSession ? await createClient() : createAnonClient();
  const { data, error } = await supabase.from("site_content").select("content").eq("id", id).maybeSingle();
  if (error) {
    console.error(`Erro ao ler conteúdo (${id}):`, error.message);
    return defaultContent;
  }
  return mergeContent(defaultContent, data?.content);
}

export const getPublishedContent = () => readRow("published", false);
export const getDraftContent = () => readRow("draft", true);
