import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Layers, Sparkles, CheckCircle2, Sliders, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Build Smooth Curves with Half Slabs in Minecraft | Tutorial',
  description: 'Master the art of smoothing Minecraft domes, spheres, and roofs using upper and lower half slabs. Step-by-step techniques and transition formulas.',
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/guides/half-slab-smooth-curves-guide',
  },
};

export default function HalfSlabGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Generator
      </Link>

      <article className="prose prose-invert max-w-none">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-medium">
            Building Technique
          </span>
          <span className="text-zinc-500 text-xs">Updated for Minecraft 1.21+</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
          How to Build Smooth Curved Domes with Half Slabs
        </h1>

        <p className="text-lg text-zinc-300 leading-relaxed mb-8">
          The biggest challenge when building large curved roofs or rounded domes in Minecraft is the &quot;blocky stair-step&quot; effect. By incorporating top slabs, bottom slabs, and upside-down stairs, you can double your vertical resolution from 1.0 block intervals down to 0.5 block increments.
        </p>

        {/* Highlight Card */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 to-zinc-900 my-8">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-emerald-400" /> The Half-Block Advantage
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            A standard full-block dome creates steep 1-block steps at the apex and shallow 1-block steps at the base. Replacing steep transitions with half-slab pairs creates a smooth parabolic arc that looks almost circular even from medium viewing distances.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Anatomy of Half-Slab Curvature</h2>
        <p className="text-zinc-300 leading-relaxed">
          In Minecraft, a vertical layer can be divided into four possible states:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="font-semibold text-white mb-1">Bottom Slab (Lower Half)</div>
            <div className="text-xs text-zinc-400">Y-elevation: 0.0 to 0.5. Perfect for gradual floor transitions and shallow base expansions.</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="font-semibold text-white mb-1">Top Slab (Upper Half)</div>
            <div className="text-xs text-zinc-400">Y-elevation: 0.5 to 1.0. Placed under ceiling blocks to ease the roof curvature upwards.</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="font-semibold text-white mb-1">Full Solid Block</div>
            <div className="text-xs text-zinc-400">Y-elevation: 0.0 to 1.0. Used where the slope is approximately 45 degrees.</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="font-semibold text-white mb-1">Stair Transition</div>
            <div className="text-xs text-zinc-400">Provides diagonal contouring between full blocks and top/bottom slabs.</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. Step-by-Step Transition Formula</h2>
        <p className="text-zinc-300 leading-relaxed">
          When transitioning from the outer perimeter wall upward toward the dome apex, use this sequential stacking order for a smooth 15-block radius curve:
        </p>
        <ol className="list-decimal list-inside space-y-3 text-zinc-300 my-6">
          <li><strong>Base Ring:</strong> 3 vertical full blocks (nearly 90° steep).</li>
          <li><strong>First Inward Step:</strong> 2 vertical full blocks + 1 upside-down stair facing inward.</li>
          <li><strong>Mid Slope:</strong> 1 full block + 1 top slab attached to the upper half.</li>
          <li><strong>Shallow Apex Ring:</strong> 1 bottom slab spanning 2 horizontal blocks.</li>
          <li><strong>Crown Peak:</strong> 1 centered top slab or single full block cap.</li>
        </ol>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Common Pitfalls &amp; Solutions</h2>
        <div className="space-y-4 my-6">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-white">Lighting Glitches under Top Slabs</div>
              <div className="text-xs text-zinc-400 mt-1">Light passes through half slabs in Java and Bedrock editions differently. Ensure you place hidden light sources (Sea Lanterns, Shroomlights, or Glow Lichen) underneath to prevent hostile mob spawns.</div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-white">Matching Material Texture Palettes</div>
              <div className="text-xs text-zinc-400 mt-1">Not all blocks have slab variants (e.g. Concrete or Stained Glass). If you want half-slab smoothing, choose Stone Bricks, Deepslate, Quartz, Copper, or Wood Planks.</div>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-500/30 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Ready to plan your dome?</h3>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mb-6">
            Configure custom diameter, height, and symmetry lines with our interactive 3D voxel builder and print layer blueprints.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition shadow-lg shadow-emerald-500/20"
          >
            Open 3D Dome Generator
          </Link>
        </div>
      </article>
    </div>
  );
}
