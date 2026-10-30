import { createClient as createPlainClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "./env";

// Cliente do navegador usado só para enviar mídias com a autorização de uso único que o servidor
// gera (autorizarEnvioMidia). Não guarda nem lê sessão: a sessão do admin fica em cookie HttpOnly,
// fora do alcance do JavaScript da página.
export function createClient() {
  return createPlainClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
