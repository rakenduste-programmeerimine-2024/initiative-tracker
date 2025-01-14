import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getCurrentUserId } from "@/utils/api/user-utils"
import ParticipantService from "@/lib/services/participant-service"

export const GET = createRouteHandler(async (_, req) => {
  const userId = await getCurrentUserId(req)
  const statBlockId = req?.url?.split("/").pop() // Extract statBlockId from URL
  if (!statBlockId) throw new Error("Missing stat block ID")

  const logs = await ParticipantService.getByForeignKey(
    "stat_block_id",
    statBlockId,
    userId,
  )
  return logs
}, false) // No direct `id` param
