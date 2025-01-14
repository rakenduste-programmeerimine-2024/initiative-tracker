import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getCurrentUserId } from "@/utils/api/user-utils"
import StatBlockService from "@/lib/services/stat-block-service"

// GET all stat blocks for a specific user
export const GET = createRouteHandler(async (_, req) => {
  const userId = await getCurrentUserId(req)
  const statBlocks = await StatBlockService.getByUserId(
    "user_id",
    userId,
    userId,
  )
  return statBlocks
}, false) // `requiresId` is false since we're not dealing with a single record

// CREATE a new stat block
export const POST = createRouteHandler(async (_, req) => {
  const userId = await getCurrentUserId(req)
  const data = await req!.json()
  const newStatBlock = await StatBlockService.create(data, userId)
  return newStatBlock
}, false)
