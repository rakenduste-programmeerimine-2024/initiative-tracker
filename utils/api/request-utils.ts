import * as jose from "jose"
import { NextRequest, NextResponse } from "next/server"

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
}

export async function getUserIdFromRequest(request: NextRequest) {
  const token = request.headers.get("Authorization")
  let userId: string | null = null

  if (token) {
    try {
      const decoded = await jose.jwtVerify(
        token.replace("Bearer ", ""),
        jwtConfig.secret,
      )

      userId = decoded.payload.sub || null
    } catch (err) {
      console.error("Token verification failed:", err)
    }
  }

  return userId
}

export async function getUserIdOrError(
  request: NextRequest,
): Promise<string | NextResponse> {
  const userId = await getUserIdFromRequest(request)

  if (!userId) {
    return NextResponse.json(
      { error: "User is not authenticated" },
      { status: 401 },
    )
  }

  return userId
}

export async function fetchUserId(
  baseUrl: string,
  entityId: string,
  pathName: string,
): Promise<string | null> {
  try {
    const url = `${baseUrl}/api/${pathName}/${entityId}/user-id`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok && data?.user_id) {
      return data.user_id
    } else {
      return null
    }
  } catch (error) {
    console.error(`Error fetching user ID for resource:`, error)
    return null
  }
}

export async function getBaseUrl(request: NextRequest): Promise<string> {
  // Retrieve the protocol (http or https) and host from the headers
  const protocol = request.headers.get("x-forwarded-proto") || "http" // Default to "http"
  const host = request.headers.get("host")

  if (!host) {
    throw new Error("Host header is missing")
  }

  // Return the full base URL (e.g., http://localhost:3000)
  return `${protocol}://${host}`
}
