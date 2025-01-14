import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getCurrentUserId } from "@/utils/api/user-utils"
import EncounterService from "@/lib/services/encounter-service"

// HARD DELETE a single encounter by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userId = await getCurrentUserId(req)
  const deletedEncounter = await EncounterService.hardDelete(id!, userId)
  return deletedEncounter
})
