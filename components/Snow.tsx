import React, { useEffect, useState } from 'react';

const Snow: React.FC = () => {
  const [flakes, setFlakes] = useState<number[]>([]);

  useEffect(() => {
    // Generate static array of random numbers to avoid re-renders causing jitter
    setFlakes(Array.from({ length: 50 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {flakes.map((i) => {
        const left = Math.random() * 100;
        const animationDuration = 5 + Math.random() * 10;
        const delay = Math.random() * 5;
        const opacity = 0.3 + Math.random() * 0.7;
        const size = 0.5 + Math.random() * 0.5;

        return (
          <div
            key={i}
            className="absolute top-[-10px] bg-white rounded-full"
            style={{
              left: `${left}%`,
              width: `${size}rem`,
              height: `${size}rem`,
              opacity: opacity,
              animation: `fall ${animationDuration}s linear infinite`,
              animationDelay: `-${delay}s`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(0px); }
          100% { transform: translateY(110vh) translateX(20px); }
        }
      `}</style>
    </div>
  );
};

export default Snow;