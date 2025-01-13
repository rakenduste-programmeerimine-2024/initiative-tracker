import { createRouteHandler } from "@/utils/api/create-route-handler"
import { getCurrentUserId } from "@/utils/api/user-utils"
import { getProfile, updateProfile } from "@/lib/services/profile-service"

export const GET = createRouteHandler(async (id, req) => {
  const profile = await getProfile(id!) // `id` will be present since `requiresId` is true by default
  return profile
})

export const PUT = createRouteHandler(async (id, req) => {
  const updates = await req!.json()
  await updateProfile(id!, updates)
  return { success: true }
})
