import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getCurrentUserId } from "@/utils/api/user-utils"
import ParticipantService from "@/lib/services/participant-service"

// HARD DELETE a single participant by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userId = await getCurrentUserId(req)
  const deletedParticipant = await ParticipantService.hardDelete(id!, userId)
  return deletedParticipant
})
