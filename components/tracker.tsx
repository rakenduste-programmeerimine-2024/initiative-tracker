"use client"
import { useState } from "react"
import DiceRoller from "./dice-roller"

export default function Tracker() {
  const [participants, setParticipants] = useState([
    { initiative: "", name: "", hp: "", ac: "", group: "", selected: false },
  ])
  const [round, setRound] = useState(1)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleBatchRoll = (rolls: number[]) => {
    setParticipants(prev =>
      prev.map((p, i) =>
        p.selected && rolls[i] !== undefined
          ? { ...p, initiative: rolls[i].toString() }
          : p,
      ),
    )
  }

  const addParticipant = () => {
    setParticipants([
      ...participants,
      { initiative: "", name: "", hp: "", ac: "", group: "", selected: false },
    ])
  }

  const removeParticipant = (index: number) => {
    if (index === 0) {
      setParticipants(prev =>
        prev.map((p, i) =>
          i === 0
            ? {
                initiative: "",
                name: "",
                hp: "",
                ac: "",
                group: "",
                selected: false,
              }
            : p,
        ),
      )
    } else {
      setParticipants(prev => prev.filter((_, i) => i !== index))
      if (activeIndex >= participants.length - 1 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1)
      }
    }
  }

  const clearParticipants = () => {
    setParticipants([
      { initiative: "", name: "", hp: "", ac: "", group: "", selected: false },
    ])
    setActiveIndex(0)
  }

  const nextRound = () => {
    setRound(prev => prev + 1)
    advanceTurn()
  }

  const sortParticipants = () => {
    setParticipants(prev =>
      [...prev].sort(
        (a, b) => (Number(b.initiative) || 0) - (Number(a.initiative) || 0),
      ),
    )
    setActiveIndex(0)
  }

  const advanceTurn = () => {
    setActiveIndex(prev => (prev + 1) % participants.length)
  }

  const toggleSelect = (index: number) => {
    setParticipants(prev =>
      prev.map((p, i) => (i === index ? { ...p, selected: !p.selected } : p)),
    )
  }

  const getHpColor = (hp: string) => {
    const value = Number(hp)
    if (value > 80) return "bg-[#4caf50]"
    if (value >= 40) return "bg-[#ffeb3b]"
    return "bg-[#f44336]"
  }

  return (
    <div className="p-6 bg-[#1c1c1e] rounded-md shadow-md">
      <DiceRoller onBatchRoll={handleBatchRoll} />
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-[#f4f4f5]">
          <thead>
            <tr>
              <th className="p-2 border-b border-[#2c2c2e]">Select</th>
              <th className="p-2 border-b border-[#2c2c2e]">Initiative</th>
              <th className="p-2 border-b border-[#2c2c2e]">Name</th>
              <th className="p-2 border-b border-[#2c2c2e]">HP</th>
              <th className="p-2 border-b border-[#2c2c2e]">AC</th>
              <th className="p-2 border-b border-[#2c2c2e]">Group</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <tr
                key={index}
                className={`text-center ${
                  index === activeIndex ? "bg-[#3c3c3e] text-[#f77f85]" : ""
                }`}
              >
                <td className="p-2 border-b border-[#2c2c2e]">
                  <input
                    type="checkbox"
                    checked={participant.selected}
                    onChange={() => toggleSelect(index)}
                    className="form-checkbox"
                  />
                </td>
                <td className="p-2 border-b border-[#2c2c2e]">
                  <input
                    type="number"
                    value={participant.initiative}
                    onChange={e =>
                      setParticipants(prev =>
                        prev.map((p, i) =>
                          i === index
                            ? { ...p, initiative: e.target.value }
                            : p,
                        ),
                      )
                    }
                    className="bg-[#2c2c2e] text-[#f4f4f5] rounded p-1 w-full"
                  />
                </td>
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
                    value={participant.hp}
                    onChange={e =>
                      setParticipants(prev =>
                        prev.map((p, i) =>
                          i === index ? { ...p, hp: e.target.value } : p,
                        ),
                      )
                    }
                    className={`text-[#1c1c1e] rounded p-1 w-full ${getHpColor(
                      participant.hp,
                    )}`}
                  />
                </td>
                <td className="p-2 border-b border-[#2c2c2e]">
                  <input
                    type="number"
                    value={participant.ac}
                    onChange={e =>
                      setParticipants(prev =>
                        prev.map((p, i) =>
                          i === index ? { ...p, ac: e.target.value } : p,
                        ),
                      )
                    }
                    className="bg-[#2c2c2e] text-[#f4f4f5] rounded p-1 w-full"
                  />
                </td>
                <td className="p-2 border-b border-[#2c2c2e]">
                  <select
                    value={participant.group}
                    onChange={e =>
                      setParticipants(prev =>
                        prev.map((p, i) =>
                          i === index ? { ...p, group: e.target.value } : p,
                        ),
                      )
                    }
                    className="bg-[#2c2c2e] text-[#f4f4f5] rounded p-1 w-full"
                  >
                    <option value="">Select</option>
                    <option value="Group A">1</option>
                    <option value="Group B">2</option>
                    <option value="Group C">3</option>
                    <option value="Group D">4</option>
                    <option value="Group E">5</option>
                  </select>
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
        <div className="space-x-2">
          <button
            onClick={advanceTurn}
            className="px-4 py-2 bg-[#6a040f] text-white rounded hover:bg-[#9d0208]"
          >
            Next Turn
          </button>
          <button
            onClick={nextRound}
            className="px-4 py-2 bg-[#6a040f] text-white rounded hover:bg-[#9d0208]"
          >
            Next Round
          </button>
          <button
            onClick={sortParticipants}
            className="px-4 py-2 bg-[#d90429] text-white rounded hover:bg-[#ef233c]"
          >
            Sort
          </button>
          <button
            onClick={clearParticipants}
            className="px-4 py-2 bg-[#2c2c2e] text-white rounded shadow hover:bg-[#3c3c3e]"
          >
            Clear
          </button>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#f4f4f5]">Round {round}</p>
          <button
            onClick={addParticipant}
            className="w-10 h-10 bg-[#e65151] text-white rounded-full flex items-center justify-center hover:bg-[#219a86]"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
