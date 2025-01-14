"use client";

import { useState } from "react";

export default function Participants() {
  const [participants, setParticipants] = useState([
    { name: "", dexterity: 10, dexModifier: 0, hp: 0, ac: 10 },
  ]);

  const calculateDexModifier = (dexterity: number) => Math.floor((dexterity - 10) / 2);

  const addParticipant = () => {
    setParticipants([
      ...participants,
      { name: "", dexterity: 10, dexModifier: 0, hp: 0, ac: 10 },
    ]);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-[#1c1c1e] rounded-md shadow-md">
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
              <tr key={index} className="text-center">
                <td className="p-2 border-b border-[#2c2c2e]">
                  <input
                    type="text"
                    value={participant.name}
                    onChange={(e) =>
                      setParticipants((prev) =>
                        prev.map((p, i) =>
                          i === index ? { ...p, name: e.target.value } : p
                        )
                      )
                    }
                    className="bg-[#2c2c2e] text-[#f4f4f5] rounded p-1 w-full"
                  />
                </td>
                <td className="p-2 border-b border-[#2c2c2e]">
                  <input
                    type="number"
                    value={participant.dexterity}
                    onChange={(e) => {
                      const dexterity = Number(e.target.value);
                      const dexModifier = calculateDexModifier(dexterity);
                      setParticipants((prev) =>
                        prev.map((p, i) =>
                          i === index
                            ? { ...p, dexterity, dexModifier, ac: 10 + dexModifier }
                            : p
                        )
                      );
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
                    onChange={(e) => {
                      const hp = Number(e.target.value);
                      setParticipants((prev) =>
                        prev.map((p, i) =>
                          i === index ? { ...p, hp } : p
                        )
                      );
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
      </div>
    </div>
  );
}
