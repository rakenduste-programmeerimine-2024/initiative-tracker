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
 * Validates that the request contains a valid user token.
 * @param req - The incoming request.
 * @param expectedUserId - The expected user ID.
 * @returns The user ID if valid, or an error response if invalid.
 */
export async function validateRequest(
  req: Request,
  expectedUserId: string,
): Promise<string | NextResponse> {
  const userId = await getUserIdFromRequest(req as any);
  if (!userId) {
    return createErrorResponse("Unauthorized", 401);
  }

  if (userId !== expectedUserId) {
    return createErrorResponse("Forbidden", 403);
  }

  return userId;
}
