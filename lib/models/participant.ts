import { DEFAULT_PARTICIPANT } from "@/lib/constants/default-values"
import { Entity, EntityUtils } from "./entity"
import { StatBlockDTO } from "./stat-block"
import {
  ParticipantStatus,
  ParticipantType,
} from "@/types/enums/participant-enums"
import {
  calculateActiveArmorClass,
  calculateInitiative,
  calculateModifier,
} from "@/utils/entities/participant-utils"

type UUID = string

export type Participant = Entity & {
  encounter_id: UUID | null
  stat_block_id: UUID | null
  type: ParticipantType
  name: string | null
  rolled_initiative: number
  hit_points_max: number
  group_no: number | null
  status: ParticipantStatus
}

export type ParticipantDTO = Participant & {
  dexterity_modifier: number
  final_initiative: number
  active_armor_class: number
  stat_block?: Partial<StatBlockDTO> | null
}

export const ParticipantUtils = {
  validate(data: Partial<Participant>): void {
    EntityUtils.validate(data)

    if (
      data.rolled_initiative !== undefined &&
      (data.rolled_initiative < -4 || data.rolled_initiative > 30)
    ) {
      throw new Error(
        `Invalid initiative value (${data.rolled_initiative}). Must be between -4 and 30.`,
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

  mapToDTO(participant: Participant): ParticipantDTO {
    const baseDTO = EntityUtils.mapToDTO(participant)

    return {
      ...baseDTO,
      ...participant,
      stat_block: null,
      dexterity_modifier: 0,
      final_initiative: participant.rolled_initiative || 0,
      active_armor_class: 10,
    }
  },
}
