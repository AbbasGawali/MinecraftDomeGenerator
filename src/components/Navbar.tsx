'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${
        isDark ? 'bg-[#161b22]/95 border-[#2d3540]' : 'bg-white/95 border-stone-200 shadow-2xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className={`w-8 h-8 rounded-sm flex items-center justify-center p-1 border-t-2 border-l-2 border-b-2 border-r-2 transition-colors ${
              isDark
                ? 'bg-[#21272e] border-t-[#3f4a59] border-l-[#3f4a59] border-b-[#111418] border-r-[#111418]'
                : 'bg-stone-100 border-t-white border-l-white border-b-stone-400 border-r-stone-400 shadow-2xs'
            }`}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect x="6" y="6" width="88" height="88" rx="2" fill={isDark ? '#14171a' : '#0f172a'} stroke="#10b981" strokeWidth="6"/>
              <rect x="20" y="70" width="60" height="10" fill="#059669"/>
              <rect x="28" y="58" width="44" height="12" fill="#34d399"/>
              <rect x="36" y="44" width="28" height="14" fill="#38bdf8"/>
              <rect x="44" y="32" width="12" height="12" fill="#f59e0b"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className={`font-bold leading-none tracking-tight text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
              MinecraftDome<span className="text-emerald-500 font-extrabold">.cyou</span>
            </span>
            <span className={`text-[9px] font-bold tracking-wider uppercase mt-0.5 ${isDark ? 'text-emerald-500' : 'text-emerald-600'}`}>
              Voxel Blueprint Slicer
            </span>
          </div>
        </Link>

        {/* Quick Actions & Light/Dark Switch */}
        <div className="flex items-center gap-3">
          <Link
            href="/guides/how-to-build-a-dome-in-minecraft"
            className={`text-xs font-semibold transition ${
              isDark ? 'text-zinc-300 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'
            }`}
          >
            Guide
          </Link>
          <Link
            href="/about"
            className={`text-xs font-semibold transition ${
              isDark ? 'text-zinc-300 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'
            }`}
          >
            About
          </Link>

          {/* Light / Dark Mode Toggle Switch */}
          <ThemeToggle />

          <a
            href="#generator"
            className="mc-button-green px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm"
          >
            Start Build
          </a>
        </div>
      </div>
    </header>
  );
}
