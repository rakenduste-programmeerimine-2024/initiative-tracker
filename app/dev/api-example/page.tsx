import { createClient } from "@/utils/supabase/server"
import ProfileExample from "@/examples/api-integration/profile-example"

export default async function ApiExamplePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <p className="text-center mt-20">
        You need to be logged in to view this page.
      </p>
    )
  }

  return (
    <div className="p-6">
      <h1>API Integration Example</h1>
      <ProfileExample user={user} />
    </div>
  )
}
