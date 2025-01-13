import { signToken } from "./sign"

/**
 * Refresh a JWT token.
 * @param payload - The payload of the old token.
 * @param expiresIn - Token expiration time for the new token (default: "1h").
 * @returns The refreshed JWT token.
 */
export function refreshToken(payload: object, expiresIn = "1h"): string {
  // Generate a new token with the same payload but updated expiration.
  return signToken(payload, expiresIn)
}
