import { DEFAULT_COMBAT_LOG } from "@/lib/constants/default-values"
import { Entity, EntityUtils } from "./entity"

type UUID = string

export type CombatLog = Entity & {
  encounter_id: UUID | null
  participant_id: UUID | null
  round_no: number
  hit_points_current: number
  death_save_successes: number // Ranges from -1 (default) to 3
  death_save_failures: number // Ranges from -1 (default) to 3
}

export type CombatLogDTO = CombatLog & {}

export const CombatLogUtils = {
  validate(data: Partial<CombatLog>): void {
    EntityUtils.validate(data)

    if (data.round_no !== undefined && data.round_no < 1) {
      throw new Error(
        `Invalid round number (${data.round_no}). Round number must be 1 or higher.`,
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
  },

  create(data: Partial<CombatLog>): CombatLog {
    this.validate(data)

    const baseEntity = EntityUtils.create(data)

    return {
      ...DEFAULT_COMBAT_LOG,
      ...baseEntity,
      ...data,
    }
  },
}
