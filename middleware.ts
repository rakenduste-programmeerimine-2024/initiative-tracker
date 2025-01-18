import { NextRequest, NextResponse } from "next/server"
import { getUserIdFromRequest } from "./utils/api/request-utils"

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
}

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  let userId = await getUserIdFromRequest(request)

  if (userId) {
    requestHeaders.set("x-user-id", userId)
  } else {
    requestHeaders.set("x-user-id", "anonymous")
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  return response
}
