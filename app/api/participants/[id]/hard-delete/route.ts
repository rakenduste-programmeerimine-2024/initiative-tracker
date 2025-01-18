import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdOrError } from "@/utils/api/request-utils"
import { NextResponse } from "next/server"
import ParticipantService from "@/lib/services/participant-service"

// HARD DELETE a single participant by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)

  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const deletedParticipant = await ParticipantService.hardDelete(
    id!,
    userIdOrError,
  )
  return deletedParticipant
})
