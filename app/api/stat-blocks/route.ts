import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdOrError } from "@/utils/api/request-utils"
import { NextResponse } from "next/server"
import StatBlockService from "@/lib/services/stat-block-service"

// GET all stat blocks for a specific user
export const GET = createRouteHandler(
  async (_, req) => {
    const userIdOrError = await getUserIdOrError(req)
    if (userIdOrError instanceof NextResponse) {
      return userIdOrError
    }

    const statBlocks = await StatBlockService.getByUserId(
      "user_id",
      userIdOrError,
      userIdOrError,
    )
    return statBlocks
  },
  false,
  false,
)

// CREATE a new stat block
export const POST = createRouteHandler(
  async (_, req) => {
    const userIdOrError = await getUserIdOrError(req)
    if (userIdOrError instanceof NextResponse) {
      return userIdOrError
    }

    const data = await req!.json()
    const newStatBlock = await StatBlockService.create(data, userIdOrError)
    return newStatBlock
  },
  true,
  false,
)
