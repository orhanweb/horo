// src/App.tsx
import React from 'react';
import ThemeToggle from './components/buttons/ThemeToggle';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-3xl text-ash">Welcome to Horo!</h1>
      <h1 className="font-pacifico text-primary text-6xl">12:45</h1>
      <ThemeToggle />
    </div>
  );
};

export default App;
