import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdOrError } from "@/utils/api/request-utils"
import { NextResponse } from "next/server"
import EncounterService from "@/lib/services/encounter-service"

// GET a single encounter by ID (with optional cascade)
export const GET = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }
  const url = new URL(req.url || "")
  const cascade = url.searchParams.get("cascade") === "true"

  try {
    if (cascade) {
      const cascadedEncounter = await EncounterService.getEncounterCascaded(
        id!,
        userIdOrError,
      )
      return NextResponse.json({ success: true, data: cascadedEncounter.data })
    }

    const encounter = await EncounterService.get(id!, userIdOrError)
    return NextResponse.json({ success: true, data: encounter })
  } catch (error) {
    console.error("Error fetching encounter:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch encounter" },
      { status: 500 },
    )
  }
}, false)

// UPDATE a single encounter by ID
export const PUT = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const updates = await req!.json()
  const updatedEncounter = await EncounterService.update(
    id!,
    updates,
    userIdOrError,
  )
  return updatedEncounter
})

// SOFT DELETE a single encounter by ID
export const DELETE = createRouteHandler(async (id, req) => {
  const userIdOrError = await getUserIdOrError(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError
  }

  const deletedEncounter = await EncounterService.softDelete(id!, userIdOrError)
  return deletedEncounter
})
