import React, { useState } from "react";
import { TabData } from ".";
import StatRow from "./StatRow";
import DiceRoller from "./DiceRoller";

const TabContent = ({ data, onUpdate }: { data: TabData, onUpdate: any }) => {
  const { name, images, stats, extraStats } = data;

  const [lastRoll, setLastRoll] = useState<number | null>(null);

  function onRoll(roll: number) {
    if (lastRoll !== roll) {
      setLastRoll(roll);
    }
  }

  const handleStatUpdate = (section: string, index: string | number, updatedStat: any) => {
    const newData = { ...data };
    newData[section][index] = updatedStat;
    onUpdate(newData);
  };

  const handleStatDelete = (section: string, index: any) => {
    const newData = { ...data };
    newData[section] = newData[section].filter((_: any, i: any) => i !== index);
    onUpdate(newData);
  };

  const handleAddStat = (section: string) => {
    const newData = { ...data };
    const newStat = {
      attributeName: 'New Stat',
      value: 0
    };
    newData[section] = [...newData[section], newStat];
    onUpdate(newData);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Title */}
      <h2 className="text-white text-xl mb-6">{name}</h2>

      <div className="flex gap-6">
        {/* Left Column - Images Section */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="aspect-square bg-red-900/80 rounded-lg flex items-center justify-center text-white overflow-hidden">
            {images.primary ? (
              <img
                src={images.primary}
                alt="Primary"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>Primary Image</span>
            )}
          </div>
          <DiceRoller onRoll={onRoll} />
        </div>

        <div className="w-2/3">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg">Stats</h3>
              <button
                onClick={() => handleAddStat('stats')}
                className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-500"
              >
                + Add Stat
              </button>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-64 text-white font-medium">
                <div>Attribute Name</div>
                <div>Value</div>
              </div>
              <div className="h-px bg-gray-700" />

              {data.stats.map((stat: unknown, index: React.Key | null | undefined) => (
                <StatRow
                  key={index}
                  stat={stat}
                  onUpdate={(updatedStat: any) => handleStatUpdate('stats', (index as any), updatedStat)}
                  onDelete={() => handleStatDelete('stats', index)}
                />
              ))}

              <div className="flex justify-between items-center pt-6 mb-4">
                <h3 className="text-white text-lg">Extra</h3>
                <button
                  onClick={() => handleAddStat('extraStats')}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-500"
                >
                  + Add Extra
                </button>
              </div>
              {data.extraStats.map((stat: unknown, index: React.Key | null | undefined) => (
                <StatRow
                  key={index}
                  stat={stat}
                  onUpdate={(updatedStat: any) => handleStatUpdate('extraStats', (index as any), updatedStat)}
                  onDelete={() => handleStatDelete('extraStats', index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabContent;