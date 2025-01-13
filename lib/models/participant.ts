import { DEFAULT_PARTICIPANT } from "@/lib/constants/default-values"
import { Entity, EntityUtils } from "./entity"
import {
  ParticipantStatus,
  ParticipantType,
} from "@/types/enums/participant-enums"

type UUID = string

export type Participant = Entity & {
  encounter_id: UUID | null
  stat_block_id: UUID | null
  type: ParticipantType
  name: string | null
  initiative: number
  hit_points_max: number
  group_no: number | null
  status: ParticipantStatus
}

export const ParticipantUtils = {
  validate(data: Partial<Participant>): void {
    EntityUtils.validate(data)

    if (
      data.initiative !== undefined &&
      (data.initiative < -4 || data.initiative > 30)
    ) {
      throw new Error(
        `Invalid initiative value (${data.initiative}). Must be between -4 and 30.`,
      )
    }

    if (data.hit_points_max !== undefined && data.hit_points_max < 0) {
      throw new Error(
        `Invalid maximum hit points (${data.hit_points_max}). Must be a non-negative number.`,
      )
    }

    if (data.type && !Object.values(ParticipantType).includes(data.type)) {
      throw new Error(
        `Invalid participant type: ${data.type}. Allowed types are: ${Object.values(ParticipantType).join(", ")}.`,
      )
    }

    if (
      data.status &&
      !Object.values(ParticipantStatus).includes(data.status)
    ) {
      throw new Error(
        `Invalid participant status: ${data.status}. Allowed statuses are: ${Object.values(ParticipantStatus).join(", ")}.`,
      )
    }
  },

  create(data: Partial<Participant>): Participant {
    this.validate(data)

    const baseEntity = EntityUtils.create(data)

    return {
      ...DEFAULT_PARTICIPANT,
      ...baseEntity,
      ...data,
    }
  },
}
