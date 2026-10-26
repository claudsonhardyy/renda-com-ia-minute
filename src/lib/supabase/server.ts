import { createServerClient } from "@supabase/ssr";
import { createClient as createPlainClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { supabaseKey, supabaseUrl } from "./env";

// Cliente com a sessão do usuário (cookies) — usado no painel e nas server actions.
export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          for (const { name, value, options } of cookiesToSet) cookieStore.set(name, value, options);
        } catch {
          // Chamado de um Server Component: o proxy já renova a sessão.
        }
      },
    },
  });
}

// Cliente anônimo, sem cookies — usado pelo site público (permite cache estático).
export function createAnonClient() {
  return createPlainClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
}
