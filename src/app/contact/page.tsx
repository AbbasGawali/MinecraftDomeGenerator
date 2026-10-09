import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Minecraft Dome Generator',
  description: 'Get in touch with the Minecraft Dome Generator team for feature requests, bug reports, or inquiries.',
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline mb-8 transition font-medium text-xs uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Generator
      </Link>

      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">
        Contact Us
      </h1>

      <div className="text-xs sm:text-sm space-y-6 leading-relaxed">
        <p className="opacity-90">
          Have a suggestion for a new voxel algorithm or found a bug in the 2D layer slicer? Reach out to our developer team.
        </p>

        <div className="theme-card p-5 rounded-sm border shadow-2xs space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-emerald-500" />
            <div>
              <div className="text-[10px] opacity-70 uppercase tracking-wider font-bold">Email Support</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-bold">support@minecraftdomegenerator.cyou</div>
            </div>
          </div>
        </div>

        <p className="text-xs opacity-70">
          We usually reply to builder inquiries within 24 to 48 hours.
        </p>
      </div>
    </div>
  );
}
