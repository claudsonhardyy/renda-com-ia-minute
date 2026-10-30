import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site-url";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const titulo = "Guia Hub + MINUTE — Transforme seu celular em uma ferramenta de renda extra";
const descricao =
  "Guia independente: como se cadastrar na Hub, configurar o app MINUTE, gravar tarefas do dia a dia e receber os pagamentos.";

// Metadados para buscadores e para a prévia do link no WhatsApp e nas redes. Não aparecem na página.
export const metadata: Metadata = {
  title: titulo,
  description: descricao,
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  openGraph: { type: "website", locale: "pt_BR", title: titulo, description: descricao, siteName: "Guia Hub + MINUTE" },
  twitter: { card: "summary", title: titulo, description: descricao },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={jakarta.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
