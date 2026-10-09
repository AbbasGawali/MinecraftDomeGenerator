import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Build a Dome in Minecraft: The Ultimate Survival Guide',
  description:
    'Step-by-step masterclass on building perfect circular and hollow glass domes in Minecraft Survival mode. Center blocks, scaffolding, and layer tips.',
  keywords: [
    'how to build a dome in minecraft',
    'minecraft dome tutorial',
    'minecraft glass dome guide',
    'minecraft dome circle template',
  ],
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/guides/how-to-build-a-dome-in-minecraft',
  },
};

export default function HowToBuildADomePage() {
  return (
    <main className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline transition font-medium text-xs uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Generator
        </Link>
        
        <div className="space-y-3">
          <div className="inline-block bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded">
            Survival Building Tutorial
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            How to Build a Perfect Dome in Minecraft
          </h1>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed">
            Building rounded domes in a blocky world requires careful planning and a step-by-step layer blueprint. Follow this guide to build clean glass domes with zero wasted blocks.
          </p>
        </div>

        <section className="theme-card border p-8 space-y-8 text-sm leading-relaxed rounded-sm shadow-2xs">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Step 1: Calculate Your Required Stacks</h2>
            <p className="opacity-90">
              Before placing a single block, determine your dome dimensions in our <strong>3D Dome Generator</strong>. For example, a 30-diameter glass dome requires 1,200 glass blocks (19 stacks). Smelt your sand and prepare ample scaffolding.
            </p>
          </div>

          <div className="space-y-3 border-t theme-border pt-6">
            <h2 className="text-2xl font-bold">Step 2: Establish the Foundation Cross (X and Z Axes)</h2>
            <p className="opacity-90">
              Place a center block, then count outward in the 4 cardinal directions (North, South, East, West) to your target radius. Connect the 4 endpoints using the 2D pixel guide for Layer 1.
            </p>
          </div>

          <div className="space-y-3 border-t theme-border pt-6">
            <h2 className="text-2xl font-bold">Step 3: Climb Layer by Layer with Onion Skinning</h2>
            <p className="opacity-90">
              Use our tool&apos;s 2D <strong>Top View</strong> with <em>Show Previous Layer Ghosting (Onion-Skin)</em> enabled. As you build upward, each new ring sits slightly inward on the lower layer, naturally forming the dome curvature until you seal the single apex block at the top.
            </p>
          </div>

          <div className="p-6 border theme-border rounded flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-500/5">
            <div>
              <h3 className="text-base font-bold">Generate your custom dome blueprint now</h3>
              <p className="text-xs opacity-75">Set any diameter from 3 to 256 blocks with live 3D preview.</p>
            </div>
            <Link
              href="/"
              className="mc-button-green px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm flex items-center gap-2 shrink-0"
            >
              <Sparkles className="w-4 h-4" /> Open 3D Generator
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
