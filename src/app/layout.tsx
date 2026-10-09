import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ThemeProvider } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
  metadataBase: new URL('https://minecraftdomegenerator.cyou'),
  title: 'Minecraft Dome Generator | 3D Voxel Dome Maker & Layer Blueprints (Java & Bedrock)',
  description:
    'Free online 3D Minecraft Dome Generator & Sphere Maker. Generate hollow dome roofs, observatories, hemisphere layers, 2D voxel blueprints, and block counts for Java & Bedrock.',
  keywords: [
    'minecraft dome generator',
    'minecraft dome generator 3d',
    'minecraft dome generator online',
    'minecraft dome maker',
    'minecraft dome blueprint',
    'minecraft half sphere generator',
    'minecraft hemisphere roof layer plans',
    'plotz minecraft dome generator',
    'minecraft sphere generator',
    'minecraft circle generator',
    'minecraft shape generator',
    'minecraft hollow dome generator',
    'minecraft glass dome calculator',
    'layer by layer minecraft dome',
    'minecraft voxel generator 3d',
    'minecraft bedrock dome generator',
    'minecraft java dome blueprints',
  ],
  authors: [{ name: 'MinecraftDomeGenerator.cyou Team' }],
  creator: 'MinecraftDomeGenerator.cyou',
  publisher: 'MinecraftDomeGenerator.cyou',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://minecraftdomegenerator.cyou',
    siteName: 'Minecraft Dome Generator & Shape Maker',
    title: 'Minecraft Dome Generator – 3D & 2D Layer Blueprint Slicer',
    description:
      'Build perfect Minecraft dome roofs, underwater glass biospheres, hollow spheres, and cones of any size with real-time 3D preview and 2D layer-by-layer voxel blueprints.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Minecraft Dome Generator (3D & 2D Layer Plans)',
    description:
      'Free client-side Minecraft dome & shape generator. Interactive 3D preview, 2D layer slicer, and survival block counts.',
  },
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://minecraftdomegenerator.cyou/#webapp',
        url: 'https://minecraftdomegenerator.cyou/',
        name: 'Minecraft Dome Generator',
        alternateName: ['Minecraft Dome Maker', 'Minecraft 3D Sphere & Dome Generator', 'Plotz Dome Generator Alternative'],
        applicationCategory: 'DesignApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires WebGL and JavaScript.',
        description:
          'Free client-side 3D and 2D layer-by-layer voxel shape generator for Minecraft players. Build perfect domes, spheres, cones, toruses, and hemisphere roofs with live material block counts.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          '3D Interactive WebGL Instanced Voxel Orbit Preview',
          '2D Layer Slicer with Multi-Angle Projections (Top, Front, Side)',
          'Onion-Skin Ghosting of Previous Layers',
          'Survival Material Stack & Shulker Box Calculator',
          'Configurable Symmetry Lines and Longitudinal Arcs',
          'Support for Domes, Spheres, Cones, Cylinders, Toruses, and Geodesics',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://minecraftdomegenerator.cyou/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do you generate a dome in Minecraft?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Select your desired diameter and height in the Minecraft Dome Generator. The tool calculates the 3D voxel hemisphere and breaks it down into step-by-step 2D layers with exact block coordinates and material counts for survival or creative builds.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I build Minecraft domes in Survival mode without mods?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Our 2D layer-by-layer slicer displays the exact block footprint for each horizontal layer with onion-skin ghosting of lower layers, so you can build perfect circular domes in vanilla Java or Bedrock without WorldEdit or mods.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do hollow domes save blocks in Minecraft?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hollow domes only place blocks along the outermost 1-block (or 2-block) perimeter shell, leaving the interior hollow. For example, a 30-block hollow glass dome uses ~1,200 blocks compared to over 14,000 blocks for a solid structure.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between even and odd diameter circles and domes?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'An odd diameter (e.g. 29, 31) has a single 1x1 center block, perfect for single-block doors and beacon towers. An even diameter (e.g. 30, 32) has a 2x2 center block, ideal for double doors, symmetrical roads, and 2-wide corridors.',
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="dark-theme scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-emerald-500/30 selection:text-emerald-300">
        <ThemeProvider>
          {/* Navigation Bar */}
          <header className="sticky top-0 z-50 bg-[#161b22]/95 backdrop-blur-md border-b border-[#2d3540]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-sm bg-[#21272e] flex items-center justify-center p-1 border-t-2 border-l-2 border-[#3f4a59] border-b-2 border-r-2 border-[#111418]">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect x="6" y="6" width="88" height="88" rx="2" fill="#14171a" stroke="#10b981" strokeWidth="6"/>
                    <rect x="20" y="70" width="60" height="10" fill="#059669"/>
                    <rect x="28" y="58" width="44" height="12" fill="#34d399"/>
                    <rect x="36" y="44" width="28" height="14" fill="#38bdf8"/>
                    <rect x="44" y="32" width="12" height="12" fill="#f59e0b"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold leading-none tracking-tight text-base">
                    MinecraftDome<span className="text-emerald-400 font-extrabold">.cyou</span>
                  </span>
                  <span className="text-[9px] font-bold tracking-wider text-emerald-500 uppercase mt-0.5">
                    Voxel Blueprint Slicer
                  </span>
                </div>
              </Link>

              {/* Quick Actions & Light/Dark Switch */}
              <div className="flex items-center gap-3">
                <Link
                  href="/guides/how-to-build-a-dome-in-minecraft"
                  className="text-xs font-semibold text-zinc-300 hover:text-emerald-400 transition"
                >
                  Guide
                </Link>
                <Link
                  href="/about"
                  className="text-xs font-semibold text-zinc-300 hover:text-emerald-400 transition"
                >
                  About
                </Link>

                {/* Light / Dark Mode Toggle Switch */}
                <ThemeToggle />

                <a
                  href="#generator"
                  className="mc-button-green px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm"
                >
                  Start Build
                </a>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1">{children}</div>

          {/* Footer */}
          <footer className="bg-[#0e1013] border-t border-[#21272e] mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-xs bg-emerald-500 flex items-center justify-center text-black text-xs font-bold">
                      M
                    </div>
                    <span className="font-bold text-white text-sm">MinecraftDome.cyou</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Fast client-side 3D voxel generator &amp; layer slicer for Java &amp; Bedrock builders.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Presets</div>
                  <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                    <Link href="/" className="hover:text-emerald-400 transition">Dome</Link> •
                    <Link href="/minecraft-sphere-generator" className="hover:text-emerald-400 transition">Sphere</Link> •
                    <Link href="/minecraft-circle-generator" className="hover:text-emerald-400 transition">Circle</Link> •
                    <Link href="/minecraft-cone-generator" className="hover:text-emerald-400 transition">Cone</Link> •
                    <Link href="/minecraft-torus-generator" className="hover:text-emerald-400 transition">Torus</Link> •
                    <Link href="/minecraft-geodesic-dome-generator" className="hover:text-emerald-400 transition">Geodesic</Link>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Legal</div>
                  <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                    <Link href="/about" className="hover:text-emerald-400 transition">About</Link> •
                    <Link href="/contact" className="hover:text-emerald-400 transition">Contact</Link> •
                    <Link href="/privacy" className="hover:text-emerald-400 transition">Privacy</Link> •
                    <Link href="/terms" className="hover:text-emerald-400 transition">Terms</Link>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1c2024] text-[11px] text-zinc-500 text-center">
                © 2026 MinecraftDomeGenerator.cyou. Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
