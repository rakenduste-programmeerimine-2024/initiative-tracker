import { createRouteHandler } from "@/utils/api/create-route-handler"
import { NextResponse } from "next/server"
import EncounterService from "@/lib/services/encounter-service"

// GET user ID for a specific encounter by ID
export const GET = createRouteHandler(async (id, req) => {
  const userId = await EncounterService.getUserId(id!)
  if (!userId) {
    return NextResponse.json({ error: "Encounter not found" }, { status: 404 })
  }

  return { user_id: userId }
}, false)
