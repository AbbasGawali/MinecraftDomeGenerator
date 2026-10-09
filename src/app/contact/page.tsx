import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare } from 'lucide-react';

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
        className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Generator
      </Link>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
        Contact Us
      </h1>

      <div className="text-zinc-300 space-y-6 leading-relaxed">
        <p>
          Have a suggestion for a new voxel algorithm, found a bug in the 2D layer slicer, or want to suggest new color palettes? We&apos;d love to hear from you.
        </p>

        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Email Support</div>
              <div className="text-white font-mono text-sm">support@minecraftdomegenerator.cyou</div>
            </div>
          </div>
        </div>

        <p className="text-sm text-zinc-400">
          We usually reply to builder inquiries within 24 to 48 hours.
        </p>
      </div>
    </div>
  );
}
