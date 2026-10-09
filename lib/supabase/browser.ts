import { createBrowserClient } from '@supabase/ssr'
import { supabaseAnonKey, supabaseUrl } from './config'

/** Browser client for the admin editor (image uploads use the signed-in session). */
export function browserClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
