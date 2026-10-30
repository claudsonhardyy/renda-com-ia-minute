"use server";

import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import {
  anotarErroLogin,
  hashCurto,
  ipDaRequisicao,
  limparErrosLogin,
  loginBloqueado,
  mascararEmail,
  registrar,
} from "@/lib/security";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { erro?: string };

const ERRO_GENERICO = "E-mail ou senha incorretos.";

export async function signIn(_prev: LoginState, form: FormData): Promise<LoginState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase().slice(0, 254);
  const password = String(form.get("password") ?? "").slice(0, 200);
  if (!email || !password) return { erro: "Informe e-mail e senha." };

  const ip = hashCurto(await ipDaRequisicao());
  const chaves = [`ip:${ip}`, `email:${hashCurto(email)}`];

  // Bloqueado por excesso de erros: responde igual a uma senha errada, sem nem consultar o
  // Supabase (não dá pista ao atacante e não gasta o limite do servidor de autenticação).
  if (loginBloqueado(chaves)) {
    registrar("login_bloqueado", { ip, email: mascararEmail(email) });
    return { erro: ERRO_GENERICO };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    anotarErroLogin(chaves);
    registrar("login_falhou", { ip, email: mascararEmail(email) });
    return { erro: ERRO_GENERICO };
  }

  if (!(await isAdmin(supabase))) {
    anotarErroLogin(chaves);
    registrar("login_sem_permissao", { ip, email: mascararEmail(email) });
    await supabase.auth.signOut();
    return { erro: "Esta conta não tem permissão para editar o site." };
  }

  limparErrosLogin(chaves);
  registrar("login_ok", { ip, email: mascararEmail(email) });
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  // "global": encerra a sessão em todos os aparelhos onde a conta estiver aberta.
  await supabase.auth.signOut({ scope: "global" });
  redirect("/admin/login");
}
