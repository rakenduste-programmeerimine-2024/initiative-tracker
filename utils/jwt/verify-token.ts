import * as jose from "jose"

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
}

/**
 * Verify a JWT token.
 * @param token - The JWT token to verify.
 * @returns The decoded token payload.
 * @throws If the token is invalid or expired.
 */
export async function verifyToken<T>(token: string): Promise<T> {
  try {
    const { payload } = await jose.jwtVerify(token, jwtConfig.secret)
    return payload as T
  } catch (err) {
    throw new Error("Invalid or expired token")
  }
}
