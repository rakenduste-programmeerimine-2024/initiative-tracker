import { useState } from "react";

const StatRow = ({ stat, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStat, setEditedStat] = useState(stat);

  const handleSave = () => {
    onUpdate(editedStat);
    setIsEditing(false);
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
        />
        <input
          className="bg-gray-700 rounded px-2 py-1"
          value={editedStat.value}
          type={editedStat.type === 'Number' ? 'number' : 'text'}
          onChange={(e) => setEditedStat({
            ...editedStat,
            value: editedStat.type === 'Number' ? Number(e.target.value) : e.target.value
          })}
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
    <div className="grid grid-cols-2 gap-64 text-white/70 group hover:bg-gray-800 p-2 rounded transition-colors">
      <div>{stat.attributeName}</div>
      <div className="flex items-center justify-between">
        <span>{typeof stat.value === 'boolean' ? stat.value.toString() : stat.value}</span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
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