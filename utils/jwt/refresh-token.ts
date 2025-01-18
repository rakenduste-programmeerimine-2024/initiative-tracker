import * as jose from "jose"
import { signToken } from "./sign-token"

/**
 * Refresh a JWT token.
 * @param payload - The payload of the old token.
 * @param expiresIn - Token expiration time for the new token (default: "1h").
 * @returns The refreshed JWT token.
 */
export async function refreshToken(
  payload: jose.JWTPayload,
  expiresIn = "1h",
): Promise<string> {
  // Generate a new token with the same payload but updated expiration.
  return await signToken(payload, expiresIn)
}
