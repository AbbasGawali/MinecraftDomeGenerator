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
        className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Generator
      </Link>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
        Privacy Policy
      </h1>

      <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm leading-relaxed">
        <p className="text-zinc-400 text-xs">Last Updated: October 2026</p>

        <h2 className="text-xl font-bold text-white mt-6">1. Client-Side Architecture</h2>
        <p>
          MinecraftDomeGenerator.cyou operates primarily as a client-side web application. All voxel computations, 3D instanced rendering, 2D slicing, and blueprint exports happen in your local browser runtime. We do not store or transmit your custom build dimensions or layer progress to our servers.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">2. Cookies and Analytics</h2>
        <p>
          We may use minimal, privacy-friendly analytics and local storage (such as remembering your active color palette or completed layer checkmarks) solely to enhance your user experience. We do not sell your personal data or track you across third-party websites.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">3. Third-Party Links</h2>
        <p>
          Our guides may link to official resources (such as Minecraft.net or community wikis). We are not responsible for the privacy practices of external websites.
        </p>
      </div>
    </div>
  );
}
