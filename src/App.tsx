// src/App.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './components/ThemeToggle';
import Clock from './components/Clock';
import Alarm from './components/Alarm';
import Stopwatch from './components/Stopwatch';

type Tab = 'clock' | 'alarm' | 'stopwatch';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('clock');

  const tabs = [
    { id: 'clock' as Tab, label: 'Clock' },
    { id: 'alarm' as Tab, label: 'Alarm' },
    { id: 'stopwatch' as Tab, label: 'Stopwatch' }
  ];

  return (
    <div className="min-h-dvh bg-white dark:bg-black text-black dark:text-white transition-colors">
      {/* Header */}
      <header className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Horo</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
                  activeTab === tab.id ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-ash hover:text-primary'
                }`}
              >
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-4">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'clock' && <Clock />}
              {activeTab === 'alarm' && <Alarm />}
              {activeTab === 'stopwatch' && <Stopwatch />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;
