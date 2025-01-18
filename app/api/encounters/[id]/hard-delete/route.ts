import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdOrError } from "@/utils/api/request-utils"
import { NextResponse } from "next/server"
import EncounterService from "@/lib/services/encounter-service"

// HARD DELETE a single encounter by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)

  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const deletedEncounter = await EncounterService.hardDelete(id!, userIdOrError)
  return deletedEncounter
})
