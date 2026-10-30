import type { NextConfig } from "next";

// Cabeçalhos de segurança. Não mudam nada na aparência do site: só dizem ao navegador o que a
// página pode carregar e como deve ser tratada.
const isDev = process.env.NODE_ENV !== "production";

// Endereço do Supabase (imagens/vídeos enviados pelo painel e chamadas de login). Vazio = sem banco.
const supabase = (() => {
  try {
    const u = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "");
    return { http: u.origin, ws: `wss://${u.host}` };
  } catch {
    return null;
  }
})();

const csp = [
  "default-src 'self'",
  // O Next.js injeta scripts inline para hidratar a página; em desenvolvimento também usa eval.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${supabase ? ` ${supabase.http}` : ""}`,
  `media-src 'self' blob:${supabase ? ` ${supabase.http}` : ""}`,
  "font-src 'self' data:",
  `connect-src 'self'${supabase ? ` ${supabase.http} ${supabase.ws}` : ""}`,
  // Só o próprio site pode exibir as páginas dentro de um quadro (protege o painel contra clickjacking).
  "frame-ancestors 'self'",
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), serial=(), hid=(), interest-cohort=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  // HSTS só faz sentido com HTTPS (produção). Em localhost atrapalharia outros projetos.
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]),
];

const nextConfig: NextConfig = {
  // Não anunciar a tecnologia do servidor (cabeçalho X-Powered-By).
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Painel: fora dos buscadores e nunca guardado em cache (dados de quem está logado).
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
      {
        source: "/admin",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },
};

export default nextConfig;
