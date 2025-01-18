import * as jose from "jose"

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
}

/**
 * Generate a JWT token.
 * @param payload - The payload to include in the token.
 * @param expiresIn - Token expiration time (default: "1h").
 * @returns The signed JWT token.
 */
export async function signToken(
  payload: jose.JWTPayload,
  expiresIn = "1h",
): Promise<string> {
  const iat = Math.floor(Date.now() / 1000) // Issued at time
  const exp = Math.floor(Date.now() / 1000) + parseInt(expiresIn) * 60 * 60 // Expiration time

  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(jwtConfig.secret)
}
