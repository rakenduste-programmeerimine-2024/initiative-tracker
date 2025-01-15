
import { useContext, useEffect, useState } from "react";

const StatRow = ({ stat, onUpdate, onDelete, lastRoll }: { stat: any, onUpdate: any, onDelete: any, lastRoll: number | null }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStat, setEditedStat] = useState(stat);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState(null);
  const [previousValue, setPreviousValue] = useState(stat.value);

  useEffect(() => {
    setPreviousValue(stat.value);
  }, [stat.value]);

  const applyRoll = (operation: string) => {
    if (lastRoll === null || lastRoll === undefined || !Number.isInteger(stat.value)) return;

    const newValue = operation === 'add'
      ? Number(stat.value) + lastRoll
      : Number(stat.value) - lastRoll;

    setAnimationType(operation);
    setIsAnimating(true);

    // Reset animation after it completes
    setTimeout(() => {
      setIsAnimating(false);
      setAnimationType(null);
    }, 1000);

    onUpdate({ ...stat, value: newValue });
  };

  const getAnimationClass = () => {
    if (!isAnimating) return '';

    if (animationType === 'add') {
      return 'animate-value-increase';
    }
    return 'animate-value-decrease';
  };

  const handleSave = () => {
    onUpdate(editedStat);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const handleCancel = () => {
    setEditedStat(stat);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="grid grid-cols-3 gap-2 text-white/70 bg-gray-800 p-2 rounded">
        <input
          className="bg-gray-700 rounded px-2 py-1"
          value={editedStat.attributeName}
          onChange={(e) => setEditedStat({ ...editedStat, attributeName: e.target.value })}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <input
          className="bg-gray-700 rounded px-2 py-1"
          value={editedStat.value}
          type={editedStat.type === 'Number' ? 'number' : 'text'}
          onChange={(e) => setEditedStat({
            ...editedStat,
            value: editedStat.type === 'Number' ? Number(e.target.value) : e.target.value
          })}
          onKeyDown={(e) => handleKeyPress(e)}
        />

        <div className="col-span-3 flex gap-2 mt-2">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-2 py-1 rounded text-sm"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 text-white px-2 py-1 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 space-x-32 text-white/70 group hover:bg-gray-800 p-2 rounded transition-colors">
      <div>{stat.attributeName}</div>
      <div className="flex items-center justify-between">
        <div className="relative">
          <span className={getAnimationClass()}>
            {typeof stat.value === 'boolean' ? stat.value.toString() : stat.value}
          </span>

          {/* Floating number animation */}
          {isAnimating && (
            <span
              className={`
                absolute left-full ml-2 text-sm font-bold
                ${animationType === 'add'
                  ? 'text-green-400 animate-float-up'
                  : 'text-red-400 animate-float-down'}
              `}
            >
              {animationType === 'add' ? '+' : '-'}{lastRoll}
            </span>
          )}
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          {lastRoll !== null && (
            <>
              <button
                onClick={() => applyRoll('add')}
                className="text-green-400 hover:text-green-300 text-sm"
                title={`Add last roll (${lastRoll})`}
              >
                +{lastRoll}
              </button>
              <button
                onClick={() => applyRoll('subtract')}
                className="text-red-400 hover:text-red-300 text-sm"
                title={`Subtract last roll (${lastRoll})`}
              >
                -{lastRoll}
              </button>
            </>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-400 hover:text-blue-300"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(stat)}
            className="text-red-400 hover:text-red-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};


export default StatRow;