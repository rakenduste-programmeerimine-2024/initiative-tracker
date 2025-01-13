import { createRouteHandler } from "@/utils/api/create-route-handler"
import EncounterService from "@/lib/services/encounter-service"

// GET a single encounter by ID
export const GET = createRouteHandler(async (id, userId) => {
  const encounter = await EncounterService.get(id!, userId)
  return encounter
})

// UPDATE a single encounter by ID
export const PUT = createRouteHandler(async (id, userId, req) => {
  const updates = await req!.json()
  const updatedEncounter = await EncounterService.update(id!, updates, userId)
  return updatedEncounter
})

// SOFT DELETE a single encounter by ID
export const DELETE = createRouteHandler(async (id, userId) => {
  const deletedEncounter = await EncounterService.softDelete(id!, userId)
  return deletedEncounter
})
