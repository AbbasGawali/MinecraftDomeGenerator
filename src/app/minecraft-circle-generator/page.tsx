import type { Metadata } from 'next';
import MinecraftShapeGenerator from '@/components/MinecraftShapeGenerator';

export const metadata: Metadata = {
  title: 'Minecraft Circle Generator – Pixel Circle Chart & Layout Tool',
  description:
    'Free online Minecraft Circle Generator. Generate perfect 2D pixel circles, circle charts, and base outlines from 3 to 256 blocks for Java & Bedrock builds.',
  keywords: [
    'minecraft circle generator',
    'minecraft circle chart',
    'minecraft pixel circle',
    'minecraft circle template',
    'how to make a circle in minecraft',
    'minecraft circle maker',
    '50x50 circle minecraft',
    'minecraft circle layout',
  ],
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/minecraft-circle-generator',
  },
};

export default function CircleGeneratorPage() {
  return (
    <main className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-2">
          <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1">
            2D Pixel Circle Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Minecraft Circle Generator (Pixel Circle Charts)
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Generate pixel-perfect circle guides for building towers, round arenas, circular crop farms, and base foundations in Minecraft.
          </p>
        </div>

        {/* Generator */}
        <MinecraftShapeGenerator />

        {/* Circle Math Guide */}
        <div className="max-w-4xl mx-auto space-y-8 py-8 border-t border-stone-200 text-slate-700 text-sm">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900">
              How to Make Perfect Circles in Minecraft
            </h2>
            <p>
              To make a circle in Minecraft without mods, you use discrete mid-point circle rasterization algorithms (Bresenham&apos;s circle algorithm). Our generator calculates the exact symmetrical block steps along the 4 cardinal quadrants (North, South, East, West).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-stone-200 p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900">Even vs Odd Circle Diameters</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Odd circles (e.g. 15, 21, 31 blocks) have a single center block. Even circles (e.g. 16, 20, 30 blocks) have a 2x2 center. For castle towers with single doors, choose odd; for 2-wide pathways or double doors, choose even.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900">Building Cardinal Spokes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Always place your crosshair spokes (+ shape from center to 4 outer edges) first. Then connect the four ends by matching the block sequences indicated on our 2D grid.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
