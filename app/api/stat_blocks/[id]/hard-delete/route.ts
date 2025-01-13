import { createRouteHandler } from "@/utils/api/create-route-handler"
import StatBlockService from "@/lib/services/stat-block-service"

// HARD DELETE a single stat block by ID
export const DELETE = createRouteHandler(async (id, userId) => {
  const deletedStatBlock = await StatBlockService.hardDelete(id!, userId)
  return deletedStatBlock
})
