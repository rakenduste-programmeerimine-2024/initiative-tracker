import { getUserIdFromRequest } from "@/middleware"
import { createErrorResponse } from "./error-response"
import { NextRequest, NextResponse } from "next/server"

/**
 * Validates that the request contains a valid user token.
 * @param req - The incoming request.
 * @returns User ID if valid, or an error response if invalid.
 */
export async function validateUserToken(
  req: Request | NextRequest,
): Promise<string | NextResponse> {
  const userId = await getUserIdFromRequest(req)
  if (!userId) {
    return createErrorResponse("Unauthorized", 401)
  }
  return userId
}

/**
 * Validates if the request's user ID matches the expected user ID.
 * @param req - The incoming request.
 * @param expectedUserId - The expected user ID.
 * @returns True if valid, or an error response if invalid.
 */
export async function validateRequest(
  req: Request | NextRequest,
  expectedUserId: string,
): Promise<true | NextResponse> {
  const userIdOrError = await validateUserToken(req)
  if (userIdOrError instanceof NextResponse) {
    return userIdOrError // Return error response
  }

  if (userIdOrError !== expectedUserId) {
    return createErrorResponse("Forbidden", 403)
  }

  return true
}
