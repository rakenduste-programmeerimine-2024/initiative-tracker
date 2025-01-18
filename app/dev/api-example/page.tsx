import { createClient } from "@/utils/supabase/server"
import GetUserRecords from "@/examples/api-integration/get-user-records"
import ProfileExample from "@/examples/api-integration/profile-example"
import GenerateSampleData from "@/examples/api-integration/generate-sample-data"

export default async function ApiExamplePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <p className="text-center mt-20 text-[#f4f4f5]">
        You need to be logged in to view this page.
      </p>
    )
  }

  return (
    <div className="p-2 bg-[#1c1c1e] min-h-screen text-[#f4f4f5]">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#e63946]">
        API Integration Examples
      </h1>
      <div className="flex flex-wrap justify-center gap-2">
        <div className="flex flex-col flex-1 max-w-md p-2 bg-[#2c2c2e] rounded-md shadow-md border border-[#3c3c3e]">
          <GetUserRecords user={user} />
        </div>
        <div className="flex flex-col flex-1 max-w-md p-6 bg-[#2c2c2e] rounded-md shadow-md border border-[#3c3c3e]">
          <GenerateSampleData user={user} />
        </div>
        <div className="flex flex-col flex-1 max-w-md p-6 bg-[#2c2c2e] rounded-md shadow-md border border-[#3c3c3e]">
          <ProfileExample user={user} />
        </div>
      </div>
    </div>
  )
}
