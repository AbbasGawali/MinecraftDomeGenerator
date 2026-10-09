import type { Metadata } from 'next';
import MinecraftShapeGenerator from '@/components/MinecraftShapeGenerator';

export const metadata: Metadata = {
  title: 'Minecraft Torus Generator – 3D Donut Ring & Portal Tube Slicer',
  description:
    'Free Minecraft Torus & Donut Generator. Design circular tube tunnels, space station rings, and sci-fi portals in Minecraft.',
  keywords: [
    'minecraft torus generator',
    'minecraft donut generator',
    'minecraft ring generator',
    'minecraft tube generator',
  ],
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/minecraft-torus-generator',
  },
};

export default function TorusGeneratorPage() {
  return (
    <main className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1">
            3D Torus Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Minecraft Torus &amp; Donut Ring Generator
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Generate 3D hollow rings and torus arches for orbital stargates and futuristic megastructures.
          </p>
        </div>

        <MinecraftShapeGenerator />
      </div>
    </main>
  );
}
