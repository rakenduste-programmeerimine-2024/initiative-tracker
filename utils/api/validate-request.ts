import {
  fetchUserId,
  getBaseUrl,
  getUserIdFromRequest,
} from "@/utils/api/request-utils"
import { createErrorResponse } from "@/utils/api/error-response"
import { NextRequest, NextResponse } from "next/server"

function getResourceTypeFromPath(path: string): string | null {
  const pathname = new URL(path).pathname
  const parts = pathname.split("/")
  const resourceType = parts[2] // Assuming the path is like '/api/resource-type/{id}'
  return resourceType || null
}

export async function validateRequest(
  request: NextRequest,
  requiresAuth: boolean = true,
  resourceId: string | null = null,
): Promise<string | NextResponse> {
  const userId = await getUserIdFromRequest(request)

  // Handle anonymous access if authentication is not required
  if (!userId) {
    if (requiresAuth) {
      return createErrorResponse("Unauthorized", 401) // Authentication required
    }
    return NextResponse.next() // Allow anonymous access for read-only actions
  }

  // Enforce user ID check for authenticated actions
  if (resourceId) {
    const resourceType = getResourceTypeFromPath(request.url)
    if (!resourceType) {
      return createErrorResponse("Resource type not found", 404)
    }

    let expectedUserId: string | null = null

    if (resourceType === "profiles") {
      expectedUserId = resourceId
    } else {
      let baseUrl = await getBaseUrl(request)
      expectedUserId = await fetchUserId(baseUrl, resourceId, resourceType)
    }

    if (expectedUserId && userId !== expectedUserId) {
      return createErrorResponse("Forbidden", 403) // Forbidden if user IDs don't match
    }
  }

  return userId // Return valid user ID
}
