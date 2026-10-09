import MinecraftShapeGenerator from '@/components/MinecraftShapeGenerator';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. MASTER INTERACTIVE GENERATOR SECTION */}
      <section id="generator">
        <MinecraftShapeGenerator />
      </section>

      {/* 2. ADVANTAGES SECTION */}
      <section className="py-12 bg-[#14181d] border-y border-[#262e38]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#181d24] border border-[#2d3540] p-6 space-y-3 rounded-sm hover:border-emerald-500 transition-colors">
              <div className="w-10 h-10 bg-[#111418] border border-[#3b4450] flex items-center justify-center text-emerald-400 font-bold text-lg">
                ⚡
              </div>
              <h3 className="text-base font-bold text-white">
                100% Client-Side WebGL Rendering
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Zero server lag. High-speed instanced voxel rendering allows smooth 60fps 3D orbital inspection and 2D pixel slicing even for mega builds with 100+ block diameters.
              </p>
            </div>

            <div className="bg-[#181d24] border border-[#2d3540] p-6 space-y-3 rounded-sm hover:border-emerald-500 transition-colors">
              <div className="w-10 h-10 bg-[#111418] border border-[#3b4450] flex items-center justify-center text-emerald-400 font-bold text-lg">
                📐
              </div>
              <h3 className="text-base font-bold text-white">
                Layer-by-Layer Survival Blueprint
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Track your building progress in Survival mode with our interactive checklist, layer slider, onion-skin ghosting of lower layers, and precise block material stack counts.
              </p>
            </div>

            <div className="bg-[#181d24] border border-[#2d3540] p-6 space-y-3 rounded-sm hover:border-emerald-500 transition-colors">
              <div className="w-10 h-10 bg-[#111418] border border-[#3b4450] flex items-center justify-center text-emerald-400 font-bold text-lg">
                ✨
              </div>
              <h3 className="text-base font-bold text-white">
                Symmetry Lines &amp; Geodesic Shells
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Generate decorative architectural pillars, colored dome symmetry arcs, and geodesic triangular patterns directly on your voxel structure.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PRESETS GRID */}
      <section className="py-14 bg-[#111418] border-b border-[#262e38]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <h2 className="text-2xl font-bold text-white">
              Minecraft Voxel Shape Presets
            </h2>
            <p className="text-xs text-zinc-400">
              Pick your preferred architectural primitive to generate custom survival blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <Link href="/" className="bg-[#181d24] border border-[#2d3540] p-5 space-y-2 hover:border-emerald-500 transition group rounded-sm">
              <span className="text-2xl">🏛️</span>
              <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                Hollow Dome Generator
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Generate hemispherical domes for glass planetariums, observatory roofs, and underwater biosphere bases.
              </p>
            </Link>

            <Link href="/minecraft-sphere-generator" className="bg-[#181d24] border border-[#2d3540] p-5 space-y-2 hover:border-emerald-500 transition group rounded-sm">
              <span className="text-2xl">🌐</span>
              <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                Minecraft Sphere Generator
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Build perfect 3D voxel spheres and ellipsoids with hollow wall thickness controls.
              </p>
            </Link>

            <Link href="/minecraft-circle-generator" className="bg-[#181d24] border border-[#2d3540] p-5 space-y-2 hover:border-emerald-500 transition group rounded-sm">
              <span className="text-2xl">⭕</span>
              <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                Minecraft Circle Generator
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Generate 2D circle charts and pixel layouts from 3 to 256 blocks wide.
              </p>
            </Link>

            <Link href="/minecraft-cone-generator" className="bg-[#181d24] border border-[#2d3540] p-5 space-y-2 hover:border-emerald-500 transition group rounded-sm">
              <span className="text-2xl">🗼</span>
              <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                Minecraft Cone Generator
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Create tapered roofs, wizard tower spires, and volcano peak shapes.
              </p>
            </Link>

            <Link href="/minecraft-torus-generator" className="bg-[#181d24] border border-[#2d3540] p-5 space-y-2 hover:border-emerald-500 transition group rounded-sm">
              <span className="text-2xl">🍩</span>
              <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                Torus &amp; Donut Ring Generator
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Generate rotating orbital ring stations, sci-fi portals, and circular tube tunnels.
              </p>
            </Link>

            <Link href="/minecraft-geodesic-dome-generator" className="bg-[#181d24] border border-[#2d3540] p-5 space-y-2 hover:border-emerald-500 transition group rounded-sm">
              <span className="text-2xl">🔷</span>
              <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                Geodesic Shell Generator
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Triangular strut structural shells for modern architectural domes and greenhouse biomes.
              </p>
            </Link>

          </div>
        </div>
      </section>

      {/* 4. REFERENCE TABLE */}
      <section className="py-14 bg-[#14181d] border-b border-[#262e38]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Popular Minecraft Dome Sizes &amp; Material Chart
            </h2>
            <p className="text-xs text-zinc-400">
              Quick reference for 1-block hollow shell hemisphere builds.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#2d3540] rounded-sm">
            <table className="w-full text-left text-xs border-collapse bg-[#181d24]">
              <thead>
                <tr className="bg-[#111418] border-b border-[#2d3540] text-zinc-200 font-bold uppercase">
                  <th className="p-3">Diameter</th>
                  <th className="p-3">Height</th>
                  <th className="p-3">Center</th>
                  <th className="p-3">Hollow Blocks</th>
                  <th className="p-3">Stacks (64)</th>
                  <th className="p-3">Recommended Project</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262e38] text-zinc-300">
                <tr className="hover:bg-[#1f2630]">
                  <td className="p-3 font-mono font-bold text-emerald-400">11 x 11</td>
                  <td className="p-3 font-mono">6 blocks</td>
                  <td className="p-3">1x1 (Odd)</td>
                  <td className="p-3 font-mono">~180</td>
                  <td className="p-3 font-mono">3 stacks</td>
                  <td className="p-3">Tower Turret / Small Gazebo</td>
                </tr>
                <tr className="hover:bg-[#1f2630]">
                  <td className="p-3 font-mono font-bold text-emerald-400">15 x 15</td>
                  <td className="p-3 font-mono">8 blocks</td>
                  <td className="p-3">1x1 (Odd)</td>
                  <td className="p-3 font-mono">~340</td>
                  <td className="p-3 font-mono">6 stacks</td>
                  <td className="p-3">Village House Dome / Windmill Cap</td>
                </tr>
                <tr className="hover:bg-[#1f2630]">
                  <td className="p-3 font-mono font-bold text-emerald-400">20 x 20</td>
                  <td className="p-3 font-mono">10 blocks</td>
                  <td className="p-3">2x2 (Even)</td>
                  <td className="p-3 font-mono">~600</td>
                  <td className="p-3 font-mono">10 stacks</td>
                  <td className="p-3">Nether Portal Chamber / Greenhouse</td>
                </tr>
                <tr className="hover:bg-[#1f2630]">
                  <td className="p-3 font-mono font-bold text-emerald-400">30 x 30</td>
                  <td className="p-3 font-mono">15 blocks</td>
                  <td className="p-3">2x2 (Even)</td>
                  <td className="p-3 font-mono">~1,350</td>
                  <td className="p-3 font-mono">22 stacks</td>
                  <td className="p-3">Underwater Biosphere / Base Hub</td>
                </tr>
                <tr className="hover:bg-[#1f2630]">
                  <td className="p-3 font-mono font-bold text-emerald-400">50 x 50</td>
                  <td className="p-3 font-mono">25 blocks</td>
                  <td className="p-3">2x2 (Even)</td>
                  <td className="p-3 font-mono">~3,750</td>
                  <td className="p-3 font-mono">59 stacks</td>
                  <td className="p-3">Major Planetarium / Megabase Dome</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section id="faq" className="py-14 bg-[#111418]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="bg-[#181d24] border border-[#2d3540] p-4 space-y-1.5 rounded-sm">
              <h3 className="font-bold text-white">
                How to generate a dome in Minecraft?
              </h3>
              <p className="text-zinc-400 leading-relaxed text-xs">
                Enter your base diameter and height into our generator above. The tool calculates the 3D voxel hemisphere and breaks it down into step-by-step 2D layers with exact block coordinates for vanilla Java or Bedrock.
              </p>
            </div>

            <div className="bg-[#181d24] border border-[#2d3540] p-4 space-y-1.5 rounded-sm">
              <h3 className="font-bold text-white">
                Can I build domes in Minecraft Survival without mods?
              </h3>
              <p className="text-zinc-400 leading-relaxed text-xs">
                Yes! You do not need WorldEdit or Litematica. Open the 2D blueprint on your screen and follow layer by layer with onion skin ghosting.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
