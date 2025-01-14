import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getCurrentUserId } from "@/utils/api/user-utils"
import EncounterService from "@/lib/services/encounter-service"

// GET all encounters for a specific user
export const GET = createRouteHandler(async (_, req) => {
  const userId = await getCurrentUserId(req)
  const encounters = await EncounterService.getByUserId(
    "user_id",
    userId,
    userId,
  )
  return encounters
}, false) // `requiresId` is false since we're not dealing with a single record

// CREATE a new encounter
export const POST = createRouteHandler(async (_, req) => {
  const userId = await getCurrentUserId(req)
  const data = await req!.json()
  const newEncounter = await EncounterService.create(data, userId)
  return newEncounter
}, false)
