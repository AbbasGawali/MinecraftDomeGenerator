import MinecraftShapeGenerator from '@/components/MinecraftShapeGenerator';
import Link from 'next/link';

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
                100% Client-Side WebGL Rendering
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Zero server lag. High-speed instanced voxel rendering allows smooth 60fps 3D orbital inspection and 2D pixel slicing even for mega builds with 100+ block diameters.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-6 space-y-3 hover:border-blue-400 transition-colors">
              <div className="w-10 h-10 bg-white border border-stone-300 flex items-center justify-center text-blue-600 font-bold text-lg">
                📐
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Layer-by-Layer Building Assistant
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Track your building progress in Survival mode with our interactive checklist, layer slider, onion-skin ghosting of lower layers, and precise block material stack counts.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-6 space-y-3 hover:border-blue-400 transition-colors">
              <div className="w-10 h-10 bg-white border border-stone-300 flex items-center justify-center text-blue-600 font-bold text-lg">
                ✨
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Symmetry Lines &amp; Geodesic Shells
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Generate decorative architectural pillars, colored dome symmetry arcs, and geodesic triangular patterns directly on your voxel structure.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SHAPE PRESETS HUB */}
      <section className="py-16 bg-[#fdfbf7] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">
              Minecraft Voxel Shape Generators
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Pick your preferred architectural primitive to generate custom survival building blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Link href="/" className="bg-white border border-stone-200 p-6 space-y-3 hover:border-blue-500 hover:shadow-xs transition-all group">
              <span className="text-2xl">🏛️</span>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                Hollow Dome Generator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Generate hemispherical domes for glass planetariums, observatory roofs, and underwater biosphere bases.
              </p>
            </Link>

            <Link href="/minecraft-sphere-generator" className="bg-white border border-stone-200 p-6 space-y-3 hover:border-blue-500 hover:shadow-xs transition-all group">
              <span className="text-2xl">🌐</span>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                Minecraft Sphere Generator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Build perfect 3D voxel spheres and ellipsoids with hollow wall thickness controls.
              </p>
            </Link>

            <Link href="/minecraft-circle-generator" className="bg-white border border-stone-200 p-6 space-y-3 hover:border-blue-500 hover:shadow-xs transition-all group">
              <span className="text-2xl">⭕</span>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                Minecraft Circle Generator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Generate 2D circle charts and pixel layouts from 3 to 256 blocks wide.
              </p>
            </Link>

            <Link href="/minecraft-cone-generator" className="bg-white border border-stone-200 p-6 space-y-3 hover:border-blue-500 hover:shadow-xs transition-all group">
              <span className="text-2xl">🗼</span>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                Minecraft Cone Generator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Create tapered roofs, wizard tower spires, and volcano peak shapes.
              </p>
            </Link>

            <Link href="/minecraft-torus-generator" className="bg-white border border-stone-200 p-6 space-y-3 hover:border-blue-500 hover:shadow-xs transition-all group">
              <span className="text-2xl">🍩</span>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                Torus &amp; Donut Ring Generator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Generate rotating orbital ring stations, sci-fi portals, and circular tube tunnels.
              </p>
            </Link>

            <Link href="/minecraft-geodesic-dome-generator" className="bg-white border border-stone-200 p-6 space-y-3 hover:border-blue-500 hover:shadow-xs transition-all group">
              <span className="text-2xl">🔷</span>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                Geodesic Shell Generator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Triangular strut structural shells for modern architectural domes and greenhouse biomes.
              </p>
            </Link>

          </div>
        </div>
      </section>

      {/* 4. COMPREHENSIVE BUILDING GUIDE & SEO */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-slate-700 text-sm leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              How to Build Perfect Domes in Minecraft (Step-by-Step)
            </h2>
            <p>
              Building rounded structures in Minecraft is challenging because the game world is constructed strictly from cubic 1x1x1 blocks. This generator uses mathematical voxelization algorithms to convert smooth 3D ellipsoidal functions into exact block coordinate layouts.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">1. Prepare Your Materials and Floor Center</h3>
            <p>
              Check the <strong>Total Materials</strong> counter on this page before you start. For instance, a 30-block diameter hollow glass dome requires approximately <strong>1,200 glass blocks (19 stacks)</strong>. Mark your center block (odd diameter) or 2x2 center (even diameter) on your build platform.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">2. Follow the 2D Layer-by-Layer Blueprints</h3>
            <p>
              Set the 2D View to <strong>Top View</strong>. Start at <strong>Layer 1</strong>, lay the foundation ring, and click <strong>Mark Built</strong>. Advance to Layer 2 and observe the ghosted lower layer (onion-skin) to easily know where to place the next ring of blocks.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">3. Even vs. Odd Diameters</h3>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
              <li><strong>Odd Diameter (e.g., 29, 31, 33):</strong> Has a single 1x1 center block. Ideal for centered doors, pathways, and beacon beams.</li>
              <li><strong>Even Diameter (e.g., 30, 32, 34):</strong> Has a 2x2 center block. Ideal for double doors and symmetrical road grids.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section id="faq" className="py-16 bg-[#fdfbf7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Everything you need to know about generating voxel domes and shapes in Minecraft.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-white border border-stone-200 p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900">Can I build domes in Minecraft Survival mode without mods?</h3>
              <p className="text-slate-600 leading-relaxed">
                Yes! Our 2D layer slicer is built specifically for vanilla survival players. You don&apos;t need WorldEdit, Litematica, or any client mods—simply follow the layer numbers on your second monitor or phone while placing blocks.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900">How do hollow domes work?</h3>
              <p className="text-slate-600 leading-relaxed">
                By selecting <strong>1 Block Hollow Shell</strong>, the generator removes all inner blocks, leaving only a 1-block thick outer skin. This saves thousands of blocks and provides maximum usable interior space for your base.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900">What are symmetry lines used for?</h3>
              <p className="text-slate-600 leading-relaxed">
                Symmetry lines render colored vertical arcs (pillars) along the dome shell. You can use different colored blocks (such as Deepslate or Copper) to create stunning stained-glass patterns and reinforced arch supports.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
