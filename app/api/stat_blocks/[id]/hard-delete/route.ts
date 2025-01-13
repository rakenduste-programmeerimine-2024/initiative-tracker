import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getCurrentUserId } from "@/utils/api/user-utils"
import StatBlockService from "@/lib/services/stat-block-service"

// HARD DELETE a single stat block by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userId = await getCurrentUserId(req)
  const deletedStatBlock = await StatBlockService.hardDelete(id!, userId)
  return deletedStatBlock
})
