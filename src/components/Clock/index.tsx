// src/components/Clock/index.tsx
import React, { useEffect, useState } from 'react';

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4">
      {/* Clock */}
      <div className="text-9xl font-pacifico text-primary">{formattedTime}</div>
      {/* Date */}
      <div className="text-lg text-ash">{formattedDate}</div>
    </div>
  );
};

export default Clock;
