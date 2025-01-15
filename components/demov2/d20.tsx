'use client';
import { useState } from 'react';

const D20Dice = () => {
  const [currentRoll, setCurrentRoll] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    // Animate through random numbers quickly
    let rollCount = 0;
    const maxRolls = 20; // Number of animation frames
    const rollInterval = setInterval(() => {
      setCurrentRoll(Math.floor(Math.random() * 20) + 1);
      rollCount++;

      if (rollCount >= maxRolls) {
        clearInterval(rollInterval);
        // Final roll
        const finalRoll = Math.floor(Math.random() * 20) + 1;
        setCurrentRoll(finalRoll);
        setIsRolling(false);
      }
    }, 50); // Speed of animation
  };

  return (
    <div
      onClick={rollDice}
      className={`
        aspect-square bg-red-900/80 rounded-lg 
        flex items-center justify-center
        cursor-pointer hover:bg-red-800/80
        transition-all duration-200
        ${isRolling ? 'scale-105' : 'scale-100'}
      `}
    >
      <div className="relative">
        {/* D20 Icon */}
        <svg
          viewBox="0 0 24 24"
          className={`w-12 h-12 text-white ${isRolling ? 'animate-spin' : ''}`}
        >
          <path
            fill="currentColor"
            d="M12,2L1.5,9.64L5.5,22H18.5L22.5,9.64L12,2M17,20H7L3.85,10.4L12,4.47L20.15,10.4L17,20Z"
          />
        </svg>

        {/* Roll Result */}
        {currentRoll && (
          <div
            className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              font-bold text-white text-xl
              ${isRolling ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}
              transition-all duration-200
            `}
          >
            {currentRoll}
          </div>
        )}
      </div>
    </div>
  );
};

export default D20Dice;