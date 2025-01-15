
import { createContext, useContext, useState } from 'react';

const DICE_TYPES = [
  { sides: 20, color: 'bg-gray-700/80 hover:bg-gray-600/80' },
  { sides: 12, color: 'bg-gray-700/80 hover:bg-gray-600/80' },
  { sides: 8, color: 'bg-gray-700/80 hover:bg-gray-600/80' },
  { sides: 6, color: 'bg-gray-700/80 hover:bg-gray-600/80' }
];

const SingleDice = ({ sides, color, onRoll }: typeof DICE_TYPES[number] & { onRoll: any }) => {
  const [currentRoll, setCurrentRoll] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    let rollCount = 0;
    const maxRolls = 20;
    const rollInterval = setInterval(() => {
      setCurrentRoll(Math.floor(Math.random() * sides) + 1);
      rollCount++;

      if (rollCount >= maxRolls) {
        clearInterval(rollInterval);
        const finalRoll = Math.floor(Math.random() * sides) + 1;
        setCurrentRoll(finalRoll);
        onRoll(finalRoll);
        setIsRolling(false);
      }
    }, 50);
  };

  return (
    <div
      onClick={rollDice}
      className={`
        aspect-square ${color} rounded-lg 
        flex items-center justify-center
        cursor-pointer transition-all duration-200
        ${isRolling ? 'scale-105' : 'scale-100'}
      `}
    >
      <div className='relative'>
        <div className="text-white text-sm font-bold mb-1 flex justify-center">
          d{sides}
        </div>
        <img src="/d20.png" alt="dice" className='object-cover' />
        <div className="flex flex-col items-center absolute inset-0 justify-center text-white text-xl font-bold ">
          <div
            className={`
            text-2xl font-bold text-white pt-4
            ${isRolling ? 'animate-bounce' : ''}
            `}
          >
            {currentRoll || '?'}
          </div>
        </div>
      </div>
    </div>
  );
};

const DiceRoller = (onRoll: any) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {DICE_TYPES.map(({ sides, color }) => (
        <SingleDice
          key={sides}
          sides={sides}
          color={color}
          onRoll={(roll: number) => onRoll.onRoll(roll)}
        />
      ))}
    </div>
  );
};

export default DiceRoller;