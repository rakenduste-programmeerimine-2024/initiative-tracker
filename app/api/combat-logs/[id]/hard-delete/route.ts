import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdOrError } from "@/utils/api/request-utils"
import { NextResponse } from "next/server"
import CombatLogService from "@/lib/services/combat-log-service"

// HARD DELETE a single combat log by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const deletedCombatLog = await CombatLogService.hardDelete(id!, userIdOrError)
  return deletedCombatLog
})
