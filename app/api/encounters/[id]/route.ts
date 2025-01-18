import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdOrError } from "@/utils/api/request-utils"
import { NextResponse } from "next/server"
import EncounterService from "@/lib/services/encounter-service"

// GET a single encounter by ID
export const GET = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const encounter = await EncounterService.get(id!, userIdOrError)
  return encounter
}, false)

// UPDATE a single encounter by ID
export const PUT = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const updates = await req!.json()
  const updatedEncounter = await EncounterService.update(
    id!,
    updates,
    userIdOrError,
  )
  return updatedEncounter
})

// SOFT DELETE a single encounter by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const deletedEncounter = await EncounterService.softDelete(id!, userIdOrError)
  return deletedEncounter
})
