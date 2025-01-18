import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdOrError } from "@/utils/api/request-utils"
import { NextResponse } from "next/server"
import CombatLogService from "@/lib/services/combat-log-service"

// GET a single combat log by ID
export const GET = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const combatLog = await CombatLogService.get(id!, userIdOrError)
  return combatLog
}, false)

// UPDATE a single combat log by ID
export const PUT = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const updates = await req!.json()
  const updatedCombatLog = await CombatLogService.update(
    id!,
    updates,
    userIdOrError,
  )
  return updatedCombatLog
})

// SOFT DELETE a single combat log by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const deletedCombatLog = await CombatLogService.softDelete(id!, userIdOrError)
  return deletedCombatLog
})
