
import { useState, useRef, useEffect, MouseEvent } from 'react';
import { useLocalStorage } from "react-use";
import { Tab, TabData } from '.';
import { createNewTab } from './utils';
import dynamic from 'next/dynamic';

const TabContent = dynamic(() => import('./TabContent'), { ssr: false })

const TabPanel = () => {

  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [tabs, setTabs] = useLocalStorage('tabs', [
    {
      id: 1,
      name: 'Name',
      active: true,
      data: {
        name: 'Character Name',
        images: {
          primary: ''
        },
        stats: [
          {
            attributeName: 'Health',
            value: 100
          },
          {
            attributeName: 'Strength',
            value: 75
          },
          {
            attributeName: 'Class',
            value: 'Warrior'
          }
        ],
        extraStats: [
          {
            attributeName: 'Agility',
            value: 50
          },
          {
            attributeName: 'Dexterity',
            value: 30
          },
          {
            attributeName: 'Intelligence',
            value: 20
          },
          {
            attributeName: 'Charisma',
            value: 10
          }
        ]
      }
    }
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const inputRef = useRef(null);

  // Handle click outside of input to stop editing
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

  const handleTabClick = (clickedId: number) => {
    setTabs(tabs!.map(tab => ({
      ...tab,
      active: tab.id === clickedId
    })));
  };

  const handleDoubleClick = (id: number) => {
    setEditingId(id);
  };

  const handleNameChange = (id: number, newName: string) => {
    setTabs(tabs!.map(tab =>
      tab.id === id ? { ...tab, name: newName } : tab
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter') {
      setEditingId(null);
    }
  };

  const addNewTab = () => {
    const newTab = createNewTab(tabs!.length + 1);
    setTabs([...tabs!, newTab]);
  };

  const removeTab = (idToRemove: number, e: MouseEvent) => {
    e.stopPropagation(); // Prevent tab activation when removing

    // If removing active tab, activate the previous tab
    if (tabs!.find(tab => tab.id === idToRemove)?.active && tabs!.length > 1) {
      const index = tabs!.findIndex(tab => tab.id === idToRemove);
      const newActiveIndex = Math.max(0, index - 1);
      setTabs((prevTabs: any) => {
        const updatedTabs = prevTabs.map((tab: Tab, i: number) => ({
          ...tab,
          active: i === newActiveIndex
        }));
        return updatedTabs.filter((tab: Tab) => tab.id !== idToRemove) as unknown as any;
      });
    } else {
      setTabs((prevTabs: any) => {
        const index = prevTabs.findIndex((tab: any) => tab.id === idToRemove);
        const newTabs = prevTabs.filter((tab: any) => tab.id !== idToRemove);
        if (newTabs.length > 0) {
          if (index > 0) {
            newTabs[index - 1].active = true;
          } else {
            newTabs[0].active = true;
          }
        }
        return newTabs;
      });
    }
  };

  const handleTabDataUpdate = (tabId: number, newData: TabData) => {
    setTabs(tabs!.map((tab: any) =>
      tab.id === tabId
        ? { ...tab, data: newData }
        : tab
    ));
  };

  const handleRoll = (roll: number) => {
    if (lastRoll !== roll) {
      setLastRoll(roll);
    }
  }

  function handleReset() {
    localStorage.removeItem("tabs");
    window.location.reload();
  }

  return (
    <div className="bg-gray-900 p-6 relative">
      <button
        onClick={handleReset}
        className="absolute top-0 right-0 m-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-200"
      >
        Reset
      </button>

      <div className="flex items-end gap-1">
        {tabs!.map((tab) => (
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
                onKeyDown={(e) => handleKeyPress(e, tab.id)}
                onBlur={() => setEditingId(null)}
                className="bg-transparent outline-none w-full"
                autoFocus
              />
            ) : (
              <>
                <span>{tab.name}</span>
                {/* Only show remove button if we have more than one tab */}
                {tabs!.length > 1 && (
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

      {tabs!.map(tab => tab.active && (
        <TabContent
          key={tab.id}
          data={tab.data}
          onUpdate={(newData: TabData) => handleTabDataUpdate(tab.id, newData)}
          onRoll={(roll: number) => handleRoll(roll)}
          lastRoll={lastRoll}
        />
      ))}
    </div>
  );
};

export default TabPanel;