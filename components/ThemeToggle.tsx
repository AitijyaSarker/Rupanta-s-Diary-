
import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { Theme } from '../types';
import { SunIcon, MoonIcon } from './icons/ThemeIcons';

const ThemeToggle: React.FC = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return null; // Or some fallback UI
  }
  const { theme, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-pink-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-pink-500 transition-colors duration-200"
      aria-label={theme === Theme.LIGHT ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === Theme.LIGHT ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
