import { signToken } from "@/utils/jwt"
import { getSupabaseClient } from "@/utils/supabase/client-provider"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const supabase = await getSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Generate an access token
  const accessToken = signToken({
    id: user.id,
    email: user.email,
    role: user.role || "user", // Default to "user" if no role
  })

  // Optionally, generate a refresh token
  const refreshToken = signToken({ id: user.id }, "7d") // Expires in 7 days

  let session = null
  let dataToken = null
  const { data, error } = await supabase.auth.getSession()
  if (data) {
    session = data.session?.access_token
    dataToken = signToken({})
  }

  return NextResponse.json({ accessToken, refreshToken, dataToken })
}
