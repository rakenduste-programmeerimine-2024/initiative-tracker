import React, { useRef, useEffect } from 'react';

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize Three.js scene here
    }
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeScene;