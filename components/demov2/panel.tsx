'use client';
import { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from './localstorage';
import TabContent from './TabContent';

const TabPanel = () => {
  const [tabs, setTabs] = useLocalStorage('tabs', [
    {
      id: 1,
      name: 'Name',
      active: true,
      data: {
        name: 'Character Name',
        images: {
          primary: '',
          secondary: ''
        },
        stats: [
          {
            attributeName: 'Health',
            type: 'Number',
            value: 100
          },
          {
            attributeName: 'Strength',
            type: 'Number',
            value: 75
          },
          {
            attributeName: 'Class',
            type: 'String',
            value: 'Warrior'
          }
        ],
        extraStats: [
          {
            attributeName: 'Experience',
            type: 'Number',
            value: 1500
          },
          {
            attributeName: 'Level',
            type: 'Number',
            value: 30
          }
        ]
      }
    }
    // ... other tabs
  ]);

  const [editingId, setEditingId] = useState(null);
  const inputRef = useRef(null);

  // Handle click outside of input to stop editing
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (inputRef.current && (!inputRef.current as any).contains(event.target)) {
        setEditingId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabClick = (clickedId) => {
    setTabs(tabs.map(tab => ({
      ...tab,
      active: tab.id === clickedId
    })));
  };

  const handleDoubleClick = (id) => {
    setEditingId(id);
  };

  const handleNameChange = (id, newName) => {
    setTabs(tabs.map(tab =>
      tab.id === id ? { ...tab, name: newName } : tab
    ));
  };

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      setEditingId(null);
    }
  };

  const addNewTab = () => {
    const newTab = {
      id: Date.now(), // Using timestamp for unique id
      name: 'Name',
      active: false
    };
    setTabs([...tabs, newTab]);
  };

  const removeTab = (idToRemove, e) => {
    e.stopPropagation(); // Prevent tab activation when removing

    // If removing active tab, activate the previous tab
    if (tabs.find(tab => tab.id === idToRemove)?.active && tabs.length > 1) {
      const index = tabs.findIndex(tab => tab.id === idToRemove);
      const newActiveIndex = Math.max(0, index - 1);
      setTabs(prev => prev.map((tab, i) => ({
        ...tab,
        active: i === newActiveIndex
      })).filter(tab => tab.id !== idToRemove));
    } else {
      setTabs(prev => prev.filter(tab => tab.id !== idToRemove));
    }
  };

  return (
    <div className="bg-gray-900 p-6">
      <div className="flex items-end gap-1">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            onDoubleClick={() => handleDoubleClick(tab.id)}
            className={`
              group relative px-4 py-2 rounded-t-lg transition-all duration-200 cursor-pointer
              ${tab.active
                ? 'bg-green-700 text-white translate-y-0'
                : 'bg-blue-800 text-white/80 translate-y-1 hover:translate-y-0.5'
              }
            `}
          >
            {editingId === tab.id ? (
              <input
                ref={inputRef}
                type="text"
                value={tab.name}
                onChange={(e) => handleNameChange(tab.id, e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, tab.id)}
                onBlur={() => setEditingId(null)}
                className="bg-transparent outline-none w-full"
                autoFocus
              />
            ) : (
              <>
                <span>{tab.name}</span>
                {/* Only show remove button if we have more than one tab */}
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => removeTab(tab.id, e)}
                    className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                )}
              </>
            )}
          </div>
        ))}
        <button
          onClick={addNewTab}
          className="px-4 py-2 rounded-t-lg bg-gray-700 text-white translate-y-1 hover:translate-y-0.5 transition-all duration-200"
        >
          +
        </button>
      </div>

      {tabs.map(tab => tab.active && (
        <TabContent key={tab.id} data={tab.data} />
      ))}
    </div>
  );
};

export default TabPanel;