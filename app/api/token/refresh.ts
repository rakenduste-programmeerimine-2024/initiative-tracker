import { refreshToken, verifyToken } from "@/utils/jwt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { token } = await req.json()

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    const decoded = await verifyToken<{ id: string }>(token)

    // Refresh the access token
    const newAccessToken = await refreshToken({ id: decoded.id }, "1h")

    return NextResponse.json({ newAccessToken })
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    )
  }
}
