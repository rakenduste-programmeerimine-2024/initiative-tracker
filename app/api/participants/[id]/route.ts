import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdOrError } from "@/utils/api/request-utils"
import { NextResponse } from "next/server"
import ParticipantService from "@/lib/services/participant-service"

// GET a single participant by ID
export const GET = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const participant = await ParticipantService.get(id!, userIdOrError)
  return participant
}, false)

// UPDATE a single participant by ID
export const PUT = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const updates = await req!.json()
  const updatedParticipant = await ParticipantService.update(
    id!,
    updates,
    userIdOrError,
  )
  return updatedParticipant
})

// SOFT DELETE a single participant by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const deletedParticipant = await ParticipantService.softDelete(
    id!,
    userIdOrError,
  )
  return deletedParticipant
})
