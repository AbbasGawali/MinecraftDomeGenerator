import type { Metadata } from 'next';
import MinecraftShapeGenerator from '@/components/MinecraftShapeGenerator';

export const metadata: Metadata = {
  title: 'Minecraft Sphere Generator 3D – Free Voxel Sphere & Ellipsoid Slicer',
  description:
    'Free online 3D Minecraft Sphere Generator. Calculate and slice hollow spheres, balls, and ellipsoids with layer-by-layer blueprints.',
  keywords: [
    'minecraft sphere generator',
    'minecraft sphere builder',
    'minecraft hollow sphere generator',
    'minecraft ball generator',
    'plotz sphere generator alternative',
  ],
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/minecraft-sphere-generator',
  },
};

export default function SphereGeneratorPage() {
  return (
    <main className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1">
            3D Voxel Sphere Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Minecraft Sphere Generator (3D &amp; 2D Slicer)
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Generate full hollow or solid 3D spheres in Minecraft. Adjust diameter, wall thickness, and follow 2D pixel cross-sections from layer 1 to top.
          </p>
        </div>

        <MinecraftShapeGenerator />
      </div>
    </main>
  );
}
