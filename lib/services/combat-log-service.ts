import { createEntityService } from "@/lib/services/entity-service"
import { TableName } from "@/types/enums/table-name"
import { CombatLog } from "@/lib/models/combat-log"

const CombatLogService = {
  ...createEntityService<CombatLog>(TableName.CombatLogs),
}

export default CombatLogService
