"use client"

import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { fetchMultipleResources } from "@/utils/api/api-client"
import { Encounter } from "@/lib/models/encounter"
import { Participant } from "@/lib/models/participant"
import { StatBlock } from "@/lib/models/stat-block"
import { CombatLog } from "@/lib/models/combat-log"

export default function GetUserRecords({ user }: { user: User | null }) {
  const [data, setData] = useState<{
    encounters: Encounter[]
    participants: Participant[]
    statBlocks: StatBlock[]
    combatLogs: CombatLog[]
  }>({
    encounters: [],
    participants: [],
    statBlocks: [],
    combatLogs: [],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isCancelled = false // To prevent updates after unmount

    const fetchData = async () => {
      if (!user) return // Ensure user exists before fetching
      setLoading(true)
      setError(null)

      try {
        const baseApiUrl = "/api"

        const [
          encountersResponse,
          participantsResponse,
          statBlocksResponse,
          combatLogsResponse,
        ] = await Promise.all([
          fetchMultipleResources<Encounter>(`${baseApiUrl}/encounters`),
          fetchMultipleResources<Participant>(`${baseApiUrl}/participants`),
          fetchMultipleResources<StatBlock>(`${baseApiUrl}/stat-blocks`),
          fetchMultipleResources<CombatLog>(`${baseApiUrl}/combat-logs`),
        ])

        if (!isCancelled) {
          setData({
            encounters: encountersResponse?.data,
            participants: participantsResponse?.data,
            statBlocks: statBlocksResponse?.data,
            combatLogs: combatLogsResponse?.data,
          })
        }
      } catch (err: any) {
        if (!isCancelled) {
          setError(err.message)
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isCancelled = true // Mark as cancelled on unmount
    }
  }, [user]) // Only run when `user` changes

  if (loading) {
    return <p>Loading data...</p>
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>
  }

  return (
    <div className="p-8 rounded-md shadow-lg max-w-4xl mx-auto mt-12 bg-[#1c1c1e] border border-[#2c2c2e]">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#e63946]">
        User Records
      </h1>
      {loading && <p className="text-center text-[#f4f4f5]">Loading data...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="space-y-6">
          {Object.entries(data).map(([key, value]) => (
            <div
              key={key}
              className="mb-6"
            >
              <h2 className="text-lg font-medium text-[#f4f4f5] capitalize mb-2">
                {key.replace(/([A-Z])/g, " $1")}
              </h2>
              <textarea
                readOnly
                className="block w-full h-40 bg-[#2c2c2e] text-[#f4f4f5] p-2 rounded-md border border-[#3c3c3e]"
                value={JSON.stringify(value, null, 2)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
