import {
  ParticipantStatus,
  ParticipantType,
} from "@/types/enums/participant-enums"

export const DEFAULT_ENTITY = {
  is_public: false,
  created_at: new Date(),
  updated_at: null,
  deleted_at: null,
}

export const DEFAULT_COMBAT_LOG = {
  encounter_id: null,
  participant_id: null,
  turn_no: 1,
  hit_points_current: 999, // TODO: Revise this, possibly needs to be nullable
  death_save_successes: -1, // Default, progresses from 0 to 3
  death_save_failures: -1, // Default, progresses from 0 to 3
}

export const DEFAULT_ENCOUNTER = {
  name: "Untitled Encounter",
}

export const DEFAULT_PARTICIPANT = {
  encounter_id: null,
  stat_block_id: null,
  type: ParticipantType.Undefined,
  name: "Unnamed Participant",
  rolled_initiative: 10,
  hit_points_max: 999, // TODO: Revise this, possibly needs to be nullable
  group_no: 0,
  status: ParticipantStatus.Alive,
}

export const DEFAULT_STAT_BLOCK = {
  name: "Unnamed Creature",
  dexterity_score: 10,
  hit_points_average: null,
  hit_points_formula: null,
  base_armor_class: 10,
  dex_applies_to_ac: true,
  speed: 30,
}

export const DEFAULT_PROFILE = {
  full_name: null,
  username: null,
  website: null,
  avatar_url: null,
}
