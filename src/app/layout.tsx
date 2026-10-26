import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "MINUTE — Faça seu trabalho render ainda mais",
  description:
    "Guia para se cadastrar na Hub, configurar o app MINUTE, gravar tarefas do dia a dia e receber pagamentos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={jakarta.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
