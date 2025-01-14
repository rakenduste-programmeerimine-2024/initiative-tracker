import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getCurrentUserId } from "@/utils/api/user-utils"
import CombatLogService from "@/lib/services/combat-log-service"

// GET a single combat log by ID
export const GET = createRouteHandler(async (id, req) => {
  const userId = await getCurrentUserId(req)
  const combatLog = await CombatLogService.get(id!, userId)
  return combatLog
})

// UPDATE a single combat log by ID
export const PUT = createRouteHandler(async (id, req) => {
  const userId = await getCurrentUserId(req)
  const updates = await req!.json()
  const updatedCombatLog = await CombatLogService.update(id!, updates, userId)
  return updatedCombatLog
})

// SOFT DELETE a single combat log by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userId = await getCurrentUserId(req)
  const deletedCombatLog = await CombatLogService.softDelete(id!, userId)
  return deletedCombatLog
})
