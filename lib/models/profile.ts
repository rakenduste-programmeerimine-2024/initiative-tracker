import { DEFAULT_PROFILE } from "@/lib/constants/default-values"
import { ERROR_MESSAGES } from "@/lib/constants/error-messages"
import { URL_PATTERN } from "@/utils/entities/validation-patterns"

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

export const ProfileUtils = {
  validate(data: Partial<Profile>): void {
    if (!data.id) {
      throw new Error(ERROR_MESSAGES.invalidId)
    }

    if (data.username && data.username.length > 50) {
      throw new Error(ERROR_MESSAGES.usernameTooLong)
    }

    if (data.website && !URL_PATTERN.test(data.website)) {
      throw new Error(ERROR_MESSAGES.invalidURL)
    }

    if (data.avatar_url && !URL_PATTERN.test(data.avatar_url)) {
      throw new Error(ERROR_MESSAGES.invalidURL)
    }
  },

  create(data: Partial<Profile>): Profile {
    this.validate(data)

    return {
      ...DEFAULT_PROFILE,
      ...data,
      id: data.id!, // Assume id is validated in `validate`
      created_at: data.created_at || new Date(),
      updated_at: data.updated_at || new Date(),
    }
  },
}
