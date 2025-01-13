import { getSupabaseClient } from "@/utils/supabase/client-provider"
import { TableName } from "@/types/enums/table-name"
import { Profile } from "@/lib/models/profile"

export async function getProfile(id: string) {
  const supabase = await getSupabaseClient()

  const { data, error } = await supabase
    .from(TableName.Profiles)
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    throw new Error(`Error fetching profile: ${error.message}`)
  }

  return data
}

export async function updateProfile(id: string, updates: Partial<Profile>) {
  const supabase = await getSupabaseClient()

  const { error } = await supabase
    .from(TableName.Profiles)
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single()

  if (error) {
    throw new Error(`Error updating profile: ${error.message}`)
  }

  return { success: true }
}
