import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | Minecraft Dome & Shape Generator',
  description: 'Learn about MinecraftDomeGenerator.cyou, the fastest 100% client-side 3D voxel blueprint tool for Minecraft builders.',
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline mb-8 transition font-medium text-xs uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Generator
      </Link>

      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">
        About Minecraft Dome Generator
      </h1>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <div className="theme-card p-5 rounded-sm border shadow-2xs space-y-3">
          <p>
            <strong className="font-bold">MinecraftDomeGenerator.cyou</strong> is a dedicated 100% client-side 3D voxel blueprint generator built for Minecraft builders, redstone engineers, and survival players.
          </p>
          <p className="opacity-90">
            It eliminates the frustration of guessing curved spherical roofs, uneven circle foundations, and distorted cones by providing mathematical voxel precision directly in your browser.
          </p>
        </div>

        <h2 className="text-lg font-bold pt-4">Core Principles</h2>
        <ul className="list-disc list-inside space-y-2 opacity-85">
          <li><strong>Zero Server Lag:</strong> Instant 3D instanced rendering runs completely on your local device.</li>
          <li><strong>Vanilla Survival Friendly:</strong> No WorldEdit or mods required. Follow layer-by-layer blueprints on any screen.</li>
          <li><strong>Privacy First:</strong> Your builds and custom dimensions are never stored on external servers.</li>
        </ul>

        <div className="pt-6 border-t theme-border opacity-70">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2">Disclaimer</h3>
          <p className="text-xs">
            Minecraft is a registered trademark of Mojang Synergies AB / Microsoft. This tool is an independent fan project.
          </p>
        </div>
      </div>
    </div>
  );
}
