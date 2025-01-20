import { v4 as uuidv4 } from "uuid"
import { DEFAULT_ENTITY } from "@/lib/constants/default-values"
import { ERROR_MESSAGES } from "@/lib/constants/error-messages"
import { BaseEntity } from "./base-entity"

type UUID = string

export type Entity = {
  id: UUID
  is_public: boolean
  created_at: Date
  modified_at: Date | null
  deleted_at: Date | null
  user_id: UUID
}

export type EntityDTO = Entity & {}

export const EntityUtils: BaseEntity<Entity> = {
  validate(data: Partial<Entity>): void {
    if (!data.user_id) {
      throw new Error(ERROR_MESSAGES.invalidUserId)
    }
  },

  create(data: Partial<Entity>): Entity {
    this.validate(data)

    return {
      id: data.id || uuidv4(),
      user_id: data.user_id!,
      ...DEFAULT_ENTITY,
      ...data,
    }
  },

  mapToDTO(entity: Entity): EntityDTO {
    return {
      ...entity,
    }
  },
}
