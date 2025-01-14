import jwt from "jsonwebtoken"

// Ensure the JWT_SECRET environment variable is defined.
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error("Environment variable JWT_SECRET is not set.")
}

/**
 * Verify a JWT token.
 * @param token - The JWT token to verify.
 * @returns The decoded token payload.
 * @throws If the token is invalid or expired.
 */
export function verifyToken<T>(token: string): T {
  return jwt.verify(token, JWT_SECRET as string) as T
}
