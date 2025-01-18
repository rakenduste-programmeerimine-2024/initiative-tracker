import { createRouteHandler } from "@/utils/api/create-route-handler"
import { NextResponse } from "next/server"
import StatBlockService from "@/lib/services/stat-block-service"

// GET user ID for a specific stat block by ID
export const GET = createRouteHandler(async (id, req) => {
  const userId = await StatBlockService.getUserId(id!)
  if (!userId) {
    return NextResponse.json({ error: "Stat block not found" }, { status: 404 })
  }

  return { user_id: userId }
}, false)
