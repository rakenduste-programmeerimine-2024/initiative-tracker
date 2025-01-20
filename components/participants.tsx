"use client"

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"

export default function Participants() {
  const [participants, setParticipants] = useState([
    { name: "", dexterity: 10, dexModifier: 0, hp: 0, ac: 10 },
  ])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const supabase = createClient()

  const calculateDexModifier = (dexterity: number) =>
    Math.floor((dexterity - 10) / 2)

  const addParticipant = () => {
    setParticipants([
      ...participants,
      { name: "", dexterity: 10, dexModifier: 0, hp: 0, ac: 10 },
    ])
  }

  const removeParticipant = (index: number) => {
    if (index === 0) {
      setParticipants(prev =>
        prev.map((p, i) =>
          i === 0
            ? { ...p, name: "", dexterity: 10, dexModifier: 0, hp: 0, ac: 10 }
            : p,
        ),
      )
    } else {
      setParticipants(participants.filter((_, i) => i !== index))
    }
  }

  const saveParticipants = async () => {
    try {
      const user = await supabase.auth.getUser()
      if (!user?.data?.user) {
        console.error("User not logged in!")
        return
      }

      const userId = user.data.user.id

      const dataToSave = participants.map(participant => ({
        name: participant.name || "Unnamed",
        rolled_initiative: participant.dexterity, //tracker lehel oleks vaja teha, nii et rolli väärtus liidetakse sellele otsa, olex vaja luua dexModifier andmebaasi
        hit_points_max: participant.hp || 0,
        status: "Alive",
        is_public: false,
        user_id: userId,
        type: "Player",
      }))

      const { error } = await supabase
        .from("participants")
        .delete()
        .eq("user_id", userId)

      if (error) {
        console.error("Error clearing participants:", error.message)
        return
      }

      const { data, error: insertError } = await supabase
        .from("participants")
        .insert(dataToSave)

      if (insertError) {
        console.error("Error saving participants:", insertError.message)
        return
      }

      setNotification("Participants list saved successfully.")
      setTimeout(() => setNotification(null), 3000)
      console.log("Participants saved successfully:", data)
    } catch (error) {
      console.error("An unexpected error occurred:", error)
    }
  }

  const loadParticipants = async () => {
    try {
      const user = await supabase.auth.getUser()
      if (!user?.data?.user) {
        return
      }

      const userId = user.data.user.id

      const { data, error } = await supabase
        .from("participants")
        .select("*")
        .eq("user_id", userId)

      if (error) {
        console.error("Error loading participants:", error.message)
        return
      }

      if (data && data.length > 0) {
        const loadedParticipants = data.map(participant => ({
          name: participant.name || "",
          dexterity: participant.rolled_initiative || 10,
          dexModifier: calculateDexModifier(
            participant.rolled_initiative || 10,
          ),
          hp: participant.hit_points_max || 0,
          ac: 10 + calculateDexModifier(participant.rolled_initiative || 10),
        }))
        setParticipants(loadedParticipants)
      }
    } catch (error) {
      console.error("An unexpected error occurred while loading:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await supabase.auth.getUser()
      setIsLoggedIn(!!user?.data?.user)
    }

    checkLoginStatus()
    loadParticipants()
  }, [])

  return (
    <div className="p-6 bg-[#1c1c1e] rounded-md shadow-md">
      {loading ? (
        <p className="text-[#f4f4f5]">Loading participants...</p>
      ) : (
        <>
          {notification && (
            <div className="mb-4 bg-[#6a040f] text-white p-3 rounded">
              {notification}
            </div>
          )}
          
          {!isLoggedIn && (
            <div className="mb-4 bg-[#6a040f] text-white p-3 rounded">
              Log in to save your participants list.
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-[#f4f4f5]">
              <thead>
                <tr>
                  <th className="p-2 border-b border-[#2c2c2e]">Name</th>
                  <th className="p-2 border-b border-[#2c2c2e]">DEX</th>
                  <th className="p-2 border-b border-[#2c2c2e]">DEX Mod.</th>
                  <th className="p-2 border-b border-[#2c2c2e]">HP</th>
                  <th className="p-2 border-b border-[#2c2c2e]">AC</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant, index) => (
                  <tr
                    key={index}
                    className="text-center"
                  >
                    <td className="p-2 border-b border-[#2c2c2e]">
                      <input
                        type="text"
                        value={participant.name}
                        onChange={e =>
                          setParticipants(prev =>
                            prev.map((p, i) =>
                              i === index ? { ...p, name: e.target.value } : p,
                            ),
                          )
                        }
                        className="bg-[#2c2c2e] text-[#f4f4f5] rounded p-1 w-full"
                      />
                    </td>
                    <td className="p-2 border-b border-[#2c2c2e]">
                      <input
                        type="number"
                        value={participant.dexterity}
                        onChange={e => {
                          const dexterity = Number(e.target.value)
                          const dexModifier = calculateDexModifier(dexterity)
                          setParticipants(prev =>
                            prev.map((p, i) =>
                              i === index
                                ? {
                                    ...p,
                                    dexterity,
                                    dexModifier,
                                    ac: 10 + dexModifier,
                                  }
                                : p,
                            ),
                          )
                        }}
                        className="bg-[#2c2c2e] text-[#f4f4f5] rounded p-1 w-full"
                      />
                    </td>
                    <td className="p-2 border-b border-[#2c2c2e]">
                      <span>{participant.dexModifier}</span>
                    </td>
                    <td className="p-2 border-b border-[#2c2c2e]">
                      <input
                        type="number"
                        value={participant.hp}
                        onChange={e => {
                          const hp = Number(e.target.value)
                          setParticipants(prev =>
                            prev.map((p, i) =>
                              i === index ? { ...p, hp } : p,
                            ),
                          )
                        }}
                        className="bg-[#2c2c2e] text-[#f4f4f5] rounded p-1 w-full"
                      />
                    </td>
                    <td className="p-2 border-b border-[#2c2c2e]">
                      <span>{participant.ac}</span>
                    </td>
                    <td className="p-2 border-b border-[#2c2c2e]">
                      <button
                        onClick={() => removeParticipant(index)}
                        className="text-[#e63946] hover:text-[#f77f85] px-2 py-1 rounded"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={addParticipant}
              className="px-4 py-2 bg-[#6a040f] text-white rounded hover:bg-[#9d0208]"
            >
              Add Participant
            </button>
            {isLoggedIn && (
              <button
                onClick={saveParticipants}
                className="px-4 py-2 bg-[#6a040f] text-white rounded hover:bg-[#9d0208]"
              >
                Save Participants
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
