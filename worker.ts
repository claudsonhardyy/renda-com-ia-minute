// Ponto de entrada do site na Cloudflare: usa o servidor gerado pelo OpenNext e só ajusta o
// cabeçalho de cache das páginas.
//
// Por quê: o Next.js manda as páginas com "stale-while-revalidate" de 30 dias. O Safari do iPhone
// então mostrava uma cópia ANTIGA da página guardada no aparelho (e atualizava só em segundo
// plano). Essa cópia antiga aponta para arquivos de estilo que já não existem depois de uma nova
// publicação, e a página abria "crua", sem estilo, até a pessoa atualizar.
// Com "max-age=0, must-revalidate" o navegador sempre confere a versão atual antes de mostrar.
// Arquivos estáticos (imagens, vídeos, scripts) não passam por aqui e não mudam.

// @ts-expect-error -- gerado no build (npx opennextjs-cloudflare build)
import { default as handler } from "./.open-next/worker.js";

export default {
  async fetch(request: Request, env: unknown, ctx: unknown): Promise<Response> {
    const res: Response = await handler.fetch(request, env, ctx);
    const tipo = res.headers.get("content-type") ?? "";
    const cache = res.headers.get("cache-control") ?? "";
    // Só troca o cache das páginas públicas (as que vêm com stale-while-revalidate). O painel
    // (/admin) continua com "no-store", como definido em next.config.ts.
    const paginaPublica = /stale-while-revalidate|s-maxage/.test(cache) && !/no-store/.test(cache);
    if (paginaPublica && (tipo.startsWith("text/html") || tipo.startsWith("text/x-component"))) {
      const nova = new Response(res.body, res);
      nova.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
      return nova;
    }
    return res;
  },
};

// @ts-expect-error -- gerado no build
export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./.open-next/worker.js";
