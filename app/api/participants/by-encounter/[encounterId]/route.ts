import { createRouteHandler } from "@/utils/api/create-route-handler"
import ParticipantService from "@/lib/services/participant-service"

export const GET = createRouteHandler(async (_, userId, req) => {
  const encounterId = req?.url?.split("/").pop() // Extract encounterId from URL
  if (!encounterId) throw new Error("Missing encounter ID")

  const logs = await ParticipantService.getByForeignKey(
    "encounter_id",
    encounterId,
    userId,
  )
  return logs
}, false) // No direct `id` param
