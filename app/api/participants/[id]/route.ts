import { createRouteHandler } from "@/utils/api/create-route-handler"
import ParticipantService from "@/lib/services/participant-service"

// GET a single participant by ID
export const GET = createRouteHandler(async (id, userId) => {
  const participant = await ParticipantService.get(id!, userId)
  return participant
})

// UPDATE a single participant by ID
export const PUT = createRouteHandler(async (id, userId, req) => {
  const updates = await req!.json()
  const updatedParticipant = await ParticipantService.update(
    id!,
    updates,
    userId,
  )
  return updatedParticipant
})

// SOFT DELETE a single participant by ID
export const DELETE = createRouteHandler(async (id, userId) => {
  const deletedParticipant = await ParticipantService.softDelete(id!, userId)
  return deletedParticipant
})
