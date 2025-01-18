import { createRouteHandler } from "@/utils/api/create-route-handler"
import { NextResponse } from "next/server"
import ParticipantService from "@/lib/services/participant-service"

// GET user ID for a specific participant by ID
export const GET = createRouteHandler(async (id, req) => {
  const userId = await ParticipantService.getUserId(id!)
  if (!userId) {
    return NextResponse.json(
      { error: "Participant not found" },
      { status: 404 },
    )
  }

  return { user_id: userId }
}, false)
