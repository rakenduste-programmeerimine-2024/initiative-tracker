import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdOrError } from "@/utils/api/request-utils"
import { NextResponse } from "next/server"
import StatBlockService from "@/lib/services/stat-block-service"

// HARD DELETE a single stat block by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const deletedStatBlock = await StatBlockService.hardDelete(id!, userIdOrError)
  return deletedStatBlock
})
