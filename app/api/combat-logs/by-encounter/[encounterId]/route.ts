import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdFromRequest } from "@/utils/api/request-utils"
import CombatLogService from "@/lib/services/combat-log-service"

export const GET = createRouteHandler(
  async (_, req) => {
    const userId = (await getUserIdFromRequest(req)) || ""

    const encounterId = req?.url?.split("/").pop() // Extract encounterId from URL
    if (!encounterId) throw new Error("Missing encounter ID")

    const logs = await CombatLogService.getByForeignKey(
      "encounter_id",
      encounterId,
      userId,
    )
    return logs
  },
  false,
  false,
)
