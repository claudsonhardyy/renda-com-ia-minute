"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "./actions";

export function LoginForm({ erroInicial }: { erroInicial?: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(signIn, { erro: erroInicial });
  return (
    <form action={action} className="mt-8 space-y-5">
      <label className="block">
        <span className="text-sm font-semibold">E-mail</span>
        <input name="email" type="email" required autoComplete="email" className="admin-input mt-1.5" />
      </label>
      <label className="block">
        <span className="text-sm font-semibold">Senha</span>
        <input name="password" type="password" required autoComplete="current-password" className="admin-input mt-1.5" />
      </label>
      {state.erro && (
        <p role="alert" className="rounded-lg border border-red-400/50 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {state.erro}
        </p>
      )}
      <button type="submit" disabled={pending} className="admin-btn-primary w-full">
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
