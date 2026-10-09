import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Minecraft Dome Generator',
  description: 'Terms of Service for using MinecraftDomeGenerator.cyou.',
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline mb-8 transition font-medium text-xs uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Generator
      </Link>

      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">
        Terms of Service
      </h1>

      <div className="space-y-5 text-xs sm:text-sm leading-relaxed">
        <div className="theme-card p-5 rounded-sm border shadow-2xs space-y-4">
          <h2 className="text-sm font-bold">1. Use of Generator &amp; Blueprints</h2>
          <p className="opacity-90">
            All generated voxel schematics, coordinate layouts, and blueprint exports are free for personal, creative, and commercial use inside Minecraft worlds and servers without royalty or attribution.
          </p>

          <h2 className="text-sm font-bold pt-2">2. Mojang Trademark Disclaimer</h2>
          <p className="opacity-90">
            Minecraft is a trademark of Mojang Synergies AB / Microsoft. MinecraftDomeGenerator.cyou is an independent tool and is not officially affiliated with or endorsed by Mojang.
          </p>
        </div>
      </div>
    </div>
  );
}
