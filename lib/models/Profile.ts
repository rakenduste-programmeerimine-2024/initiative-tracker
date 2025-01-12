type UUID = string

export type Profile = {
  id: UUID // Foreign key to auth.users.id
  full_name: string | null
  username: string | null
  website: string | null
  avatar_url: string | null
  created_at: Date
  updated_at: Date
}
