"use client";

import { useState } from "react";

export default function Tracker() {
  const [participants, setParticipants] = useState([
    { initiative: "", name: "", hp: "", ac: "" },
  ]);
  const [round, setRound] = useState(1);

  const addParticipant = () => {
    setParticipants([...participants, { initiative: "", name: "", hp: "", ac: "" }]);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const clearParticipants = () => {
    setParticipants([]);
  };

  const nextRound = () => {
    setRound((prev) => prev + 1);
  };

  const sortParticipants = () => {
    setParticipants((prev) =>
      [...prev].sort((a, b) => (Number(b.initiative) || 0) - (Number(a.initiative) || 0))
    );
  };

  return (
    <div className="p-6 bg-[#1c1c1e] rounded-md shadow-md">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-[#f4f4f5]">
          <thead>
            <tr>
              <th className="p-2 border-b border-[#2c2c2e]">Initiative</th>
              <th className="p-2 border-b border-[#2c2c2e]">Name</th>
              <th className="p-2 border-b border-[#2c2c2e]">HP</th>
              <th className="p-2 border-b border-[#2c2c2e]">AC</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border-b border-[#2c2c2e]">
                  <input
                    type="number"
                    value={participant.initiative}
                    onChange={(e) =>
                      setParticipants((prev) =>
                        prev.map((p, i) =>
                          i === index ? { ...p, initiative: e.target.value } : p
                        )
                      )
                    }
                    className="bg-[#2c2c2e] text-[#f4f4f5] rounded p-1 w-full"
                  />
                </td>
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
                    value={participant.hp}
                    onChange={(e) =>
                      setParticipants((prev) =>
                        prev.map((p, i) =>
                          i === index ? { ...p, hp: e.target.value } : p
                        )
                      )
                    }
                    className="bg-[#2c2c2e] text-[#f4f4f5] rounded p-1 w-full"
                  />
                </td>
                <td className="p-2 border-b border-[#2c2c2e]">
                  <input
                    type="number"
                    value={participant.ac}
                    onChange={(e) =>
                      setParticipants((prev) =>
                        prev.map((p, i) =>
                          i === index ? { ...p, ac: e.target.value } : p
                        )
                      )
                    }
                    className="bg-[#2c2c2e] text-[#f4f4f5] rounded p-1 w-full"
                  />
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

      {/* Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="space-x-2">
          <button
            onClick={nextRound}
            className="px-4 py-2 bg-[#6a040f] text-white rounded hover:bg-[#9d0208]"
          >
            Next
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
  );
}
