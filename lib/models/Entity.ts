import { v4 as uuidv4 } from "uuid"

type UUID = string

export type Entity = {
  id: UUID
  is_public: boolean
  created_at: Date
  updated_at: Date | null
  deleted_at: Date | null
  user_id: UUID
}

const DEFAULT_ENTITY = {
  is_public: false,
  created_at: new Date(),
  updated_at: null,
  deleted_at: null,
}

export function createEntity(data: Partial<Entity>): Entity {
  if (!data.user_id) {
    throw new Error("Entity requires a valid 'user_id'.")
  }

  return {
    id: data.id || uuidv4(),
    user_id: data.user_id,
    ...DEFAULT_ENTITY,
    ...data,
  }
}
