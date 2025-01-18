import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdOrError } from "@/utils/api/request-utils"
import { NextResponse } from "next/server"
import ParticipantService from "@/lib/services/participant-service"

// GET all participants for a specific user
export const GET = createRouteHandler(
  async (_, req) => {
    const userIdOrError = await getUserIdOrError(req)
    if (userIdOrError instanceof NextResponse) {
      return userIdOrError
    }
    const participants = await ParticipantService.getByUserId(
      "user_id",
      userIdOrError,
      userIdOrError,
    )
    return participants
  },
  false,
  false,
)

// CREATE a new participant
export const POST = createRouteHandler(
  async (_, req) => {
    const userIdOrError = await getUserIdOrError(req)
    if (userIdOrError instanceof NextResponse) {
      return userIdOrError
    }

    const data = await req!.json()
    const newParticipant = await ParticipantService.create(data, userIdOrError)
    return newParticipant
  },
  true,
  false,
)
