import { createClient } from "@/utils/supabase/server"

let supabasePromise: ReturnType<typeof createClient> | null = null

/**
 * Returns a cached Supabase client or creates a new one.
 */
export async function getSupabaseClient() {
  if (!supabasePromise) {
    supabasePromise = createClient()
  }
  return supabasePromise
}
