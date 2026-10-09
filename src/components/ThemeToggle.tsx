'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center bg-[#111418] border border-[#2d3540] rounded-full p-1 w-14 h-7 transition-colors hover:border-emerald-500 focus:outline-none"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      aria-label="Toggle Theme"
    >
      {/* Track Icons */}
      <div className="w-full flex items-center justify-between px-1 pointer-events-none">
        <Moon className="w-3.5 h-3.5 text-zinc-400" />
        <Sun className="w-3.5 h-3.5 text-amber-400" />
      </div>

      {/* Sliding Knob */}
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-md transform transition-transform duration-150 ${
          theme === 'dark' ? 'left-1' : 'left-8 bg-amber-500'
        }`}
      >
        {theme === 'dark' ? (
          <Moon className="w-3 h-3 text-black fill-current" />
        ) : (
          <Sun className="w-3 h-3 text-white fill-current" />
        )}
      </span>
    </button>
  );
}
