import type { Metadata } from 'next';
import MinecraftShapeGenerator from '@/components/MinecraftShapeGenerator';
import Link from 'next/link';

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
    <main className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-2">
          <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1">
            3D Voxel Sphere Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Minecraft Sphere Generator (3D &amp; 2D Layer Plans)
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Generate hollow or solid 3D voxel spheres, giant planets, and orbital biospheres in Minecraft. Select your diameter from 3 to 256 blocks and follow the layer-by-layer blueprints in Survival or Creative.
          </p>
        </div>

        {/* Generator */}
        <MinecraftShapeGenerator />

        {/* SEO Guide & Sphere Size Reference */}
        <div className="max-w-4xl mx-auto space-y-10 py-8 border-t border-stone-200 text-slate-700 text-sm">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900">
              How to Build a Perfect Sphere in Minecraft
            </h2>
            <p>
              Minecraft worlds are built out of rigid 1x1 cubic blocks, which makes building circular and spherical objects difficult without a visual template. The <strong>Minecraft Sphere Generator</strong> utilizes discrete voxel math to calculate the surface shell of any sphere equation: <code className="bg-stone-100 px-1 py-0.5 font-mono text-xs">x² + y² + z² = r²</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-stone-200 p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900">Why Use Hollow Spheres?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Building a solid sphere requires massive amounts of resources (a solid 30-diameter sphere takes over 14,000 blocks). A 1-block hollow sphere uses only ~2,700 blocks, saving you 80% of mining time while providing an open interior for multi-floor rooms.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-5 space-y-2">
              <h3 className="font-bold text-base text-slate-900">Step-by-Step Layer Placement</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Start at the bottom-most layer (Layer 1). Lay down the single block or initial 2x2 platform. Step upward layer by layer using our 2D Top View with onion skin ghosting to position your perimeter blocks accurately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
