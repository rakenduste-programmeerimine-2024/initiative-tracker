import { createRouteHandler } from "@/utils/api/create-route-handler"
import ParticipantService from "@/lib/services/participant-service"

// HARD DELETE a single participant by ID
export const DELETE = createRouteHandler(async (id, userId) => {
  const deletedParticipant = await ParticipantService.hardDelete(id!, userId)
  return deletedParticipant
})
