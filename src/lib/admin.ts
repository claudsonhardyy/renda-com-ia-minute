import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { supabaseConfigured } from "./supabase/env";

// Garante que quem está no painel é um admin (e-mail na tabela public.admins).
// O banco repete essa checagem via RLS em toda leitura/escrita.
export async function requireAdmin() {
  if (!supabaseConfigured) redirect("/admin/login");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) redirect("/admin/login?erro=sem-permissao");
  return { supabase, user };
}

export const isHttpUrl = (v: string) => /^https?:\/\/[^\s]+\.[^\s]+$/i.test(v.trim());
