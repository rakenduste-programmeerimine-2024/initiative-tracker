'use client';
import { useState } from 'react';

const TabPanel = () => {
  const [tabs, setTabs] = useState([
    { id: 1, name: 'Name', active: true },
    { id: 2, name: 'Name', active: false },
    { id: 3, name: 'Name', active: false },
  ]);

  const handleTabClick = (clickedId) => {
    setTabs(tabs.map(tab => ({
      ...tab,
      active: tab.id === clickedId
    })));
  };

  const addNewTab = () => {
    const newTab = {
      id: tabs.length + 1,
      name: 'Name',
      active: false
    };
    setTabs([...tabs, newTab]);
  };

  return (
    <div className="bg-gray-900 p-6">
      <div className="flex items-end gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              px-4 py-2 rounded-t-lg transition-all duration-200
              ${tab.active 
                ? 'bg-green-700 text-white translate-y-0' 
                : 'bg-blue-800 text-white/80 translate-y-1 hover:translate-y-0.5'
              }
            `}
          >
            {tab.name}
          </button>
        ))}
        <button
          onClick={addNewTab}
          className="px-4 py-2 rounded-t-lg bg-gray-700 text-white translate-y-1 hover:translate-y-0.5 transition-all duration-200"
        >
          +
        </button>
      </div>
      
      {/* This is just to show which tab is active */}
      <div className="bg-gray-800 p-4 rounded-b-lg text-white">
        Active Tab: {tabs.find(tab => tab.active)?.id}
      </div>
    </div>
  );
};

export default TabPanel;