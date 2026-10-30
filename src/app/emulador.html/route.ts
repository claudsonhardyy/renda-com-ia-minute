import { readFile } from "node:fs/promises";
import path from "node:path";

// Emulador de celular para conferir a versão mobile (moldura de iPhone/Android com o site dentro).
// Existe só no computador de desenvolvimento: no site publicado este endereço responde 404.
export async function GET() {
  if (process.env.NODE_ENV === "production") return new Response("Not Found", { status: 404 });
  const html = await readFile(path.join(process.cwd(), "tools", "emulador.html"), "utf8");
  return new Response(html.replace('src="http://localhost:3001/"', 'src="/"'), {
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}
