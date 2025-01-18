import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdOrError } from "@/utils/api/request-utils"
import { NextResponse } from "next/server"
import StatBlockService from "@/lib/services/stat-block-service"

// GET a single stat block by ID
export const GET = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const statBlock = await StatBlockService.get(id!, userIdOrError)
  return statBlock
}, false)

// UPDATE a single stat block by ID
export const PUT = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const updates = await req!.json()
  const updatedStatBlock = await StatBlockService.update(
    id!,
    updates,
    userIdOrError,
  )
  return updatedStatBlock
})

// SOFT DELETE a single stat block by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const deletedStatBlock = await StatBlockService.softDelete(id!, userIdOrError)
  return deletedStatBlock
})
