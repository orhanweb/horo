// src/components/buttons/ThemeToggle
import React, { useState } from 'react';
import ScaleAnimated from '../../ScaleAnimated';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'; // Determine the new theme
    document.documentElement.classList.replace(theme, newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <ScaleAnimated>
      <button
        className="p-3 bg-primary text-white rounded-full shadow-md hover:bg-primary-500 transition-colors"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        {React.createElement(theme === 'dark' ? MdDarkMode : MdLightMode, { size: 24 })}
      </button>
    </ScaleAnimated>
  );
};

export default ThemeToggle;
