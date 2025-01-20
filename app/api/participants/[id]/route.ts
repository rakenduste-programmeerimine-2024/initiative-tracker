import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdOrError } from "@/utils/api/request-utils"
import { NextResponse } from "next/server"
import ParticipantService from "@/lib/services/participant-service"

// GET a single participant by ID (with optional cascade)
export const GET = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const url = new URL(req.url || "")
  const cascade = url.searchParams.get("cascade") === "true"

  try {
    if (cascade) {
      const cascadedParticipant = await ParticipantService.getParticipantCascaded(id!, userIdOrError)
      return NextResponse.json({ success: true, data: cascadedParticipant.data })
    }

    const participant = await ParticipantService.get(id!, userIdOrError)
    return NextResponse.json({ success: true, data: participant })
  } catch (error) {
    console.error("Error fetching participant:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch participant" },
      { status: 500 },
    )
  }
}, false)

// UPDATE a single participant by ID
export const PUT = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const updates = await req!.json()
  const updatedParticipant = await ParticipantService.update(
    id!,
    updates,
    userIdOrError,
  )
  return updatedParticipant
})

// SOFT DELETE a single participant by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const deletedParticipant = await ParticipantService.softDelete(
    id!,
    userIdOrError,
  )
  return deletedParticipant
})
