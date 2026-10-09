import type { Metadata } from 'next';
import MinecraftShapeGenerator from '@/components/MinecraftShapeGenerator';

export const metadata: Metadata = {
  title: 'Minecraft Geodesic Dome Generator – Triangular Strut Biosphere Slicer',
  description:
    'Free Minecraft Geodesic Dome Generator. Generate architectural geodesic shells, triangular strut biospheres, and greenhouse domes.',
  keywords: [
    'minecraft geodesic dome generator',
    'minecraft geodesic sphere',
    'minecraft greenhouse dome',
    'minecraft biosphere builder',
  ],
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/minecraft-geodesic-dome-generator',
  },
};

export default function GeodesicDomeGeneratorPage() {
  return (
    <main className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1">
            Geodesic Architecture Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Minecraft Geodesic Dome Generator
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Construct geodesic domes with reinforced strut geometry for survival greenhouses, botanical gardens, and sci-fi biospheres.
          </p>
        </div>

        <MinecraftShapeGenerator />
      </div>
    </main>
  );
}
