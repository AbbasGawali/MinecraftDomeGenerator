import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

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
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[#f8f9fa] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center p-1 border border-slate-800 shadow-2xs group-hover:border-blue-500 transition-colors">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect x="6" y="6" width="88" height="88" rx="8" fill="#0f172a" stroke="#2563eb" strokeWidth="6"/>
                  <rect x="20" y="70" width="60" height="10" rx="2" fill="#0284c7"/>
                  <rect x="28" y="58" width="44" height="12" rx="2" fill="#0369a1"/>
                  <rect x="36" y="44" width="28" height="14" rx="2" fill="#0ea5e9"/>
                  <rect x="44" y="32" width="12" height="12" rx="2" fill="#38bdf8"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 font-bold leading-none tracking-tight text-lg">
                  MinecraftDome<span className="text-blue-600 font-extrabold">.cyou</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mt-0.5">
                  3D Voxel Generator
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Dome Generator
              </Link>
              <Link href="/minecraft-sphere-generator" className="hover:text-blue-600 transition-colors">
                Sphere
              </Link>
              <Link href="/minecraft-circle-generator" className="hover:text-blue-600 transition-colors">
                Circle
              </Link>
              <Link href="/minecraft-cone-generator" className="hover:text-blue-600 transition-colors">
                Cone
              </Link>
              <Link href="/guides/how-to-build-a-dome-in-minecraft" className="hover:text-blue-600 transition-colors">
                Guides
              </Link>
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <Link
                href="/about"
                className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200 transition shadow-2xs"
              >
                About
              </Link>
              <a
                href="#generator"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition shadow-xs"
              >
                Launch 3D
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1">{children}</div>

        {/* Minimalist Premium Footer */}
        <footer className="bg-white border-t border-stone-200 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                    M
                  </div>
                  <span className="font-bold text-slate-900 text-sm">MinecraftDome.cyou</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The fastest 100% client-side 3D voxel shape builder and 2D layer slicer for Minecraft players and builders worldwide.
                </p>
              </div>

              {/* Tools */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Voxel Tools</div>
                <ul className="space-y-1.5 text-xs text-slate-500">
                  <li><Link href="/" className="hover:text-blue-600 transition">Minecraft Dome Generator</Link></li>
                  <li><Link href="/minecraft-sphere-generator" className="hover:text-blue-600 transition">Minecraft Sphere Generator</Link></li>
                  <li><Link href="/minecraft-circle-generator" className="hover:text-blue-600 transition">Minecraft Circle Generator</Link></li>
                  <li><Link href="/minecraft-cone-generator" className="hover:text-blue-600 transition">Minecraft Cone Generator</Link></li>
                  <li><Link href="/minecraft-torus-generator" className="hover:text-blue-600 transition">Torus &amp; Ring Builder</Link></li>
                  <li><Link href="/minecraft-geodesic-dome-generator" className="hover:text-blue-600 transition">Geodesic Shell Generator</Link></li>
                </ul>
              </div>

              {/* Guides */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Building Guides</div>
                <ul className="space-y-1.5 text-xs text-slate-500">
                  <li><Link href="/guides/how-to-build-a-dome-in-minecraft" className="hover:text-blue-600 transition">How to Build a Dome (Survival)</Link></li>
                  <li><Link href="/guides/half-slab-smooth-curves-guide" className="hover:text-blue-600 transition">Smooth Half-Slab Curves</Link></li>
                  <li><a href="#faq" className="hover:text-blue-600 transition">Frequently Asked Questions</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Legal &amp; Info</div>
                <ul className="space-y-1.5 text-xs text-slate-500">
                  <li><Link href="/about" className="hover:text-blue-600 transition">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-blue-600 transition">Contact &amp; Support</Link></li>
                  <li><Link href="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-blue-600 transition">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
              <div>
                © 2026 MinecraftDomeGenerator.cyou. Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
              </div>
              <div className="flex items-center gap-4">
                <span>Built for Java &amp; Bedrock Editions</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
