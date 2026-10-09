import MinecraftShapeGenerator from '@/components/MinecraftShapeGenerator';
import Link from 'next/link';
import { Layers, Sparkles, Box, Shield, Zap, Eye, CheckCircle2, ChevronRight, HelpCircle, Compass, Grid, Hammer } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. MASTER INTERACTIVE GENERATOR SECTION */}
      <section id="generator">
        <MinecraftShapeGenerator />
      </section>

      {/* 2. THREE KEY ADVANTAGES */}
      <section className="py-14 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-stone-50 border border-stone-200 p-6 space-y-3 hover:border-blue-400 transition-colors">
              <div className="w-10 h-10 bg-white border border-stone-300 flex items-center justify-center text-blue-600 font-bold text-lg">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                100% Client-Side 3D Voxel Rendering
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Zero server delay. Our high-performance Three.js instanced engine renders 60 FPS 3D previews and 2D pixel slicing for structures up to 256 blocks diameter.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-6 space-y-3 hover:border-blue-400 transition-colors">
              <div className="w-10 h-10 bg-white border border-stone-300 flex items-center justify-center text-blue-600 font-bold text-lg">
                📐
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Layer-by-Layer Survival Blueprints
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Build without guessing in Java or Bedrock. Features interactive layer steps, onion-skin ghosting of lower layers, and exact material stack &amp; Shulker box calculators.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-6 space-y-3 hover:border-blue-400 transition-colors">
              <div className="w-10 h-10 bg-white border border-stone-300 flex items-center justify-center text-blue-600 font-bold text-lg">
                ✨
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Symmetry Arcs &amp; Geodesic Shells
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Add architectural longitudinal symmetry lines, glass greenhouse struts, and geodesic triangular patterns directly onto your voxel dome.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SHAPE PRESETS & TOOLS HUB */}
      <section className="py-16 bg-[#fdfbf7] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Minecraft Voxel Shape &amp; Structure Generators
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select your required architectural primitive to calculate coordinates, hollow shells, and material requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Link href="/" className="bg-white border border-stone-200 p-6 space-y-3 hover:border-blue-500 hover:shadow-xs transition-all group">
              <span className="text-2xl">🏛️</span>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                Minecraft Dome Generator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Generate hemisphere roof layer plans, glass biospheres, observatory domes, and cathedral ceilings.
              </p>
            </Link>

            <Link href="/minecraft-sphere-generator" className="bg-white border border-stone-200 p-6 space-y-3 hover:border-blue-500 hover:shadow-xs transition-all group">
              <span className="text-2xl">🌐</span>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                Minecraft Sphere Generator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Build perfect 3D voxel spheres and ellipsoids with hollow wall thickness controls and 3D rotation.
              </p>
            </Link>

            <Link href="/minecraft-circle-generator" className="bg-white border border-stone-200 p-6 space-y-3 hover:border-blue-500 hover:shadow-xs transition-all group">
              <span className="text-2xl">⭕</span>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                Minecraft Circle Generator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pixel-perfect 2D circle charts and floor layout templates from 3 to 256 blocks diameter.
              </p>
            </Link>

            <Link href="/minecraft-cone-generator" className="bg-white border border-stone-200 p-6 space-y-3 hover:border-blue-500 hover:shadow-xs transition-all group">
              <span className="text-2xl">🗼</span>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                Minecraft Cone Generator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Create tapered castle spires, wizard towers, cone roofs, and volcanic terrain slopes.
              </p>
            </Link>

            <Link href="/minecraft-torus-generator" className="bg-white border border-stone-200 p-6 space-y-3 hover:border-blue-500 hover:shadow-xs transition-all group">
              <span className="text-2xl">🍩</span>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                Torus &amp; Donut Ring Generator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Plan circular sci-fi stargates, orbital space station rings, and rounded tunnel conduits.
              </p>
            </Link>

            <Link href="/minecraft-geodesic-dome-generator" className="bg-white border border-stone-200 p-6 space-y-3 hover:border-blue-500 hover:shadow-xs transition-all group">
              <span className="text-2xl">🔷</span>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                Geodesic Shell Generator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Triangular strut structural shells for modern architectural domes and botanical biomes.
              </p>
            </Link>

          </div>
        </div>
      </section>

      {/* 4. POPULAR DOME & CIRCLE DIMENSION CHART (HIGH SEO VALUE) */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Popular Minecraft Dome Sizes &amp; Material Estimates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Reference chart for common survival dome builds. Quick block requirements for 1-block hollow shell hemispheres.
            </p>
          </div>

          <div className="overflow-x-auto border border-stone-200 rounded-none shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-200 text-slate-900 font-bold">
                  <th className="p-3 sm:p-4">Diameter (Blocks)</th>
                  <th className="p-3 sm:p-4">Height (Radius)</th>
                  <th className="p-3 sm:p-4">Center Type</th>
                  <th className="p-3 sm:p-4">Hollow Shell Blocks</th>
                  <th className="p-3 sm:p-4">Stacks (64)</th>
                  <th className="p-3 sm:p-4">Ideal Project</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-slate-700">
                <tr className="hover:bg-stone-50">
                  <td className="p-3 sm:p-4 font-mono font-bold text-blue-600">11 x 11</td>
                  <td className="p-3 sm:p-4 font-mono">6 blocks</td>
                  <td className="p-3 sm:p-4">1x1 (Odd)</td>
                  <td className="p-3 sm:p-4 font-mono">~180</td>
                  <td className="p-3 sm:p-4 font-mono">3 stacks</td>
                  <td className="p-3 sm:p-4">Tower Turret / Small Gazebo</td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="p-3 sm:p-4 font-mono font-bold text-blue-600">15 x 15</td>
                  <td className="p-3 sm:p-4 font-mono">8 blocks</td>
                  <td className="p-3 sm:p-4">1x1 (Odd)</td>
                  <td className="p-3 sm:p-4 font-mono">~340</td>
                  <td className="p-3 sm:p-4 font-mono">6 stacks</td>
                  <td className="p-3 sm:p-4">Village House Dome / Windmill Cap</td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="p-3 sm:p-4 font-mono font-bold text-blue-600">20 x 20</td>
                  <td className="p-3 sm:p-4 font-mono">10 blocks</td>
                  <td className="p-3 sm:p-4">2x2 (Even)</td>
                  <td className="p-3 sm:p-4 font-mono">~600</td>
                  <td className="p-3 sm:p-4 font-mono">10 stacks</td>
                  <td className="p-3 sm:p-4">Nether Portal Chamber / Greenhouse</td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="p-3 sm:p-4 font-mono font-bold text-blue-600">30 x 30</td>
                  <td className="p-3 sm:p-4 font-mono">15 blocks</td>
                  <td className="p-3 sm:p-4">2x2 (Even)</td>
                  <td className="p-3 sm:p-4 font-mono">~1,350</td>
                  <td className="p-3 sm:p-4 font-mono">22 stacks (1 chest)</td>
                  <td className="p-3 sm:p-4">Underwater Biosphere / Base Hub</td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="p-3 sm:p-4 font-mono font-bold text-blue-600">50 x 50</td>
                  <td className="p-3 sm:p-4 font-mono">25 blocks</td>
                  <td className="p-3 sm:p-4">2x2 (Even)</td>
                  <td className="p-3 sm:p-4 font-mono">~3,750</td>
                  <td className="p-3 sm:p-4 font-mono">59 stacks (2.2 chests)</td>
                  <td className="p-3 sm:p-4">Major Planetarium / Megabase Dome</td>
                </tr>
                <tr className="hover:bg-stone-50">
                  <td className="p-3 sm:p-4 font-mono font-bold text-blue-600">100 x 100</td>
                  <td className="p-3 sm:p-4 font-mono">50 blocks</td>
                  <td className="p-3 sm:p-4">2x2 (Even)</td>
                  <td className="p-3 sm:p-4 font-mono">~15,100</td>
                  <td className="p-3 sm:p-4 font-mono">236 stacks (9 chests)</td>
                  <td className="p-3 sm:p-4">Mega Server Spawn / Survival City</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. IN-DEPTH TUTORIAL & STRATEGY */}
      <section className="py-16 bg-[#fdfbf7] border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-slate-700 text-sm leading-relaxed">
          
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How to Build a Minecraft Dome in Survival (Step-by-Step Guide)
            </h2>
            <p>
              Constructing a rounded dome roof or curved hemisphere in Minecraft requires converting mathematical 3D sphere formulas into a discretized block-by-block grid. Using our 3D dome generator and 2D layer slicer prevents lopsided circles, misaligned heights, and wasted glass or concrete blocks.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-stone-200 p-6 space-y-3">
              <div className="text-blue-600 font-extrabold text-sm flex items-center gap-2">
                <span>STEP 01</span>
                <span className="w-8 h-0.5 bg-blue-200"></span>
              </div>
              <h3 className="font-bold text-base text-slate-900">Choose Diameter &amp; Calculate Center</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Determine if your build requires an odd diameter (1x1 center block for centered doorways) or an even diameter (2x2 center block for double doors and wide roads). Place a placeholder block at the exact center of your build site.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-6 space-y-3">
              <div className="text-blue-600 font-extrabold text-sm flex items-center gap-2">
                <span>STEP 02</span>
                <span className="w-8 h-0.5 bg-blue-200"></span>
              </div>
              <h3 className="font-bold text-base text-slate-900">Gather Materials with Stack Calculator</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Check our live material counter before starting. For example, building a 30-block diameter glass dome requires 22 full 64-stacks of glass. Prepare your scaffolds (Dirt, Scaffolding, or Water Buckets) to reach higher levels.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-6 space-y-3">
              <div className="text-blue-600 font-extrabold text-sm flex items-center gap-2">
                <span>STEP 03</span>
                <span className="w-8 h-0.5 bg-blue-200"></span>
              </div>
              <h3 className="font-bold text-base text-slate-900">Lay Foundation with 2D Layer 1</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Switch to the <strong>2D Layer View</strong>. Set the layer slider to Layer 1. Lay down the outermost perimeter ring. Verify the four cardinal points (North, South, East, West) match the diameter coordinates before moving upwards.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-6 space-y-3">
              <div className="text-blue-600 font-extrabold text-sm flex items-center gap-2">
                <span>STEP 04</span>
                <span className="w-8 h-0.5 bg-blue-200"></span>
              </div>
              <h3 className="font-bold text-base text-slate-900">Stack Layers Using Ghosted Onion-Skin</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                As you advance to Layer 2, Layer 3, and beyond, use the ghosted blue outline of the previous layer to know exactly which blocks step inward or upward. Click <strong>Mark Built</strong> on each layer to track your progress.
              </p>
            </div>
          </div>

          {/* Best Practices Banner */}
          <div className="p-6 bg-white border border-blue-200 space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-blue-600">💡</span> Pro Tip: Glass Domes &amp; Underwater Biospheres
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When creating underwater biospheres in ocean biomes, build the exterior glass dome first using a 1-block hollow shell. Once the dome is sealed, use Sponges or fill the interior with sand/gravel and dig it out to quickly clear the water.
            </p>
          </div>

        </div>
      </section>

      {/* 6. COMPARISON TABLE: WHY MINECRAFTDOMEGENERATOR.CYOU */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Why Builders Choose MinecraftDomeGenerator.cyou
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Compare our modern client-side WebGL engine with legacy tools like Plotz and classic circle charts.
            </p>
          </div>

          <div className="overflow-x-auto border border-stone-200 rounded-none">
            <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-200 text-slate-900 font-bold">
                  <th className="p-3 sm:p-4">Feature</th>
                  <th className="p-3 sm:p-4 text-blue-600">MinecraftDomeGenerator.cyou</th>
                  <th className="p-3 sm:p-4 text-slate-500">Plotz / Legacy Modellers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-slate-700">
                <tr>
                  <td className="p-3 sm:p-4 font-medium">Rendering Speed</td>
                  <td className="p-3 sm:p-4 text-emerald-600 font-semibold">Instant WebGL (60 FPS)</td>
                  <td className="p-3 sm:p-4 text-slate-500">Laggy Flash / CPU Canvas</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-medium">Onion-Skinning (Ghost Layer)</td>
                  <td className="p-3 sm:p-4 text-emerald-600 font-semibold">Yes (Ghosted lower layer)</td>
                  <td className="p-3 sm:p-4 text-slate-500">No</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-medium">Symmetry Lines &amp; Ribs</td>
                  <td className="p-3 sm:p-4 text-emerald-600 font-semibold">Configurable Count &amp; Rotation</td>
                  <td className="p-3 sm:p-4 text-slate-500">Not supported</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-medium">Mobile &amp; Tablet Support</td>
                  <td className="p-3 sm:p-4 text-emerald-600 font-semibold">Fully responsive touch controls</td>
                  <td className="p-3 sm:p-4 text-slate-500">Desktop only / broken zoom</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-medium">Privacy &amp; Offline Ready</td>
                  <td className="p-3 sm:p-4 text-emerald-600 font-semibold">100% Client-side (No server tracking)</td>
                  <td className="p-3 sm:p-4 text-slate-500">Ad-heavy server queries</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. COMPREHENSIVE FAQ SECTION (TARGETING SERP & PAA) */}
      <section id="faq" className="py-16 bg-[#fdfbf7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Common questions about Minecraft dome blueprints, sphere modeling, and circle math.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            
            <div className="bg-white border border-stone-200 p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900">
                How to generate a dome in Minecraft?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                To generate a dome, enter your base diameter (e.g. 30 blocks) and height (e.g. 15 blocks) into our interactive 3D generator above. The tool automatically computes the optimal voxel hemisphere and gives you a 2D layer-by-layer blueprint that you can follow directly in vanilla Minecraft Java or Bedrock Edition.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900">
                How do I make a 50x50 circle or dome in Minecraft?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Set the Diameter slider to <strong>50</strong>. Because 50 is an even number, your dome has a 2x2 block center. A 50-block hollow dome requires approximately 3,750 blocks (59 stacks of 64). Switch to the 2D Top View and place the outer blocks layer-by-layer starting from Layer 1 up to Layer 25.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900">
                Can I build domes in Minecraft Survival mode without mods or WorldEdit?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Yes! Our tool was designed for vanilla survival players. You do not need WorldEdit, Axiom, or Litematica. You can open the 2D blueprint on a second monitor, tablet, or smartphone while placing blocks in your survival world.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900">
                What is the difference between a hollow dome and a solid dome?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                A <strong>1-Block Hollow Dome</strong> only places blocks on the outermost perimeter shell, leaving the inside completely open for your base interior. A solid dome fills all inner coordinates, which requires 10x more blocks and is usually only needed for terraforming or solid terrain mounds.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900">
                How do symmetry lines help when building glass domes?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Symmetry lines project colored longitudinal arcs (ribs) along the dome shell. By setting the line count to 4, 6, or 8, you can replace specific glass blocks with Dark Prismarine, Copper, or Deepslate to create decorative arches and cathedral ribs.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
