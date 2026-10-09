import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Minecraft Dome Generator',
  description: 'Privacy Policy for MinecraftDomeGenerator.cyou. Learn about our client-side zero-tracking approach.',
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition font-medium text-xs uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Generator
      </Link>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6">
        Privacy Policy
      </h1>

      <div className="space-y-5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        <p className="text-zinc-500 text-xs">Last Updated: October 2026</p>

        <div className="p-5 rounded-sm bg-[#181d24] border border-[#2d3540] space-y-4">
          <h2 className="text-sm font-bold text-white">1. Client-Side Processing</h2>
          <p>
            MinecraftDomeGenerator.cyou runs 100% inside your browser runtime. We do not store or transmit your custom structure dimensions, layer build progress, or schematics to remote servers.
          </p>

          <h2 className="text-sm font-bold text-white pt-2">2. Local Preferences</h2>
          <p>
            Your browser may use local storage to remember your preferred color palette or active build layer. This data stays entirely on your local machine.
          </p>
        </div>
      </div>
    </div>
  );
}
