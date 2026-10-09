import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Box, Shield, Zap, Sparkles } from 'lucide-react';

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
        className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Generator
      </Link>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
        About Minecraft Dome Generator
      </h1>

      <div className="prose prose-invert max-w-none text-zinc-300 space-y-6 leading-relaxed">
        <p>
          <strong>MinecraftDomeGenerator.cyou</strong> was built to solve a classic Minecraft problem: building organic, curved shapes like domes, spheres, cones, and geodesics in a voxel grid without guessing or wasting hours tearing down mismatched blocks.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Why We Built This</h2>
        <p>
          Many classic tools are slow, dated, cluttered with heavy ads, or require server-side rendering that stutters on large builds. We rebuilt the experience from the ground up with:
        </p>

        <ul className="list-disc list-inside space-y-2 text-zinc-300">
          <li><strong>100% Client-Side Engine:</strong> Instant Three.js instanced rendering capable of processing thousands of voxels at 60 FPS directly in your browser.</li>
          <li><strong>Zero Data Tracking:</strong> Your designs and custom dimensions never leave your device.</li>
          <li><strong>Survival-Ready Assistants:</strong> Layer-by-layer 2D slicing with onion skinning, block stack calculators (chests, shulkers, 64-stacks), and printable blueprints.</li>
          <li><strong>Complex Symmetry Lines:</strong> Configurable longitudinal strut overlays for creating glass greenhouse domes, observatories, and stargate portals.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Disclaimer &amp; Trademark Notice</h2>
        <p className="text-sm text-zinc-400">
          Minecraft is a trademark of Mojang Synergies AB / Microsoft Corporation. MinecraftDomeGenerator.cyou is an independent community fan project and is not affiliated with, endorsed by, or associated with Mojang or Microsoft.
        </p>
      </div>
    </div>
  );
}
