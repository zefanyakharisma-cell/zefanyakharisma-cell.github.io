export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

/** False until the env vars are set; the Writing pages then render an empty state instead of failing. */
export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
