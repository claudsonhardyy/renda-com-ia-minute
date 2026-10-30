// Testes do site rodando (rotas, cabeçalhos, links, arquivos expostos).
// Uso: inicie o site (npm run build && npm start) e rode  BASE_URL=http://localhost:3000 npm run test:site
import { test } from "node:test";
import assert from "node:assert/strict";

const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const PRODUCAO = process.env.PRODUCAO !== "0";
const get = (path, init) => fetch(BASE + path, { redirect: "manual", ...init });

test("página inicial responde e não anuncia a tecnologia do servidor", async () => {
  const r = await get("/");
  assert.equal(r.status, 200);
  assert.equal(r.headers.get("x-powered-by"), null);
});

test("cabeçalhos de segurança presentes", async () => {
  const h = (await get("/")).headers;
  const csp = h.get("content-security-policy") ?? "";
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /frame-ancestors 'self'/);
  assert.match(csp, /object-src 'none'/);
  assert.equal(h.get("x-frame-options"), "SAMEORIGIN");
  assert.equal(h.get("x-content-type-options"), "nosniff");
  assert.ok(h.get("referrer-policy"));
  assert.match(h.get("permissions-policy") ?? "", /camera=\(\)/);
  if (PRODUCAO) assert.match(h.get("strict-transport-security") ?? "", /max-age=\d+/);
});

for (const rota of ["/admin", "/admin/preview"]) {
  test(`${rota} sem login vai para o login e fica fora dos buscadores`, async () => {
    const r = await get(rota);
    assert.ok([302, 303, 307, 308].includes(r.status), `status ${r.status}`);
    assert.match(r.headers.get("location") ?? "", /\/admin\/login/);
    assert.match(r.headers.get("x-robots-tag") ?? "", /noindex/);
  });
}

for (const arquivo of ["/.env", "/.env.local", "/.env.example", "/package.json", "/next.config.ts", "/src/lib/admin.ts", "/supabase/migrations/20261026000000_painel_conteudo.sql", "/.git/config"]) {
  test(`arquivo interno não é servido: ${arquivo}`, async () => {
    assert.equal((await get(arquivo)).status, 404);
  });
}

test("emulador de celular não existe no site publicado", { skip: !PRODUCAO }, async () => {
  assert.equal((await get("/emulador.html")).status, 404);
});

test("robots.txt libera o site e bloqueia o painel", async () => {
  const r = await get("/robots.txt");
  assert.equal(r.status, 200);
  const t = await r.text();
  assert.match(t, /Allow: \//);
  assert.match(t, /Disallow: \/admin/);
});

test("links e código de indicação definidos pelo dono", async () => {
  const html = await (await get("/")).text();
  assert.ok(html.includes("https://app.hub.xyz/r/RENDER"), "cadastro na Hub");
  assert.ok(html.includes("https://app.hub.xyz/how-it-works"), "suporte e compatibilidade");
  assert.ok(html.includes("https://br.shp.ee/yURDpsu6"), "compra online");
  assert.ok(html.includes("[RENDER]"), "código de indicação");
  assert.ok(!html.includes("RENDACOMIA"), "código antigo não aparece");
});

test("links externos abrem com noopener (a página aberta não controla o site)", async () => {
  const html = await (await get("/")).text();
  const externos = [...html.matchAll(/<a\b[^>]*href="https?:\/\/[^"]+"[^>]*>/g)].map((m) => m[0]);
  assert.ok(externos.length > 0);
  for (const a of externos) assert.match(a, /rel="noopener noreferrer"/, a);
});

test("nenhum script ou estilo carregado de outros sites", async () => {
  const html = await (await get("/")).text();
  const fora = [...html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(fora, []);
});

test("página inexistente responde 404 sem detalhes internos", async () => {
  const r = await get("/pagina-que-nao-existe");
  assert.equal(r.status, 404);
  const t = await r.text();
  assert.doesNotMatch(t, /node_modules|at Object\.|stack/i);
});
