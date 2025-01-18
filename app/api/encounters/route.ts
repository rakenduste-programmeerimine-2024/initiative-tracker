import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdOrError } from "@/utils/api/request-utils"
import { NextResponse } from "next/server"
import EncounterService from "@/lib/services/encounter-service"

// GET all encounters for a specific user
export const GET = createRouteHandler(
  async (_, req) => {
    const userIdOrError = await getUserIdOrError(req)
    if (userIdOrError instanceof NextResponse) {
      return userIdOrError
    }

    const encounters = await EncounterService.getByUserId(
      "user_id",
      userIdOrError,
      userIdOrError,
    )
    return encounters
  },
  false,
  false,
)

// CREATE a new encounter
export const POST = createRouteHandler(
  async (_, req) => {
    const userIdOrError = await getUserIdOrError(req)
    if (userIdOrError instanceof NextResponse) {
      return userIdOrError
    }

    const data = await req!.json()
    const newEncounter = await EncounterService.create(data, userIdOrError)
    return newEncounter
  },
  true,
  false,
)
