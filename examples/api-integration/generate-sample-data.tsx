"use client"

import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import {
  createResource,
  deleteResource,
  fetchMultipleResources,
} from "@/utils/api/api-client"
import { CombatLog, CombatLogUtils } from "@/lib/models/combat-log"
import { Encounter, EncounterUtils } from "@/lib/models/encounter"
import { Participant, ParticipantUtils } from "@/lib/models/participant"
import { StatBlock, StatBlockUtils } from "@/lib/models/stat-block"
import { ParticipantStatus } from "@/types/enums/participant-enums"

export default function GenerateSampleData({ user }: { user: User | null }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function createRandomStatBlock(): Promise<string> {
    const randomStatBlock = StatBlockUtils.create({
      name: `Random Stat Block ${Math.random().toString(36).substr(2, 5)}`,
      dexterity_score: Math.floor(Math.random() * 30) + 1,
      hit_points_average: Math.floor(Math.random() * 50) + 20,
      hit_points_formula: `${Math.floor(Math.random() * 4) + 1}d6+${
        Math.floor(Math.random() * 10) + 1
      }`,
      base_armor_class: Math.floor(Math.random() * 5) + 10,
      dex_applies_to_ac: true,
      speed: Math.floor(Math.random() * 30) + 10,
      user_id: user?.id,
    })

    const statBlock = (await createResource(
      "/api/stat-blocks",
      randomStatBlock,
    )) as StatBlock
    return statBlock.id
  }

  async function createRandomEncounter(): Promise<string> {
    const randomEncounter = EncounterUtils.create({
      name: `Random Encounter ${Math.random().toString(36).substr(2, 5)}`,
      user_id: user?.id,
    })

    const encounter = (await createResource(
      "/api/encounters",
      randomEncounter,
    )) as Encounter
    return encounter.id
  }

  async function createRandomParticipant(
    encounterId: string,
    statBlockId: string | null,
  ): Promise<string> {
    const randomParticipant = ParticipantUtils.create({
      name: `Random Participant ${Math.random().toString(36).substr(2, 5)}`,
      encounter_id: encounterId,
      stat_block_id: statBlockId,
      rolled_initiative: Math.floor(Math.random() * 20) + 1,
      hit_points_max: Math.floor(Math.random() * 50) + 50,
      group_no: Math.floor(Math.random() * 5) + 1,
      status: ParticipantStatus.Alive,
      user_id: user?.id,
    })

    const participant = (await createResource(
      "/api/participants",
      randomParticipant,
    )) as Participant
    return participant.id
  }

  async function createCombatLog(
    encounterId: string,
    participantId: string,
    roundNo: number,
  ): Promise<string> {
    const randomCombatLog = CombatLogUtils.create({
      encounter_id: encounterId,
      participant_id: participantId,
      round_no: roundNo,
      hit_points_current: Math.floor(Math.random() * 100),
      death_save_successes: -1, // Default value for no death saves
      death_save_failures: -1, // Default value for no death saves
      user_id: user?.id,
    })

    const combatLog = (await createResource(
      "/api/combat-logs",
      randomCombatLog,
    )) as CombatLog
    return combatLog.id
  }

  const seedData = async () => {
    setLoading(true)
    setMessage(null)

    try {
      // Create an encounter
      const encounterId = await createRandomEncounter()

      // Create 2-3 stat blocks
      const numberOfStatBlocks = Math.floor(Math.random() * 2) + 2 // Randomly selects 2 or 3
      const statBlockIds = await Promise.all(
        Array.from({ length: numberOfStatBlocks }, () =>
          createRandomStatBlock(),
        ),
      )

      // Create participants for the encounter
      const participantIds = []
      for (const statBlockId of statBlockIds) {
        const numParticipants = Math.floor(Math.random() * 2) + 1
        for (let i = 0; i < numParticipants; i++) {
          const participantId = await createRandomParticipant(
            encounterId,
            statBlockId,
          )
          participantIds.push(participantId)
        }
      }

      // Randomize the total number of turns between 2 and 4
      const totalTurns = Math.floor(Math.random() * (4 - 2 + 1)) + 2

      for (let turnNo = 1; turnNo <= totalTurns; turnNo++) {
        for (const participantId of participantIds) {
          // Create a combat log for the current participant and turn
          await createCombatLog(encounterId, participantId, turnNo)
        }
      }

      setMessage("Sample data created successfully!")
    } catch (error: any) {
      console.error("Error generating sample data:", error.message)
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const wipeData = async () => {
    setLoading(true)
    setMessage(null)

    try {
      // Fetch and delete all combat logs
      const combatLogs =
        await fetchMultipleResources<CombatLog>("/api/combat-logs")

      if (combatLogs?.data?.length > 0) {
        for (const combatLog of combatLogs.data) {
          await deleteResource(`/api/combat-logs/${combatLog.id}/hard-delete`)
        }
      }

      // Fetch and delete all participants
      const participants =
        await fetchMultipleResources<Participant>("/api/participants")

      if (participants?.data?.length > 0) {
        for (const participant of participants.data) {
          await deleteResource(
            `/api/participants/${participant.id}/hard-delete`,
          )
        }
      }

      // Fetch and delete all encounters
      const encounters =
        await fetchMultipleResources<Encounter>("/api/encounters")

      if (encounters?.data?.length > 0) {
        for (const encounter of encounters.data) {
          await deleteResource(`/api/encounters/${encounter.id}/hard-delete`)
        }
      }

      // Fetch and delete all stat blocks
      const statBlocks =
        await fetchMultipleResources<StatBlock>("/api/stat-blocks")

      if (statBlocks?.data?.length > 0) {
        for (const statBlock of statBlocks.data) {
          await deleteResource(`/api/stat-blocks/${statBlock.id}/hard-delete`)
        }
      }

      setMessage("All data has been wiped successfully!")
    } catch (error: any) {
      console.error("Error wiping data:", error.message)
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 rounded-md shadow-lg max-w-lg mx-auto mt-12 bg-[#1c1c1e] border border-[#2c2c2e]">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#e63946]">
        Sample Data
      </h1>

      <div className="space-y-4">
        {/* Seed Data Button */}
        <button
          onClick={() => {
            seedData()
          }}
          disabled={loading}
          className={`w-full px-6 py-2 rounded-md shadow-md text-white ${
            loading
              ? "bg-[#3c3c3e] cursor-not-allowed"
              : "bg-[#e63946] hover:bg-[#d62839]"
          } mb-4`} // Added margin-bottom for space
        >
          {loading ? "Generating Data..." : "Generate Sample Data"}
        </button>

        {/* Wipe Data Button */}
        <button
          onClick={() => {
            wipeData()
          }}
          disabled={loading}
          className={`w-full px-6 py-2 rounded-md shadow-md text-white ${
            loading
              ? "bg-[#3c3c3e] cursor-not-allowed"
              : "bg-[#f1faee] hover:bg-[#a8dadc]" // Different color for Wipe button
          }`}
        >
          {loading ? "Wiping User Records..." : "Wipe User Records"}
        </button>
      </div>

      {message && <p className="mt-4 text-center text-[#f4f4f5]">{message}</p>}
    </div>
  )
}
