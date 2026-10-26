// O painel depende da sessão de quem acessa: nunca gerar em cache.
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
