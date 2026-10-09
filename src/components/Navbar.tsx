'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import { Box, Sparkles, BookOpen, Compass } from 'lucide-react';

export default function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${
        isDark ? 'bg-[#14181d]/95 border-[#262e38]' : 'bg-white/95 border-stone-200 shadow-2xs'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className={`w-9 h-9 rounded-md flex items-center justify-center border transition-all group-hover:scale-105 ${
              isDark
                ? 'bg-[#181d24] border-[#2d3540] text-emerald-400 group-hover:border-emerald-500'
                : 'bg-emerald-50 border-emerald-200 text-emerald-600 group-hover:border-emerald-400 shadow-2xs'
            }`}
          >
            <Box className="w-5 h-5" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span
                className={`font-extrabold tracking-tight text-base sm:text-lg leading-tight transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                MinecraftDomeGenerator<span className="text-emerald-500">.cyou</span>
              </span>
            </div>
            <span
              className={`text-[10px] font-semibold tracking-wider uppercase leading-none mt-0.5 ${
                isDark ? 'text-emerald-400' : 'text-emerald-700'
              }`}
            >
              3D Voxel Blueprint Slicer
            </span>
          </div>
        </Link>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/#generator"
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                isDark
                  ? 'text-zinc-300 hover:text-white hover:bg-[#1f2630]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-emerald-500" />
              Presets
            </Link>

            <Link
              href="/guides/how-to-build-a-dome-in-minecraft"
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                isDark
                  ? 'text-zinc-300 hover:text-white hover:bg-[#1f2630]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              Build Guides
            </Link>

            <Link
              href="/about"
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors ${
                isDark
                  ? 'text-zinc-300 hover:text-white hover:bg-[#1f2630]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
              }`}
            >
              About
            </Link>
          </nav>

          <div className="h-4 w-px bg-stone-200 dark:bg-[#262e38] hidden sm:block" />

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Quick Action Button */}
          <Link
            href="/#generator"
            className="mc-button-green px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Start</span> Build
          </Link>
        </div>
      </div>
    </header>
  );
}
