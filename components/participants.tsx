"use client";

import { useState } from "react";

export default function Participants() {
  const [participants, setParticipants] = useState([
    { name: "", dexterity: 10, dexModifier: 0 },
  ]);

  const calculateDexModifier = (dexterity: number) => Math.floor((dexterity - 10) / 2);

  const addParticipant = () => {
    setParticipants([...participants, { name: "", dexterity: 10, dexModifier: 0 }]);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Participants</h1>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>
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
            />
            <input
              type="number"
              value={participant.dexterity}
              onChange={(e) => {
                const dexterity = Number(e.target.value);
                setParticipants((prev) =>
                  prev.map((p, i) =>
                    i === index
                      ? { ...p, dexterity, dexModifier: calculateDexModifier(dexterity) }
                      : p
                  )
                );
              }}
            />
            <span>DEX Mod: {participant.dexModifier}</span>
            <button onClick={() => removeParticipant(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={addParticipant}>Add Participant</button>
    </div>
  );
}
