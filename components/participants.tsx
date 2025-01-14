"use client";

import { useState } from "react";

export default function Participants() {
  const [participants, setParticipants] = useState([
    { name: "" },
  ]);

  const addParticipant = () => {
    setParticipants([...participants, { name: "" }]);
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
            <button onClick={() => removeParticipant(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={addParticipant}>Add Participant</button>
    </div>
  );
}
