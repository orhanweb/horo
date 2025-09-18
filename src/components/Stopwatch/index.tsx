import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MdPlayArrow, MdPause, MdStop, MdRefresh } from 'react-icons/md';
import ScaleAnimated from '../ScaleAnimated';

interface Lap {
  id: number;
  time: string;
  lapTime: string;
}

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const intervalRef = useRef<number | null>(null);
  const lastLapTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
    lastLapTimeRef.current = 0;
  };

  const addLap = () => {
    const lapTime = time - lastLapTimeRef.current;
    const newLap: Lap = {
      id: laps.length + 1,
      time: formatTime(time),
      lapTime: formatTime(lapTime)
    };
    setLaps([newLap, ...laps]);
    lastLapTimeRef.current = time;
  };

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Stopwatch</h2>

      {/* Time Display */}
      <div className="text-center mb-8">
        <div className="text-6xl font-mono font-bold text-primary mb-2">{formatTime(time)}</div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {!isRunning ? (
          <ScaleAnimated>
            <button onClick={start} className="p-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
              <MdPlayArrow size={24} />
            </button>
          </ScaleAnimated>
        ) : (
          <ScaleAnimated>
            <button onClick={pause} className="p-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors">
              <MdPause size={24} />
            </button>
          </ScaleAnimated>
        )}

        <ScaleAnimated>
          <button onClick={reset} className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
            <MdStop size={24} />
          </button>
        </ScaleAnimated>

        {isRunning && (
          <ScaleAnimated>
            <button onClick={addLap} className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
              <MdRefresh size={24} />
            </button>
          </ScaleAnimated>
        )}
      </div>

      {/* Lap List */}
      {laps.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-center">Laps</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {laps.map(lap => (
              <motion.div
                key={lap.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded"
              >
                <span className="font-mono">Lap {lap.id}</span>
                <span className="font-mono text-primary">{lap.lapTime}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
