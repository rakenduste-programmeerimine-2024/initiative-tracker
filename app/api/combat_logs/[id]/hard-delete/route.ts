import { createRouteHandler } from "@/utils/api/create-route-handler"
import CombatLogService from "@/lib/services/combat-log-service"

// HARD DELETE a single combat log by ID
export const DELETE = createRouteHandler(async (id, userId) => {
  const deletedCombatLog = await CombatLogService.hardDelete(id!, userId)
  return deletedCombatLog
})
