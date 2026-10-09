import type { Metadata } from 'next';
import Link from 'next/link';

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
    <main className="min-h-screen py-10 bg-[#fdfbf7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="space-y-3">
          <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1">
            Survival Building Tutorial
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            How to Build a Perfect Dome in Minecraft
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Building rounded domes in a blocky world requires careful planning and a step-by-step layer blueprint. Follow this guide to build clean glass domes with zero wasted blocks.
          </p>
        </div>

        <section className="bg-white border border-stone-200 p-8 space-y-8 text-slate-700 text-sm leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-900">Step 1: Calculate Your Required Stacks</h2>
            <p>
              Before placing a single block, determine your dome dimensions in our <strong>3D Dome Generator</strong>. For example, a 30-diameter glass dome requires 1,200 glass blocks (19 stacks). Smelt your sand and prepare ample scaffolding.
            </p>
          </div>

          <div className="space-y-3 border-t border-stone-200 pt-6">
            <h2 className="text-2xl font-bold text-slate-900">Step 2: Establish the Foundation Cross (X and Z Axes)</h2>
            <p>
              Place a center block, then count outward in the 4 cardinal directions (North, South, East, West) to your target radius. Connect the 4 endpoints using the 2D pixel guide for Layer 1.
            </p>
          </div>

          <div className="space-y-3 border-t border-stone-200 pt-6">
            <h2 className="text-2xl font-bold text-slate-900">Step 3: Climb Layer by Layer with Onion Skinning</h2>
            <p>
              Use our tool&apos;s 2D <strong>Top View</strong> with <em>Show Previous Layer Ghosting (Onion-Skin)</em> enabled. As you build upward, each new ring sits slightly inward on the lower layer, naturally forming the dome curvature until you seal the single apex block at the top.
            </p>
          </div>

          <div className="bg-stone-900 text-white p-6 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold">Generate your custom dome blueprint now</h3>
              <p className="text-xs text-stone-300">Set any diameter from 3 to 256 blocks with live 3D preview.</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shrink-0"
            >
              Open 3D Generator →
            </Link>
          </div>

        </section>

      </div>
    </main>
  );
}
