import { DEFAULT_ENCOUNTER } from "@/lib/constants/default-values"
import { Entity, EntityUtils } from "./entity"

export type Encounter = Entity & {
  name: string | null
}

export const EncounterUtils = {
  validate(data: Partial<Encounter>): void {
    EntityUtils.validate(data)

    if (data.name && data.name.length > 100) {
      throw new Error("Encounter name must be 100 characters or fewer.")
    }
  },

  create(data: Partial<Encounter>): Encounter {
    this.validate(data)

    const baseEntity = EntityUtils.create(data)

    return {
      ...DEFAULT_ENCOUNTER,
      ...baseEntity,
      ...data,
    }
  },
}
