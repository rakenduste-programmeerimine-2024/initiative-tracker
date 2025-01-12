import { createEntity, Entity } from "./Entity"

export type Encounter = Entity & {
  name: string | null
}

const DEFAULT_ENCOUNTER: Omit<Encounter, keyof Entity> = {
  name: "Untitled Encounter",
}

export function createEncounter(data: Partial<Encounter>): Encounter {
  const baseEntity = createEntity(data)

  return {
    ...DEFAULT_ENCOUNTER,
    ...baseEntity,
    ...data,
  }
}
