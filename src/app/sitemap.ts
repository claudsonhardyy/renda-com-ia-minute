import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// O site é uma página única. Sem o endereço definitivo (NEXT_PUBLIC_SITE_URL) não há o que listar.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [{ url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 }];
}
