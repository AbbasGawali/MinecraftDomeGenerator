'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`border-t mt-20 transition-colors ${
        isDark ? 'bg-[#0e1013] border-[#21272e]' : 'bg-stone-100 border-stone-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-xs bg-emerald-500 flex items-center justify-center text-black text-xs font-bold">
                M
              </div>
              <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                MinecraftDome.cyou
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              Fast client-side 3D voxel generator &amp; layer slicer for Java &amp; Bedrock builders.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
              Presets
            </div>
            <div className={`flex flex-wrap gap-2 text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
              <Link href="/" className="hover:text-emerald-500 transition">Dome</Link> •
              <Link href="/minecraft-sphere-generator" className="hover:text-emerald-500 transition">Sphere</Link> •
              <Link href="/minecraft-circle-generator" className="hover:text-emerald-500 transition">Circle</Link> •
              <Link href="/minecraft-cone-generator" className="hover:text-emerald-500 transition">Cone</Link> •
              <Link href="/minecraft-torus-generator" className="hover:text-emerald-500 transition">Torus</Link> •
              <Link href="/minecraft-geodesic-dome-generator" className="hover:text-emerald-500 transition">Geodesic</Link>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
              Legal
            </div>
            <div className={`flex flex-wrap gap-2 text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
              <Link href="/about" className="hover:text-emerald-500 transition">About</Link> •
              <Link href="/contact" className="hover:text-emerald-500 transition">Contact</Link> •
              <Link href="/privacy" className="hover:text-emerald-500 transition">Privacy</Link> •
              <Link href="/terms" className="hover:text-emerald-500 transition">Terms</Link>
            </div>
          </div>
        </div>

        <div className={`pt-6 mt-6 border-t text-[11px] text-center ${isDark ? 'border-[#1c2024] text-zinc-500' : 'border-stone-200 text-slate-500'}`}>
          © 2026 MinecraftDomeGenerator.cyou. Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
        </div>
      </div>
    </footer>
  );
}
