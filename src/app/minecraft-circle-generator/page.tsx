import type { Metadata } from 'next';
import MinecraftShapeGenerator from '@/components/MinecraftShapeGenerator';

export const metadata: Metadata = {
  title: 'Minecraft Circle Generator – 2D Pixel Circle Chart & Layout Tool',
  description:
    'Free Minecraft Circle Generator. Generate pixel-perfect circles and round bases from diameter 3 to 256 blocks with exact block counts.',
  keywords: [
    'minecraft circle generator',
    'minecraft circle chart',
    'minecraft circle guide',
    'pixel circle generator minecraft',
    'minecraft round base template',
  ],
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/minecraft-circle-generator',
  },
};

export default function CircleGeneratorPage() {
  return (
    <main className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1">
            2D Circle Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Minecraft Circle Generator &amp; Chart
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Create clean 2D circle layouts for building circular tower floors, portal rings, and castle arenas with exact block perimeter counts.
          </p>
        </div>

        <MinecraftShapeGenerator />
      </div>
    </main>
  );
}
