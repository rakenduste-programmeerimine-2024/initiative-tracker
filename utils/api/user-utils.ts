import { getUserIdFromRequest } from "@/middleware"

export async function getCurrentUserId(req: Request): Promise<string> {
  const userId = await getUserIdFromRequest(req)
  if (!userId) {
    throw new Error("Unauthorized")
  }
  return userId
}
