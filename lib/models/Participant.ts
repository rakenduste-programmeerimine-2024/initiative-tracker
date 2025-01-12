import {
  ParticipantStatus,
  ParticipantType,
} from "@/app/types/enums/ParticipantEnums"
import { createEntity, Entity } from "./Entity"

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

const DEFAULT_PARTICIPANT: Omit<Participant, keyof Entity> = {
  encounter_id: null,
  stat_block_id: null,
  type: ParticipantType.Undefined,
  name: "Unnamed Participant",
  initiative: 10,
  hit_points_max: 999, // TODO: Revise this, possibly needs to be nullable
  group_no: 0,
  status: ParticipantStatus.Alive,
}

function validateParticipant(data: Partial<Participant>) {
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

  if (data.status && !Object.values(ParticipantStatus).includes(data.status)) {
    throw new Error(
      `Invalid participant status: ${data.status}. Allowed statuses are: ${Object.values(ParticipantStatus).join(", ")}.`,
    )
  }
}

export function createParticipant(data: Partial<Participant>): Participant {
  validateParticipant(data)
  const baseEntity = createEntity(data)

  return {
    ...DEFAULT_PARTICIPANT,
    ...baseEntity,
    ...data,
  }
}
