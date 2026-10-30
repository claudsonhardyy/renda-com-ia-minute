import { createHash } from "node:crypto";
import { headers } from "next/headers";

// ---------------------------------------------------------------------------------------------
// Registro de segurança. Vai para os logs do servidor (na hospedagem: "Logs" do projeto).
// Nunca registra senhas nem tokens. E-mail aparece mascarado e o IP como um código (hash), que
// basta para ver repetições do mesmo endereço sem guardar o IP em si (minimização — LGPD art. 6º, III).
// ---------------------------------------------------------------------------------------------
export function mascararEmail(email: string) {
  const [user = "", dominio = ""] = email.split("@");
  return `${user.slice(0, 2)}***@${dominio}`;
}

export function hashCurto(valor: string) {
  return createHash("sha256").update(`renda-com-ia:${valor}`).digest("hex").slice(0, 12);
}

export async function ipDaRequisicao() {
  const h = await headers();
  const fwd = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || h.get("x-real-ip") || "desconhecido";
}

type Evento =
  | "login_ok"
  | "login_falhou"
  | "login_bloqueado"
  | "login_sem_permissao"
  | "painel_salvou_rascunho"
  | "painel_publicou"
  | "painel_descartou"
  | "painel_envio_midia"
  | "painel_acesso_negado";

export function registrar(evento: Evento, dados: Record<string, string | number | undefined> = {}) {
  const linha = JSON.stringify({ seguranca: evento, quando: new Date().toISOString(), ...dados });
  if (evento === "login_ok" || evento.startsWith("painel_") && evento !== "painel_acesso_negado") console.info(linha);
  else console.warn(linha);
}

// ---------------------------------------------------------------------------------------------
// Limite de tentativas de login (contra força bruta e "credential stuffing").
// 5 erros em 15 minutos bloqueiam aquele IP; 10 erros (de qualquer IP) bloqueiam aquele e-mail.
// O limite do e-mail é maior para que um atacante não consiga travar o acesso do dono com facilidade.
// Fica na memória do servidor: protege bem um servidor único; em hospedagem com várias
// instâncias cada uma conta separado — por isso o relatório recomenda também o CAPTCHA do Supabase.
// ---------------------------------------------------------------------------------------------
const JANELA_MS = 15 * 60 * 1000;
const limite = (chave: string) => (chave.startsWith("email:") ? 10 : 5);
const erros = new Map<string, number[]>();

function recentes(chave: string, agora: number) {
  const lista = (erros.get(chave) ?? []).filter((t) => agora - t < JANELA_MS);
  if (lista.length) erros.set(chave, lista);
  else erros.delete(chave);
  return lista;
}

export function loginBloqueado(chaves: string[]) {
  const agora = Date.now();
  return chaves.some((c) => recentes(c, agora).length >= limite(c));
}

export function anotarErroLogin(chaves: string[]) {
  const agora = Date.now();
  for (const c of chaves) erros.set(c, [...recentes(c, agora), agora]);
  // Evita crescer sem limite sob ataque com muitos IPs diferentes.
  if (erros.size > 10_000) for (const k of [...erros.keys()].slice(0, 5_000)) erros.delete(k);
}

export function limparErrosLogin(chaves: string[]) {
  for (const c of chaves) erros.delete(c);
}
