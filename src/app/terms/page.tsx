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
        className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Generator
      </Link>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
        Terms of Service
      </h1>

      <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm leading-relaxed">
        <p className="text-zinc-400 text-xs">Last Updated: October 2026</p>

        <h2 className="text-xl font-bold text-white mt-6">1. Acceptance of Terms</h2>
        <p>
          By accessing and using MinecraftDomeGenerator.cyou, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">2. Intellectual Property</h2>
        <p>
          All generator algorithms, UI designs, code, and documentation on this website are proprietary property. The generated schematics, voxel coordinate arrays, and blueprints you create using this tool are yours to use freely in personal, commercial, or community Minecraft projects without royalty or attribution.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">3. Disclaimer</h2>
        <p>
          Minecraft is a registered trademark of Mojang AB / Microsoft Corporation. This tool is provided &quot;as is&quot; without warranty of any kind, either expressed or implied.
        </p>
      </div>
    </div>
  );
}
