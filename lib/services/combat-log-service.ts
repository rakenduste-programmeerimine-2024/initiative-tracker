import { createEntityService } from "@/lib/services/entity-service"
import { getSupabaseClient } from "@/utils/supabase/client-provider"
import { TableName } from "@/types/enums/table-name"
import { CombatLog, CombatLogDTO } from "@/lib/models/combat-log"
import { calculateHealthPercentage } from "@/utils/entities/combat-log-utils"
import {
  calculateActiveArmorClass,
  calculateInitiative,
  calculateModifier,
} from "@/utils/entities/participant-utils"

const CombatLogService = {
  ...createEntityService<CombatLog>(TableName.CombatLogs),

  async getCombatLogSnapshot(
    encounterId: string,
    currentUserId: string,
  ): Promise<{ success: true; data: any }> {
    const supabase = await getSupabaseClient()

    const query = supabase.rpc("get_last_combat_logs_with_participants", {
      encounter_id: encounterId,
      user_id: currentUserId,
    })

    const { data, error } = await query

    if (error) {
      throw new Error(
        `Error fetching latest combat log snapshot for encounter: ${error.message}`,
      )
    }

    const dataWithHealthPercentage = data.map((item: any) => ({
      ...item,
      health_percentage: calculateHealthPercentage(
        item.hit_points_current,
        item.hit_points_max,
      ),
    }))

    return { success: true, data: dataWithHealthPercentage }
  },
}

export default CombatLogService

export const mapToCombatLogSnapshotDTO = (logs: any[]): CombatLogDTO[] => {
  return logs.map(log => {
    const dexterityModifier = calculateModifier(log.dexterity_score)
    const finalInitiative = calculateInitiative(
      log.rolled_initiative,
      dexterityModifier,
    )
    const activeArmorClass = calculateActiveArmorClass(
      log.base_armor_class,
      dexterityModifier,
      log.dex_applies_to_ac,
    )

    return {
      id: log.id,
      encounter_id: log.encounter_id,
      participant_id: log.participant_id,
      round_no: log.round_no,
      hit_points_current: log.hit_points_current,
      death_save_successes: log.death_save_successes,
      death_save_failures: log.death_save_failures,
      created_at: log.created_at,
      modified_at: log.modified_at,
      deleted_at: log.deleted_at,
      user_id: log.user_id,
      is_public: log.is_public,
      health_percentage: calculateHealthPercentage(
        log.hit_points_current,
        log.hit_points_max,
      ),
      participant: {
        id: log.participant_id,
        name: log.name,
        rolled_initiative: log.rolled_initiative,
        hit_points_max: log.hit_points_max,
        dexterity_modifier: dexterityModifier,
        final_initiative: finalInitiative,
        active_armor_class: activeArmorClass,
      },
    }
  })
}