import { getProfile, updateProfile } from "@/lib/services/profile-service"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const profile = await getProfile(params.id)
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
  try {
    const updates = await req.json()
    await updateProfile(params.id, updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    )
  }
}
