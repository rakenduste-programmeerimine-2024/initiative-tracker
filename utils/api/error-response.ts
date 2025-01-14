import { NextResponse } from "next/server"

/**
 * Creates a JSON error response.
 * @param message - The error message.
 * @param status - The HTTP status code.
 * @returns A NextResponse with the error message and status.
 */
export function createErrorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status })
}
