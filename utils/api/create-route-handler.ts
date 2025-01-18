import { validateRequest } from "@/utils/api/validate-request"
import { NextRequest, NextResponse } from "next/server"

type HandlerFunction = (id: string | null, req: NextRequest) => Promise<any>

export function createRouteHandler(
  handler: HandlerFunction,
  requiresAuth: boolean = true,
  requiresId: boolean = true,
): (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => Promise<NextResponse> {
  return async (req, { params }) => {
    const id = (await params)?.id

    if (requiresId && !id) {
      return NextResponse.json(
        { error: "Missing required parameter: id" },
        { status: 400 },
      )
    }

    // Skip user validation for read actions (when requiresAuth is false)
    const userIdOrError = requiresAuth
      ? await validateRequest(req, true, id || null)
      : null

    if (userIdOrError instanceof NextResponse) {
      return userIdOrError
    }

    try {
      const result = await handler(id, req)
      return NextResponse.json(result)
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 400 },
      )
    }
  }
}
