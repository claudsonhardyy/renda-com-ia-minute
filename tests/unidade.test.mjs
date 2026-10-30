// Testes de unidade das proteções (rodam sem servidor): npm run test:unidade
import { test } from "node:test";
import assert from "node:assert/strict";
import { anotarErroLogin, limparErrosLogin, loginBloqueado, mascararEmail, hashCurto } from "../src/lib/security.ts";
import { hardenCookie } from "../src/lib/supabase/cookies.ts";

test("login: bloqueia o IP depois de 5 erros e libera ao acertar", () => {
  const chaves = ["ip:teste-a", "email:teste-a"];
  for (let i = 0; i < 4; i++) anotarErroLogin(chaves);
  assert.equal(loginBloqueado(chaves), false, "4 erros ainda não bloqueiam");
  anotarErroLogin(chaves);
  assert.equal(loginBloqueado(chaves), true, "5 erros bloqueiam");
  limparErrosLogin(chaves);
  assert.equal(loginBloqueado(chaves), false);
});

test("login: o e-mail só é bloqueado com 10 erros vindos de IPs diferentes", () => {
  for (let i = 0; i < 9; i++) anotarErroLogin([`ip:outro-${i}`, "email:alvo"]);
  assert.equal(loginBloqueado(["ip:novo", "email:alvo"]), false);
  anotarErroLogin(["ip:outro-9", "email:alvo"]);
  assert.equal(loginBloqueado(["ip:novo", "email:alvo"]), true);
});

test("registro: e-mail mascarado e IP como código", () => {
  assert.equal(mascararEmail("dono@exemplo.com"), "do***@exemplo.com");
  assert.match(hashCurto("200.1.2.3"), /^[0-9a-f]{12}$/);
  assert.notEqual(hashCurto("200.1.2.3"), "200.1.2.3");
});

test("cookie da sessão: HttpOnly, SameSite e no máximo 12 horas", () => {
  const c = hardenCookie({ maxAge: 400 * 24 * 3600, httpOnly: false, sameSite: "none" });
  assert.equal(c.httpOnly, true);
  assert.equal(c.sameSite, "lax");
  assert.equal(c.maxAge, 12 * 3600);
});

test("cookie da sessão: sair do painel continua apagando o cookie", () => {
  assert.equal(hardenCookie({ maxAge: 0 }).maxAge, 0);
});
