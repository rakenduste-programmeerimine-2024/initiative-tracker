import { createRouteHandler } from "@/utils/api/create-route-handler"
import { NextResponse } from "next/server"
import CombatLogService from "@/lib/services/combat-log-service"

// GET user ID for a specific combat log by ID
export const GET = createRouteHandler(async (id, req) => {
  const userId = await CombatLogService.getUserId(id!)
  if (!userId) {
    return NextResponse.json({ error: "Combat log not found" }, { status: 404 })
  }

  return { user_id: userId }
}, false)
