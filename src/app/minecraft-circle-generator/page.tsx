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
    <main className="min-h-screen">
      <MinecraftShapeGenerator
        initialShape="cylinder"
        initialDiameter={30}
        initialHeight={1}
        title="Minecraft Circle Generator (Pixel Circle Charts)"
        subtitle="Generate pixel-perfect circle guides for building towers, round arenas, circular crop farms, and base foundations in Minecraft."
      />

      {/* Circle Math Guide */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-12 text-xs sm:text-sm">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">
            How to Make Perfect Circles in Minecraft
          </h2>
          <p className="leading-relaxed opacity-80">
            To make a circle in Minecraft without mods, you use discrete mid-point circle rasterization algorithms (Bresenham&apos;s circle algorithm). Our generator calculates the exact symmetrical block steps along the 4 cardinal quadrants (North, South, East, West).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 space-y-2 rounded-sm border border-stone-200 dark:border-[#2d3540] bg-white dark:bg-[#181d24]">
            <h3 className="font-bold text-sm">Even vs Odd Circle Diameters</h3>
            <p className="leading-relaxed opacity-75 text-xs">
              Odd circles (e.g. 15, 21, 31 blocks) have a single center block. Even circles (e.g. 16, 20, 30 blocks) have a 2x2 center. For castle towers with single doors, choose odd; for 2-wide pathways or double doors, choose even.
            </p>
          </div>

          <div className="p-5 space-y-2 rounded-sm border border-stone-200 dark:border-[#2d3540] bg-white dark:bg-[#181d24]">
            <h3 className="font-bold text-sm">Building Cardinal Spokes</h3>
            <p className="leading-relaxed opacity-75 text-xs">
              Always place your crosshair spokes (+ shape from center to 4 outer edges) first. Then connect the four ends by matching the block sequences indicated on our 2D grid.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
