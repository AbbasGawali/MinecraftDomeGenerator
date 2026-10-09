'use client';

import MinecraftShapeGenerator from '@/components/MinecraftShapeGenerator';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <main className={`min-h-screen transition-colors ${isDark ? 'bg-[#111418] text-white' : 'bg-[#f8f9fa] text-slate-900'}`}>
      {/* 1. MASTER INTERACTIVE DOME & SHAPE GENERATOR */}
      <section id="generator">
        <MinecraftShapeGenerator />
      </section>

      {/* 2. THREE ADVANTAGES */}
      <section
        className={`py-12 border-y transition-colors ${
          isDark ? 'bg-[#14181d] border-[#262e38]' : 'bg-white border-stone-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`p-6 space-y-3 rounded-sm border transition-colors ${
                isDark
                  ? 'bg-[#181d24] border-[#2d3540] hover:border-emerald-500'
                  : 'bg-stone-50 border-stone-200 hover:border-emerald-500 shadow-2xs'
              }`}
            >
              <div
                className={`w-10 h-10 border flex items-center justify-center font-bold text-lg rounded-xs ${
                  isDark
                    ? 'bg-[#111418] border-[#3b4450] text-emerald-400'
                    : 'bg-white border-stone-300 text-emerald-600'
                }`}
              >
                ⚡
              </div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                100% Client-Side WebGL Rendering
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                Zero server lag. High-speed instanced voxel rendering allows smooth 60fps 3D orbital inspection and 2D pixel slicing even for mega builds with 100+ block diameters.
              </p>
            </div>

            <div
              className={`p-6 space-y-3 rounded-sm border transition-colors ${
                isDark
                  ? 'bg-[#181d24] border-[#2d3540] hover:border-emerald-500'
                  : 'bg-stone-50 border-stone-200 hover:border-emerald-500 shadow-2xs'
              }`}
            >
              <div
                className={`w-10 h-10 border flex items-center justify-center font-bold text-lg rounded-xs ${
                  isDark
                    ? 'bg-[#111418] border-[#3b4450] text-emerald-400'
                    : 'bg-white border-stone-300 text-emerald-600'
                }`}
              >
                📐
              </div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Layer-by-Layer Survival Blueprint
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                Track your building progress in Survival mode with our interactive checklist, layer slider, onion-skin ghosting of lower layers, and precise block material stack counts.
              </p>
            </div>

            <div
              className={`p-6 space-y-3 rounded-sm border transition-colors ${
                isDark
                  ? 'bg-[#181d24] border-[#2d3540] hover:border-emerald-500'
                  : 'bg-stone-50 border-stone-200 hover:border-emerald-500 shadow-2xs'
              }`}
            >
              <div
                className={`w-10 h-10 border flex items-center justify-center font-bold text-lg rounded-xs ${
                  isDark
                    ? 'bg-[#111418] border-[#3b4450] text-emerald-400'
                    : 'bg-white border-stone-300 text-emerald-600'
                }`}
              >
                ✨
              </div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Symmetry Lines &amp; Geodesic Shells
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                Generate decorative architectural pillars, colored dome symmetry arcs, and geodesic triangular patterns directly on your voxel structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRESETS GRID */}
      <section
        className={`py-14 border-b transition-colors ${
          isDark ? 'bg-[#111418] border-[#262e38]' : 'bg-[#f8f9fa] border-stone-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Minecraft Voxel Shape &amp; Structure Presets
            </h2>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
              Select an architectural primitive to generate custom Java and Bedrock survival blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                href: '/',
                icon: '🏛️',
                title: 'Minecraft Dome Generator',
                desc: 'Generate hemisphere roof layer plans, glass biospheres, observatory domes, and cathedral ceilings.',
              },
              {
                href: '/minecraft-sphere-generator',
                icon: '🌐',
                title: 'Minecraft Sphere Generator',
                desc: 'Build perfect 3D voxel spheres and ellipsoids with hollow wall thickness controls.',
              },
              {
                href: '/minecraft-circle-generator',
                icon: '⭕',
                title: 'Minecraft Circle Generator',
                desc: 'Generate 2D circle charts and pixel layouts from 3 to 256 blocks wide.',
              },
              {
                href: '/minecraft-cone-generator',
                icon: '🗼',
                title: 'Minecraft Cone Generator',
                desc: 'Create tapered castle spires, wizard towers, cone roofs, and volcanic terrain slopes.',
              },
              {
                href: '/minecraft-torus-generator',
                icon: '🍩',
                title: 'Torus & Donut Ring Generator',
                desc: 'Plan circular sci-fi stargates, orbital space station rings, and rounded tunnel conduits.',
              },
              {
                href: '/minecraft-geodesic-dome-generator',
                icon: '🔷',
                title: 'Geodesic Shell Generator',
                desc: 'Triangular strut structural shells for modern architectural domes and botanical biomes.',
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={`p-5 space-y-2 border transition group rounded-sm ${
                  isDark
                    ? 'bg-[#181d24] border-[#2d3540] hover:border-emerald-500'
                    : 'bg-white border-stone-200 hover:border-emerald-500 shadow-2xs'
                }`}
              >
                <span className="text-2xl">{card.icon}</span>
                <h3 className={`font-bold text-sm transition-colors ${isDark ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-600'}`}>
                  {card.title}
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                  {card.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REFERENCE TABLE */}
      <section
        className={`py-14 border-b transition-colors ${
          isDark ? 'bg-[#14181d] border-[#262e38]' : 'bg-white border-stone-200'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Popular Minecraft Dome Sizes &amp; Material Estimates
            </h2>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
              Quick reference for 1-block hollow shell hemisphere builds with Minecraft dome schematic generator math.
            </p>
          </div>

          <div className={`overflow-x-auto border rounded-sm ${isDark ? 'border-[#2d3540]' : 'border-stone-200'}`}>
            <table className={`w-full text-left text-xs border-collapse ${isDark ? 'bg-[#181d24]' : 'bg-white'}`}>
              <thead>
                <tr
                  className={`border-b font-bold uppercase ${
                    isDark ? 'bg-[#111418] border-[#2d3540] text-zinc-200' : 'bg-stone-100 border-stone-200 text-slate-900'
                  }`}
                >
                  <th className="p-3">Diameter</th>
                  <th className="p-3">Height</th>
                  <th className="p-3">Center</th>
                  <th className="p-3">Hollow Blocks</th>
                  <th className="p-3">Stacks (64)</th>
                  <th className="p-3">Recommended Project</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-[#262e38] text-zinc-300' : 'divide-stone-200 text-slate-700'}`}>
                {[
                  { d: '11 x 11', h: '6 blocks', c: '1x1 (Odd)', b: '~180', s: '3 stacks', p: 'Tower Turret / Gazebo' },
                  { d: '15 x 15', h: '8 blocks', c: '1x1 (Odd)', b: '~340', s: '6 stacks', p: 'Village House / Windmill Cap' },
                  { d: '20 x 20', h: '10 blocks', c: '2x2 (Even)', b: '~600', s: '10 stacks', p: 'Nether Portal Chamber' },
                  { d: '30 x 30', h: '15 blocks', c: '2x2 (Even)', b: '~1,350', s: '22 stacks', p: 'Underwater Biosphere' },
                  { d: '50 x 50', h: '25 blocks', c: '2x2 (Even)', b: '~3,750', s: '59 stacks', p: 'Planetarium / Megabase Dome' },
                  { d: '100 x 100', h: '50 blocks', c: '2x2 (Even)', b: '~15,100', s: '236 stacks', p: 'Mega Server Spawn City' },
                ].map((row) => (
                  <tr key={row.d} className={isDark ? 'hover:bg-[#1f2630]' : 'hover:bg-stone-50'}>
                    <td className="p-3 font-mono font-bold text-emerald-500">{row.d}</td>
                    <td className="p-3 font-mono">{row.h}</td>
                    <td className="p-3">{row.c}</td>
                    <td className="p-3 font-mono">{row.b}</td>
                    <td className="p-3 font-mono">{row.s}</td>
                    <td className="p-3">{row.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. STEP-BY-STEP SEO GUIDE: HOW TO GENERATE A DOME IN MINECRAFT */}
      <section className={`py-14 border-b transition-colors ${isDark ? 'bg-[#111418] border-[#262e38]' : 'bg-[#f8f9fa] border-stone-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              How to Generate a Dome in Minecraft (Survival &amp; Creative)
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              Building a rounded <strong>minecraft dome roof</strong> or glass biosphere requires converting continuous 3D sphere formulas into discrete 1x1x1 Minecraft voxels. Our online dome generator calculates the exact perimeter shell and slices it into 2D layer blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className={`p-5 rounded-sm border space-y-2 ${isDark ? 'bg-[#181d24] border-[#2d3540]' : 'bg-white border-stone-200 shadow-2xs'}`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span className="text-emerald-500">1.</span> Choose Diameter &amp; Center Point
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                Odd diameters (15, 21, 31) have a single center block for centered doors and beacon shafts. Even diameters (20, 30, 50) have a 2x2 center block for two-wide corridors and double iron doors.
              </p>
            </div>

            <div className={`p-5 rounded-sm border space-y-2 ${isDark ? 'bg-[#181d24] border-[#2d3540]' : 'bg-white border-stone-200 shadow-2xs'}`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span className="text-emerald-500">2.</span> Gather Materials with Stack Counter
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                Check the survival block summary before building. For example, a 30-block diameter hollow glass dome needs 22 stacks (1,350 blocks).
              </p>
            </div>

            <div className={`p-5 rounded-sm border space-y-2 ${isDark ? 'bg-[#181d24] border-[#2d3540]' : 'bg-white border-stone-200 shadow-2xs'}`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span className="text-emerald-500">3.</span> Follow Layer 1 Foundation
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                Switch to the 2D Top View. Place your foundation ring matching Layer 1. Click <strong>Mark Built</strong> and step to Layer 2.
              </p>
            </div>

            <div className={`p-5 rounded-sm border space-y-2 ${isDark ? 'bg-[#181d24] border-[#2d3540]' : 'bg-white border-stone-200 shadow-2xs'}`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span className="text-emerald-500">4.</span> Build Inward Using Ghost Layer
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                Use the ghosted lower layer outline to know exactly when to step blocks inward toward the crown peak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ (TARGETING TOP SEMRUSH QUESTIONS) */}
      <section className={`py-14 transition-colors ${isDark ? 'bg-[#14181d]' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Frequently Asked Questions (FAQ)
            </h2>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
              Everything you need to know about generating Minecraft domes, spheres, and circles.
            </p>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div
              className={`p-4 space-y-1.5 rounded-sm border ${
                isDark ? 'bg-[#181d24] border-[#2d3540]' : 'bg-stone-50 border-stone-200'
              }`}
            >
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                How to generate a dome in Minecraft?
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                To generate a dome in Minecraft, set your diameter (e.g. 30 blocks) and height in our online <strong>Minecraft Dome Generator</strong>. The tool computes the 3D voxel hemisphere and breaks it down into step-by-step 2D layers with exact block coordinates for Java and Bedrock.
              </p>
            </div>

            <div
              className={`p-4 space-y-1.5 rounded-sm border ${
                isDark ? 'bg-[#181d24] border-[#2d3540]' : 'bg-stone-50 border-stone-200'
              }`}
            >
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Can I build domes in Minecraft Survival without mods or WorldEdit?
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                Yes! Our tool was designed for vanilla survival players. You do not need WorldEdit, Axiom, or Litematica. Open the 2D blueprint on your second monitor or phone while placing blocks in your survival world.
              </p>
            </div>

            <div
              className={`p-4 space-y-1.5 rounded-sm border ${
                isDark ? 'bg-[#181d24] border-[#2d3540]' : 'bg-stone-50 border-stone-200'
              }`}
            >
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                How is MinecraftDomeGenerator.cyou different from Plotz?
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                Unlike older Flash/CPU-based tools like Plotz, MinecraftDomeGenerator runs on 100% client-side WebGL (60 FPS), supports full 360-degree orbit inspection, interactive pan/zoom on the 2D slicer, custom symmetry lines, and survival layer checkmarks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
