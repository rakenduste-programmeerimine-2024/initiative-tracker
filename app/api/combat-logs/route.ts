import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdOrError } from "@/utils/api/request-utils"
import { NextResponse } from "next/server"
import CombatLogService from "@/lib/services/combat-log-service"

// GET all combat logs for a specific user
export const GET = createRouteHandler(
  async (_, req) => {
    const userIdOrError = await getUserIdOrError(req)
    if (userIdOrError instanceof NextResponse) {
      return userIdOrError
    }

    const combatLogs = await CombatLogService.getByUserId(
      "user_id",
      userIdOrError,
      userIdOrError,
    )
    return combatLogs
  },
  false,
  false,
)

// CREATE a new combat log
export const POST = createRouteHandler(
  async (_, req) => {
    const userIdOrError = await getUserIdOrError(req)
    if (userIdOrError instanceof NextResponse) {
      return userIdOrError
    }

    const data = await req!.json()
    const newCombatLog = await CombatLogService.create(data, userIdOrError)
    return newCombatLog
  },
  true,
  false,
)
