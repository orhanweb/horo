// src/App.tsx
import React from 'react';
import ThemeToggle from './components/buttons/ThemeToggle';
import Clock from './components/Clock';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-dvh flex-col space-y-4 bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-3xl text-ash">Welcome to Horo!</h1>
      <Clock />
      <ThemeToggle />
    </div>
  );
};

export default App;
