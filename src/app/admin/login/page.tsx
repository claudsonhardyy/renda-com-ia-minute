import type { Metadata } from "next";
import { supabaseConfigured } from "@/lib/supabase/env";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Entrar — Painel MINUTE", robots: { index: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;
  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <div className="card w-full max-w-sm p-8">
        <p className="flex items-center gap-2 font-extrabold tracking-[0.2em]">
          <span className="grid size-8 place-items-center rounded-lg bg-black tracking-normal ring-1 ring-white/15">M.</span>
          MINUTE
        </p>
        <h1 className="mt-6 text-2xl font-bold">Painel de edição</h1>
        {supabaseConfigured ? (
          <LoginForm erroInicial={erro === "sem-permissao" ? "Esta conta não tem permissão para editar o site." : undefined} />
        ) : (
          <p className="mt-6 rounded-lg border border-amber-300/50 bg-amber-300/10 p-4 text-sm text-amber-100">
            O banco de dados ainda não foi conectado. Defina <code>NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
            <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> (veja o README).
          </p>
        )}
      </div>
    </main>
  );
}
