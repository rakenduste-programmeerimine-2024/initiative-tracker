import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getCurrentUserId } from "@/utils/api/user-utils"
import CombatLogService from "@/lib/services/combat-log-service"

export const GET = createRouteHandler(async (_, req) => {
  const userId = await getCurrentUserId(req)
  const participantId = req?.url?.split("/").pop() // Extract participantId from URL
  if (!participantId) throw new Error("Missing participant ID")

  const logs = await CombatLogService.getByForeignKey(
    "participant_id",
    participantId,
    userId,
  )
  return logs
}, false) // No direct `id` param
