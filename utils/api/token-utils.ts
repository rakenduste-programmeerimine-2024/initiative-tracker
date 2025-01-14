import { createClient } from "@/utils/supabase/client"

export async function getAuthToken(): Promise<string> {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error("Error fetching session:", error)
    throw new Error("Failed to retrieve authentication session.")
  }

  const token = data.session?.access_token

  if (!token) {
    throw new Error("No authentication token available. Please log in.")
  }

  return token
}
