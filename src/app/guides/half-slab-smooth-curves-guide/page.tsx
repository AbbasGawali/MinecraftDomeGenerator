import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

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
        className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline mb-8 transition font-medium text-xs uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Generator
      </Link>

      <article className="space-y-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold">
            Building Technique
          </span>
          <span className="opacity-60 text-xs font-mono">Updated for Minecraft 1.21+</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          How to Build Smooth Curved Domes with Half Slabs
        </h1>

        <p className="text-sm sm:text-base opacity-85 leading-relaxed">
          The biggest challenge when building large curved roofs or rounded domes in Minecraft is the &quot;blocky stair-step&quot; effect. By incorporating top slabs, bottom slabs, and upside-down stairs, you can double your vertical resolution from 1.0 block intervals down to 0.5 block increments.
        </p>

        {/* Highlight Card */}
        <div className="p-6 rounded-sm theme-card border border-emerald-500/40 shadow-2xs my-8 space-y-2">
          <h3 className="text-lg font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-5 h-5" /> The Half-Block Advantage
          </h3>
          <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
            A standard full-block dome creates steep 1-block steps at the apex and shallow 1-block steps at the base. Replacing steep transitions with half-slab pairs creates a smooth parabolic arc that looks almost circular even from medium viewing distances.
          </p>
        </div>

        <h2 className="text-xl font-bold pt-4">1. Anatomy of Half-Slab Curvature</h2>
        <p className="opacity-85 text-xs sm:text-sm leading-relaxed">
          In Minecraft, a vertical layer can be divided into four possible states:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-sm theme-card border shadow-2xs">
            <div className="font-bold text-sm mb-1 text-emerald-600 dark:text-emerald-400">Bottom Slab (Lower Half)</div>
            <div className="text-xs opacity-75">Y-elevation: 0.0 to 0.5. Perfect for gradual floor transitions and shallow base expansions.</div>
          </div>
          <div className="p-4 rounded-sm theme-card border shadow-2xs">
            <div className="font-bold text-sm mb-1 text-emerald-600 dark:text-emerald-400">Top Slab (Upper Half)</div>
            <div className="text-xs opacity-75">Y-elevation: 0.5 to 1.0. Placed under ceiling blocks to ease the roof curvature upwards.</div>
          </div>
          <div className="p-4 rounded-sm theme-card border shadow-2xs">
            <div className="font-bold text-sm mb-1 text-emerald-600 dark:text-emerald-400">Full Solid Block</div>
            <div className="text-xs opacity-75">Y-elevation: 0.0 to 1.0. Used where the slope is approximately 45 degrees.</div>
          </div>
          <div className="p-4 rounded-sm theme-card border shadow-2xs">
            <div className="font-bold text-sm mb-1 text-emerald-600 dark:text-emerald-400">Stair Transition</div>
            <div className="text-xs opacity-75">Provides diagonal contouring between full blocks and top/bottom slabs.</div>
          </div>
        </div>

        <h2 className="text-xl font-bold pt-6">2. Step-by-Step Transition Formula</h2>
        <p className="opacity-85 text-xs sm:text-sm leading-relaxed">
          When transitioning from the outer perimeter wall upward toward the dome apex, use this sequential stacking order for a smooth 15-block radius curve:
        </p>
        <ol className="list-decimal list-inside space-y-2 opacity-85 text-xs sm:text-sm">
          <li><strong>Base Ring:</strong> 3 vertical full blocks (nearly 90° steep).</li>
          <li><strong>First Inward Step:</strong> 2 vertical full blocks + 1 upside-down stair facing inward.</li>
          <li><strong>Mid Slope:</strong> 1 full block + 1 top slab attached to the upper half.</li>
          <li><strong>Shallow Apex Ring:</strong> 1 bottom slab spanning 2 horizontal blocks.</li>
          <li><strong>Center Cap:</strong> 1 single full block or glass beacon cap.</li>
        </ol>

        <div className="p-6 border theme-border rounded flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-500/5 mt-8">
          <div>
            <h3 className="text-base font-bold">Try Smooth Curves in the Generator</h3>
            <p className="text-xs opacity-75">Enable the &quot;Smooth Curve (half slabs)&quot; toggle in the generator controls.</p>
          </div>
          <Link
            href="/"
            className="mc-button-green px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4" /> Open Generator
          </Link>
        </div>
      </article>
    </div>
  );
}
