import type { Metadata } from 'next';
import MinecraftShapeGenerator from '@/components/MinecraftShapeGenerator';

export const metadata: Metadata = {
  title: 'Minecraft Cone Generator 3D – Tapered Roofs & Tower Spires Builder',
  description:
    'Free Minecraft Cone Generator. Build 3D voxel cones, wizard tower spires, and pyramid roofs with layer-by-layer blueprints.',
  keywords: [
    'minecraft cone generator',
    'minecraft cone builder',
    'minecraft tower spire generator',
    'minecraft cone roof blueprint',
  ],
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/minecraft-cone-generator',
  },
};

export default function ConeGeneratorPage() {
  return (
    <main className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1">
            3D Cone Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Minecraft Cone &amp; Tower Spire Generator
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Generate tapered cone spires and roofs with customizable base diameter and vertical height scaling.
          </p>
        </div>

        <MinecraftShapeGenerator />
      </div>
    </main>
  );
}
