// Endereço público definitivo do site (ex.: https://www.seudominio.com.br), definido na hospedagem.
// Usado no sitemap, no robots.txt e no endereço canônico. Vazio = ainda sem domínio.
const bruto = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/+$/, "");
export const siteUrl = /^https:\/\/[^\s/]+$/i.test(bruto) ? bruto : "";
