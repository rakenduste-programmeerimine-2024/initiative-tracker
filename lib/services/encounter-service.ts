import { createEntityService } from "@/lib/services/entity-service"
import { getSupabaseClient } from "@/utils/supabase/client-provider"
import { TableName } from "@/types/enums/table-name"
import { Encounter, EncounterDTO } from "@/lib/models/encounter"
import {
  calculateActiveArmorClass,
  calculateInitiative,
  calculateModifier,
} from "@/utils/entities/participant-utils"

const EncounterService = {
  ...createEntityService<Encounter>(TableName.Encounters),

  async getEncounterCascaded(
    encounterId: string,
    currentUserId: string,
  ): Promise<{ success: true; data: any }> {
    const supabase = await getSupabaseClient()

    const query = supabase
      .from("encounters")
      .select(
        `
      id,
      name,
      created_at,
      modified_at,
      deleted_at,
      user_id,
      participants (
        id,
        name,
        rolled_initiative,
        hit_points_max,
        group_no,
        status,
        created_at,
        modified_at,
        deleted_at,
        user_id,
        stat_block:stat_block_id (
          id,
          name,
          dexterity_score,
          hit_points_average,
          hit_points_formula,
          base_armor_class,
          dex_applies_to_ac,
          speed,
          created_at,
          modified_at,
          deleted_at,
          user_id
        )
      )
    `,
      )
      .eq("id", encounterId)
      .or(`is_public.eq.true,user_id.eq.${currentUserId}`)
      .is("deleted_at", null)
      .single()

    const { data, error } = await query

    if (error) {
      throw new Error(`Error fetching encounter: ${error.message}`)
    }

    return { success: true, data }
  },
}

export default EncounterService

export const mapToCascadedEncounterDTO = (
  data: any,
): Partial<EncounterDTO> => ({
  id: data.id,
  name: data.name,
  is_public: data.is_public,
  created_at: data.created_at,
  modified_at: data.modified_at,
  deleted_at: data.deleted_at,
  user_id: data.user_id,
  participants: data.participants.map((participant: any) => {
    const statBlock = participant.stat_block
    const dexterityModifier = calculateModifier(statBlock.dexterity_score)

    return {
      id: participant.id,
      name: participant.name,
      rolled_initiative: participant.rolled_initiative,
      final_initiative: calculateInitiative(
        participant.rolled_initiative,
        dexterityModifier,
      ),
      hit_points_max: participant.hit_points_max,
      group_no: participant.group_no,
      status: participant.status,
      dexterity_modifier: dexterityModifier,
      active_armor_class: calculateActiveArmorClass(
        statBlock.base_armor_class,
        dexterityModifier,
        statBlock.dex_applies_to_ac,
      ),
      stat_block: {
        id: statBlock.id,
        dexterity_score: statBlock.dexterity_score,
        base_armor_class: statBlock.base_armor_class,
        dex_applies_to_ac: statBlock.dex_applies_to_ac,
      },
    }
  }),
})