import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getCurrentUserId } from "@/utils/api/user-utils"
import CombatLogService from "@/lib/services/combat-log-service"

// HARD DELETE a single combat log by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userId = await getCurrentUserId(req)
  const deletedCombatLog = await CombatLogService.hardDelete(id!, userId)
  return deletedCombatLog
})
