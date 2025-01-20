import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getUserIdFromRequest } from "@/utils/api/request-utils"
import { NextResponse } from "next/server"
import CombatLogService from "@/lib/services/combat-log-service"

// GET combat logs by encounter ID (with optional cascade)
export const GET = createRouteHandler(
  async (_, req) => {
    const userId = (await getUserIdFromRequest(req)) || ""

    const url = new URL(req.url || "")
    const encounterId = url.pathname.split("/").pop() // Extract encounterId from URL
    const cascade = url.searchParams.get("cascade") === "true"

    if (!encounterId) throw new Error("Missing encounter ID")

    try {
      if (cascade) {
        const cascadedLogs = await CombatLogService.getCombatLogSnapshot(
          encounterId,
          userId,
        )

        return NextResponse.json({
          success: true,
          data: JSON.stringify(cascadedLogs.data),
        })
      }

      const logs = await CombatLogService.getByForeignKey(
        "encounter_id",
        encounterId,
        userId,
      )
      return NextResponse.json({ success: true, data: logs.data })
    } catch (error) {
      console.error("Error fetching combat logs:", error)
      return NextResponse.json(
        { success: false, error: "Failed to fetch combat logs" },
        { status: 500 },
      )
    }
  },
  false,
  false,
)
