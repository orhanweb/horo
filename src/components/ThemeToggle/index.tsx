import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import ScaleAnimated from '../ScaleAnimated';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ScaleAnimated>
      <button
        onClick={toggleTheme}
        className="p-3 bg-primary text-white rounded-full shadow-md hover:bg-primary-500 transition-all duration-300 flex items-center gap-2 group"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {isDark ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
        </motion.div>
        <span className="hidden sm:inline font-medium">{isDark ? 'Dark' : 'Light'}</span>
      </button>
    </ScaleAnimated>
  );
};

export default ThemeToggle;
