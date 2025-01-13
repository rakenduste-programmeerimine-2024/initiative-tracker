import { createRouteHandler } from "@/utils/api/create-route-handler"
import CombatLogService from "@/lib/services/combat-log-service"

// GET all combat logs for a specific user
export const GET = createRouteHandler(async (_, userId) => {
  const combatLogs = await CombatLogService.getByUserId(
    "user_id",
    userId,
    userId,
  )
  return combatLogs
}, false) // `requiresId` is false since we're not dealing with a single record

// CREATE a new combat log
export const POST = createRouteHandler(async (_, userId, req) => {
  const data = await req!.json()
  const newCombatLog = await CombatLogService.create(data, userId)
  return newCombatLog
}, false)
