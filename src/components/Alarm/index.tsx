import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAdd, MdDelete, MdAlarm } from 'react-icons/md';
import ScaleAnimated from '../ScaleAnimated';

interface Alarm {
  id: string;
  time: string;
  label: string;
  isActive: boolean;
  repeat: string[];
}

const Alarm: React.FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlarm, setNewAlarm] = useState({ time: '', label: '', repeat: [] as string[] });

  const addAlarm = () => {
    if (newAlarm.time) {
      const alarm: Alarm = {
        id: Date.now().toString(),
        time: newAlarm.time,
        label: newAlarm.label || 'Alarm',
        isActive: true,
        repeat: newAlarm.repeat
      };
      setAlarms([...alarms, alarm]);
      setNewAlarm({ time: '', label: '', repeat: [] });
      setShowAddForm(false);
    }
  };

  const toggleAlarm = (id: string) => {
    setAlarms(alarms.map(alarm => (alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm)));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  // Alarm check
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);

      alarms.forEach(alarm => {
        if (alarm.isActive && alarm.time === currentTime) {
          // Alarm trigger logic here
          console.log(`Alarm ringing: ${alarm.label}`);
          // In a real app, sound playing and notification display would be here
        }
      });
    };

    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, [alarms]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <MdAlarm size={24} />
          Alarms
        </h2>
        <ScaleAnimated>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="p-2 bg-primary text-white rounded-full hover:bg-primary-500 transition-colors"
          >
            <MdAdd size={20} />
          </button>
        </ScaleAnimated>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
              opacity: { duration: 0.2 },
              y: { duration: 0.3 },
              scale: { duration: 0.3 }
            }}
            className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.2 }}>
              <motion.input
                type="time"
                value={newAlarm.time}
                onChange={e => setNewAlarm({ ...newAlarm, time: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Select time"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.2 }}
              />
              <motion.input
                type="text"
                value={newAlarm.label}
                onChange={e => setNewAlarm({ ...newAlarm, label: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Alarm label (optional)"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              />
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.2 }}
              >
                <button
                  onClick={addAlarm}
                  className="flex-1 bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-500 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <AnimatePresence>
          {alarms.map(alarm => (
            <motion.div
              key={alarm.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`p-3 rounded-lg border-2 transition-all ${
                alarm.isActive ? 'border-primary bg-primary/10' : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={alarm.isActive} onChange={() => toggleAlarm(alarm.id)} className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-xl font-bold">{alarm.time}</div>
                    <div className="text-sm text-ash">{alarm.label}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <ScaleAnimated>
                    <button onClick={() => deleteAlarm(alarm.id)} className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded">
                      <MdDelete size={16} />
                    </button>
                  </ScaleAnimated>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Alarm;
