import { validateRequest } from "@/utils/api/validate-request"
import { NextResponse } from "next/server"

type HandlerFunction = (id: string | null, req: Request) => Promise<any>

export function createRouteHandler(
  handler: HandlerFunction,
  requiresId: boolean = true,
): (
  req: Request,
  context: { params?: { id: string } },
) => Promise<NextResponse> {
  return async (req, context) => {
    let id: string | null = null

    if (requiresId) {
      const params = await context.params // Await the asynchronous params

      if (!params?.id) {
        return NextResponse.json(
          { error: "Missing required parameter: id" },
          { status: 400 },
        )
      }

      id = params.id
    }

    const userIdOrError = await validateRequest(req, id || "")
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
