"use client";

import { useState } from "react";

export default function Tracker() {
  const [participants, setParticipants] = useState([
    { initiative: "", name: "", hp: "", ac: "" },
  ]);
  const [round, setRound] = useState(1);

  return (
    <div className="p-6 bg-[#1c1c1e] rounded-md shadow-md">
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
        </table>
      </div>
    </div>
  );
}
  