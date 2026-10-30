import type { CookieOptionsWithName } from "@supabase/ssr";

// Cookies da sessão do painel.
// - httpOnly: o JavaScript da página não consegue ler a sessão (um script malicioso não a rouba).
// - secure (produção): o cookie só trafega por HTTPS.
// - sameSite "lax": o navegador não envia a sessão em requisições disparadas por outros sites.
// - 12 horas: depois disso é preciso entrar de novo (o padrão da biblioteca era 400 dias).
export const authCookieOptions: CookieOptionsWithName = {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 12,
};

// Aplica os atributos acima a cada cookie que a biblioteca grava. Mantém a remoção (maxAge 0 ao
// sair do painel) e nunca deixa a sessão durar mais que 12 horas.
export function hardenCookie<T extends { maxAge?: number }>(options: T | undefined) {
  const limite = authCookieOptions.maxAge ?? 0;
  const pedido = options?.maxAge;
  return {
    ...options,
    path: authCookieOptions.path,
    httpOnly: authCookieOptions.httpOnly,
    secure: authCookieOptions.secure,
    sameSite: authCookieOptions.sameSite,
    maxAge: pedido === undefined ? limite : Math.min(pedido, limite),
  };
}
