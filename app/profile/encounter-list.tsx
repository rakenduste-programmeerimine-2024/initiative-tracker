"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation"

interface Encounter {
  id: string
  name: string
  created_at: string
}

export default function EncounterList({ userId }: { userId: string }) {
  const router = useRouter()

  const [encounters, setEncounters] = useState<Encounter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEncounters = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("encounters")
        .select("id, name, created_at")
        .eq("user_id", userId)

      if (error) {
        console.error("Error fetching encounters:", error)
      } else {
        setEncounters(data || [])
      }

      setLoading(false)
    }

    fetchEncounters()
  }, [userId])

  if (loading) {
    return <p className="text-center text-gray-500">Loading encounters...</p>
  }

  if (encounters.length === 0) {
    return (
      <p className="text-center text-gray-500">No saved encounters found.</p>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-[#e63946]">
        Saved Encounters
      </h2>
      <ul className="space-y-2">
        {encounters.map(encounter => (
          <li
            key={encounter.id}
            className="p-4 bg-gray-800 rounded-md shadow-md"
          >
            <h3 className="text-lg font-semibold text-[#f4f4f5]">
              {encounter.name}
            </h3>
            <p className="text-sm text-gray-400">
              Saved on: {new Date(encounter.created_at).toLocaleString()}
            </p>
            <button
              className="mt-2 px-4 py-2 bg-[#2c2c2e] text-white rounded shadow hover:bg-[#3c3c3e]"
              onClick={() =>
                router.push(`/tracker?encounterId=${encounter.id}`)
              }
            >
              Reopen Encounter
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}