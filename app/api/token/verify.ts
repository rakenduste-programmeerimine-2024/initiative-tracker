import { verifyToken } from "@/utils/jwt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { token } = await req.json()

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    const decoded = verifyToken<{ id: string; email: string; role: string }>(
      token,
    )
    return NextResponse.json({ valid: true, decoded })
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    )
  }
}
