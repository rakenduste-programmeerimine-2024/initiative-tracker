import { createEntityService } from "@/lib/services/entity-service"
import { getSupabaseClient } from "@/utils/supabase/client-provider"
import { TableName } from "@/types/enums/table-name"
import { Participant, ParticipantDTO } from "@/lib/models/participant"
import {
  calculateActiveArmorClass,
  calculateInitiative,
  calculateModifier,
} from "@/utils/entities/participant-utils"

const ParticipantService = {
  ...createEntityService<Participant>(TableName.Participants),

  async getParticipantCascaded(
    participantId: string,
    currentUserId: string,
  ): Promise<{ success: true; data: any }> {
    const supabase = await getSupabaseClient()

    const query = supabase
      .from("participants")
      .select(
        `
      id,
      name,
      rolled_initiative,
      hit_points_max,
      group_no,
      status,
      is_public,
      created_at,
      modified_at,
      deleted_at,
      user_id,
      stat_block:stat_block_id (
        id,
        dexterity_score,
        base_armor_class,
        dex_applies_to_ac
      )
    `,
      )
      .eq("id", participantId)
      .or(`is_public.eq.true,user_id.eq.${currentUserId}`)
      .is("deleted_at", null)
      .single()

    const { data, error } = await query

    if (error) {
      throw new Error(`Error fetching participant data: ${error.message}`)
    }

    return { success: true, data: data }
  },
}

export default ParticipantService

export const mapToCascadedParticipantDTO = (
  participant: any,
): Partial<ParticipantDTO> => {
  const statBlock = participant.stat_block || {}

  const dexterityModifier = calculateModifier(statBlock.dexterity_score)

  const finalInitiative = calculateInitiative(
    participant.rolled_initiative,
    dexterityModifier,
  )

  const activeArmorClass = calculateActiveArmorClass(
    statBlock.base_armor_class,
    dexterityModifier,
    statBlock.dex_applies_to_ac ?? true,
  )

  return {
    id: participant.id,
    name: participant.name,
    rolled_initiative: participant.rolled_initiative,
    hit_points_max: participant.hit_points_max,
    group_no: participant.group_no,
    status: participant.status,
    is_public: participant.is_public,
    created_at: participant.created_at,
    modified_at: participant.modified_at,
    deleted_at: participant.deleted_at,
    user_id: participant.user_id,
    stat_block: {
      id: statBlock.id || null,
      dexterity_score: statBlock.dexterity_score || null,
      base_armor_class: statBlock.base_armor_class || null,
      dex_applies_to_ac: statBlock.dex_applies_to_ac || null,
    },
    dexterity_modifier: dexterityModifier,
    final_initiative: finalInitiative,
    active_armor_class: activeArmorClass,
  }
}