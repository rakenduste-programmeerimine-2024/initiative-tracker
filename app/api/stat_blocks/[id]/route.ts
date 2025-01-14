import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getCurrentUserId } from "@/utils/api/user-utils"
import StatBlockService from "@/lib/services/stat-block-service"

// GET a single stat block by ID
export const GET = createRouteHandler(async (id, req) => {
  const userId = await getCurrentUserId(req)
  const statBlock = await StatBlockService.get(id!, userId)
  return statBlock
})

// UPDATE a single stat block by ID
export const PUT = createRouteHandler(async (id, req) => {
  const userId = await getCurrentUserId(req)
  const updates = await req!.json()
  const updatedStatBlock = await StatBlockService.update(id!, updates, userId)
  return updatedStatBlock
})

// SOFT DELETE a single stat block by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userId = await getCurrentUserId(req)
  const deletedStatBlock = await StatBlockService.softDelete(id!, userId)
  return deletedStatBlock
})
