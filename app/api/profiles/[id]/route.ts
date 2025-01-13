import { getProfile, updateProfile } from "@/lib/services/profile-service"
import { validateRequest } from "@/utils/api/validate-request"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params

  const validationResult = await validateRequest(req, id)
  if (validationResult instanceof NextResponse) return validationResult

  try {
    const profile = await getProfile(id)
    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params

  const validationResult = await validateRequest(req, id)
  if (validationResult instanceof NextResponse) return validationResult

  try {
    const updates = await req.json()
    await updateProfile(id, updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    )
  }
}
