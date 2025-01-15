
import { useEffect, useRef, useState } from "react";
import { TabData } from ".";
import DiceRoller from "./DiceRoller";
import dynamic from "next/dynamic";
import ImageUploader from "./Image";

const StatRow = dynamic(() => import('./StatRow'), { ssr: false })


const TabContent = ({ data, onUpdate, onRoll, lastRoll }: { data: TabData, onUpdate: any, onRoll: any, lastRoll: number }) => {
  const { name, images, stats, extraStats } = data;

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


  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      try {
        if (inputRef.current && (!inputRef.current as any).contains(event.target)) {
          setEditingId(null);
        }
      } catch (error) { }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [editingId, setEditingId] = useState<number | null>(null);
  const inputRef = useRef(null);
  const handleDoubleClick = (id: number) => {
    setEditingId(id);
  };

  const handleNameChange = (id: number, newName: string) => {
    const newData = { ...data };

    newData.name = newName;
    onUpdate(newData);
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter') {
      setEditingId(null);
    }
  };


  function handleImageChange(image: string) {
    const newData = { ...data };

    newData.images.primary = image;
    onUpdate(newData);
  }


  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div onDoubleClick={() => handleDoubleClick(1)}>
        {editingId === 1 ? (
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => handleNameChange(1, e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 1)}
            onBlur={() => setEditingId(null)}
            className="bg-transparent outline-none w-full text-white text-xl mb-6"
            autoFocus
          />
        ) : (
          <h2 className="text-white text-xl mb-6">{name}</h2>
        )}
      </div>

      <div className="flex gap-6">
        {/* Left Column - Images Section */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="aspect-square rounded-lg flex items-center justify-center text-white overflow-hidden">
            <ImageUploader image={images.primary} onUpdate={handleImageChange} />
          </div>
          <DiceRoller onRoll={(roll: number) => onRoll(roll)} />
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
              <div className="grid grid-cols-2 space-x-32 text-white font-medium">
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
                  lastRoll={lastRoll}
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
                  onDelete={() => handleStatDelete('extraStats', index)} lastRoll={lastRoll} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabContent;