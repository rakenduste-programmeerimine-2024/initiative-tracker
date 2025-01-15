import { verifyToken } from "@/utils/jwt"
import { updateSession } from "@/utils/supabase/middleware"
import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const userId = await getUserIdFromRequest(request)

  // Optionally attach userId to the request if present
  if (userId) {
    request.headers.set("x-user-id", userId)
  } else {
    console.info("No user ID found in token, proceeding as unauthenticated")
  }

  return updateSession(request) // Continue with session logic
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

/**
 * Extracts user ID from the request's authorization header.
 * Supports both `NextRequest` and `Request`.
 * @param req - The incoming request.
 * @returns User ID if valid, otherwise null.
 */
export async function getUserIdFromRequest(
  req: Request | NextRequest,
): Promise<string | null> {
  const authHeader = req.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.slice(7) // Remove "Bearer " prefix
  try {
    const decoded = verifyToken<{ sub: string }>(token)
    return decoded.sub
  } catch {
    return null // Token verification failed
  }
}
