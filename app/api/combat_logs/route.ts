import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getCurrentUserId } from "@/utils/api/user-utils"
import CombatLogService from "@/lib/services/combat-log-service"

// GET all combat logs for a specific user
export const GET = createRouteHandler(async (_, req) => {
  const userId = await getCurrentUserId(req)
  const combatLogs = await CombatLogService.getByUserId(
    "user_id",
    userId,
    userId,
  )
  return combatLogs
}, false) // `requiresId` is false since we're not dealing with a single record

// CREATE a new combat log
export const POST = createRouteHandler(async (_, req) => {
  const userId = await getCurrentUserId(req)
  const data = await req!.json()
  const newCombatLog = await CombatLogService.create(data, userId)
  return newCombatLog
}, false)
