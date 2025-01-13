import { Entity } from "@/lib/models/entity"

// Utility to convert timestamps to Date objects
export function convertTimestamps<T extends Entity>(data: T): T {
  return {
    ...data,
    created_at: new Date(data.created_at),
    updated_at: data.updated_at ? new Date(data.updated_at) : null,
    deleted_at: data.deleted_at ? new Date(data.deleted_at) : null,
  }
}

// Utility to remove disallowed fields (id, timestamps, user_id)
export function getAllowedFields<T extends Entity>(
  data: Partial<T>,
): Partial<
  Omit<T, "id" | "created_at" | "updated_at" | "deleted_at" | "user_id">
> {
  const { id, created_at, updated_at, deleted_at, user_id, ...rest } = data
  return rest
}
