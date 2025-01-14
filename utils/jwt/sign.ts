import jwt from "jsonwebtoken"

// Ensure the JWT_SECRET environment variable is defined.
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error("Environment variable JWT_SECRET is not set.")
}

/**
 * Generate a JWT token.
 * @param payload - The payload to include in the token.
 * @param expiresIn - Token expiration time (default: "1h").
 * @returns The signed JWT token.
 */
export function signToken(payload: object, expiresIn = "1h"): string {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn })
}
