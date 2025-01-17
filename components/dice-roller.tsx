"use client"
import { useState } from "react"

interface DiceRollerProps {
  onBatchRoll: (rolls: number[]) => void
}

export default function DiceRoller({ onBatchRoll }: DiceRollerProps) {
  const [result, setResult] = useState<number | null>(null)

  const rollDice = (sides: number) => {
    const roll = Math.floor(Math.random() * sides) + 1
    setResult(roll)
  }

  const batchRoll = (sides: number, count: number) => {
    const rolls = Array.from(
      { length: count },
      () => Math.floor(Math.random() * sides) + 1,
    )
    onBatchRoll(rolls)
    return rolls
  }

  return (
    <div className="flex flex-col items-center p-4 bg-[#1c1c1e] text-[#f4f4f5] rounded-lg shadow-md border border-[#2c2c2e]">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => rollDice(20)}
          className="px-4 py-2 bg-[#e63946] text-white rounded shadow hover:bg-[#d62839] focus:outline-none"
        >
          Roll D20
        </button>
        <button
          onClick={() => rollDice(12)}
          className="px-4 py-2 bg-[#6a040f] text-white rounded shadow hover:bg-[#9d0208] focus:outline-none"
        >
          Roll D12
        </button>
        <button
          onClick={() => rollDice(6)}
          className="px-4 py-2 bg-[#2c2c2e] text-white rounded shadow hover:bg-[#3c3c3e] focus:outline-none"
        >
          Roll D6
        </button>
      </div>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => batchRoll(20, 5)}
          className="px-4 py-2 bg-[#e63946] text-white rounded shadow hover:bg-[#d62839] focus:outline-none"
        >
          Batch Roll D20
        </button>
        <button
          onClick={() => batchRoll(12, 5)}
          className="px-4 py-2 bg-[#6a040f] text-white rounded shadow hover:bg-[#9d0208] focus:outline-none"
        >
          Batch Roll D12
        </button>
        <button
          onClick={() => batchRoll(6, 5)}
          className="px-4 py-2 bg-[#2c2c2e] text-white rounded shadow hover:bg-[#3c3c3e] focus:outline-none"
        >
          Batch Roll D6
        </button>
      </div>
      {result !== null && (
        <p className="text-xl font-bold">
          You rolled: <span className="text-[#e63946]">{result}</span>
        </p>
      )}
    </div>
  )
}
