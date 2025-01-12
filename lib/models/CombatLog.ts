import { createEntity, Entity } from "./Entity"

type UUID = string

export type CombatLog = Entity & {
  encounter_id: UUID | null
  participant_id: UUID | null
  turn_no: number
  hit_points_current: number
  death_save_successes: number // Ranges from -1 (default) to 3
  death_save_failures: number // Ranges from -1 (default) to 3
}

const DEFAULT_COMBAT_LOG: Omit<CombatLog, keyof Entity> = {
  encounter_id: null,
  participant_id: null,
  turn_no: 1,
  hit_points_current: 999, // TODO: Revise this, possibly needs to be nullable
  death_save_successes: -1, // Default, progresses from 0 to 3
  death_save_failures: -1, // Default, progresses from 0 to 3
}

function validateCombatLog(data: Partial<CombatLog>) {
  if (data.turn_no !== undefined && data.turn_no < 1) {
    throw new Error(
      `Invalid turn number (${data.turn_no}). Turn number must be 1 or higher.`,
    )
  }

  if (data.hit_points_current !== undefined && data.hit_points_current < 0) {
    throw new Error(
      `Invalid hit points (${data.hit_points_current}). Hit points must be a non-negative number.`,
    )
  }

  if (
    data.death_save_successes !== undefined &&
    (data.death_save_successes < -1 || data.death_save_successes > 3)
  ) {
    throw new Error(
      `Invalid death save successes (${data.death_save_successes}). Must be between -1 (not applicable) and 3.`,
    )
  }

  if (
    data.death_save_failures !== undefined &&
    (data.death_save_failures < -1 || data.death_save_failures > 3)
  ) {
    throw new Error(
      `Invalid death save failures (${data.death_save_failures}). Must be between -1 (not applicable) and 3.`,
    )
  }
}

export function createCombatLog(data: Partial<CombatLog>): CombatLog {
  validateCombatLog(data)
  const baseEntity = createEntity(data)

  return {
    ...DEFAULT_COMBAT_LOG,
    ...baseEntity,
    ...data,
  }
}
