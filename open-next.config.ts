import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Configuração da Cloudflare (adaptador OpenNext).
// Cache: a página inicial já sai pronta do build e é lida dos arquivos estáticos, sem recalcular a
// cada visita (economiza o limite de 10 ms de processamento do plano grátis). Com esse cache, uma
// alteração publicada pelo painel /admin só aparece no site depois de um novo deploy.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
