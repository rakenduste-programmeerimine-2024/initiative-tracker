import { createRouteHandler } from "@/utils/api/create-route-handler"
import EncounterService from "@/lib/services/encounter-service"

// HARD DELETE a single encounter by ID
export const DELETE = createRouteHandler(async (id, userId) => {
  const deletedEncounter = await EncounterService.hardDelete(id!, userId)
  return deletedEncounter
})
