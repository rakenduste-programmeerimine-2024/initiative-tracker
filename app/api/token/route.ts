import { signToken } from "@/utils/jwt"
import { getSupabaseClient } from "@/utils/supabase/client-provider"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  // Fetch the current user from Supabase (or your auth provider).
  const supabase = await getSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Generate an access token.
  const accessToken = signToken({
    id: user.id,
    email: user.email,
    role: user.role || "user", // Default to "user" if no role
  })

  // Optionally, generate a refresh token
  const refreshToken = signToken({ id: user.id }, "7d") // Expires in 7 days

  return NextResponse.json({ accessToken, refreshToken })
}
