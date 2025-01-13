import { TableName } from "@/types/enums/table-name"
import { CombatLogUtils } from "@/lib/models/combat-log"
import { EncounterUtils } from "@/lib/models/encounter"
import { ParticipantUtils } from "@/lib/models/participant"
import { ProfileUtils } from "@/lib/models/profile"
import { StatBlockUtils } from "@/lib/models/stat-block"

export const ValidationRegistry = {
  [TableName.CombatLogs]: CombatLogUtils.validate,
  [TableName.Encounters]: EncounterUtils.validate,
  [TableName.Participants]: ParticipantUtils.validate,
  [TableName.Profiles]: ProfileUtils.validate,
  [TableName.StatBlocks]: StatBlockUtils.validate,
} as const

export function getValidationFunction<T>(
  tableName: TableName,
): ((data: Partial<T>) => void) | null {
  return ValidationRegistry[tableName] || null
}
