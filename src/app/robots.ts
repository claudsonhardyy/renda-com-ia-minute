import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// Buscadores podem indexar o site; o painel fica fora (ele também envia "noindex" e exige login).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/admin/"] }],
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl } : {}),
  };
}
