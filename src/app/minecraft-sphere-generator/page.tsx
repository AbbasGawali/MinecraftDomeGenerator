import type { Metadata } from 'next';
import MinecraftShapeGenerator from '@/components/MinecraftShapeGenerator';

export const metadata: Metadata = {
  title: 'Minecraft Sphere Generator 3D – Layer Plans & Schematics (Plotz Alternative)',
  description:
    'Free online 3D Minecraft Sphere Generator. Create hollow or solid spheres, balls, and ellipsoids up to 256 blocks with layer-by-layer blueprints for Java & Bedrock.',
  keywords: [
    'minecraft sphere generator',
    'minecraft sphere generator 3d',
    'minecraft sphere blueprints',
    'minecraft hollow sphere generator',
    'plotz sphere generator',
    'minecraft sphere maker',
    'how to make a sphere in minecraft',
    'minecraft ball generator',
    'minecraft sphere layer by layer',
  ],
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/minecraft-sphere-generator',
  },
};

export default function SphereGeneratorPage() {
  return (
    <main className="min-h-screen">
      <MinecraftShapeGenerator
        initialShape="sphere"
        initialDiameter={30}
        initialHeight={30}
        title="Minecraft Sphere Generator (3D & 2D Layer Plans)"
        subtitle="Generate hollow or solid 3D voxel spheres, giant planets, and orbital biospheres in Minecraft with layer-by-layer blueprints."
      />

      {/* SEO Guide & Sphere Size Reference */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-12 text-xs sm:text-sm">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">
            How to Build a Perfect Sphere in Minecraft
          </h2>
          <p className="leading-relaxed opacity-80">
            Minecraft worlds are built out of rigid 1x1 cubic blocks, which makes building circular and spherical objects difficult without a visual template. The <strong>Minecraft Sphere Generator</strong> utilizes discrete voxel math to calculate the surface shell of any sphere equation: <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">x² + y² + z² = r²</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="theme-card p-5 space-y-2 rounded-sm border shadow-2xs">
            <h3 className="font-bold text-sm">Why Use Hollow Spheres?</h3>
            <p className="leading-relaxed opacity-80 text-xs">
              Building a solid sphere requires massive amounts of resources (a solid 30-diameter sphere takes over 14,000 blocks). A 1-block hollow sphere uses only ~2,700 blocks, saving you 80% of mining time while providing an open interior for multi-floor rooms.
            </p>
          </div>

          <div className="theme-card p-5 space-y-2 rounded-sm border shadow-2xs">
            <h3 className="font-bold text-sm">Step-by-Step Layer Placement</h3>
            <p className="leading-relaxed opacity-80 text-xs">
              Start at the bottom-most layer (Layer 1). Lay down the single block or initial 2x2 platform. Step upward layer by layer using our 2D Top View with onion skin ghosting to position your perimeter blocks accurately.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
