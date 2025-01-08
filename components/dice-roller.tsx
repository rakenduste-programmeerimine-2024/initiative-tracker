"use client";

import { useState } from "react";

export default function DiceRoller() {
  const [result, setResult] = useState<number | null>(null);

  const rollDice = (sides: number) => {
    const roll = Math.floor(Math.random() * sides) + 1;
    setResult(roll);
  };

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
      {result !== null && (
        <p className="text-xl font-bold">
          You rolled: <span className="text-[#e63946]">{result}</span>
        </p>
      )}
    </div>
  );
}
