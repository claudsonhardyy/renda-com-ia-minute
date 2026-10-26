export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

// Sem as variáveis, o site funciona só com o conteúdo padrão de src/content/site.ts
// e o painel mostra como configurar.
export const supabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const MEDIA_BUCKET = "media";
