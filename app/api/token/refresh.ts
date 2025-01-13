import { signToken } from "@/utils/jwt"
import { verifyToken } from "@/utils/jwt"

/**
 * Generate a new JWT based on a valid refresh token.
 * @param refreshToken - The provided refresh token.
 * @returns A new JWT if the refresh token is valid.
 * @throws If the refresh token is invalid or expired.
 */
export function refreshAccessToken(refreshToken: string): string {
  try {
    // Verify the refresh token
    const payload = verifyToken<{ id: string }>(refreshToken)

    // Create a new access token
    return signToken({ id: payload.id }, "1h") // Set expiration for the new token
  } catch (error) {
    throw new Error("Invalid or expired refresh token")
  }
}
