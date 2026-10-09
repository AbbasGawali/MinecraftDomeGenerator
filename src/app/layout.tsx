import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefin',
  weight: ['300', '400', '500', '600', '700'],
});

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
    <html lang="en" className={`${josefin.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[#fdfbf7] text-slate-800 selection:bg-blue-100 selection:text-blue-900">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-none bg-stone-900 flex items-center justify-center p-1 border border-stone-800 group-hover:border-blue-500 transition-colors">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect x="6" y="6" width="88" height="88" rx="0" fill="#0f172a" stroke="#2563eb" strokeWidth="6"/>
                  <rect x="20" y="70" width="60" height="10" fill="#0284c7"/>
                  <rect x="28" y="58" width="44" height="12" fill="#0369a1"/>
                  <rect x="36" y="44" width="28" height="14" fill="#0ea5e9"/>
                  <rect x="44" y="32" width="12" height="12" fill="#f59e0b"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 font-bold leading-none tracking-tight text-lg">
                  MinecraftDome<span className="text-blue-600 font-extrabold">.cyou</span>
                </span>
                <span className="text-[9px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                  3D Voxel Shape Generator
                </span>
              </div>
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-bold text-slate-700">
              <Link href="/minecraft-sphere-generator" className="hover:text-blue-600 transition-colors">
                Sphere Generator
              </Link>
              <Link href="/minecraft-circle-generator" className="hover:text-blue-600 transition-colors">
                Circle Generator
              </Link>
              <Link href="/minecraft-cone-generator" className="hover:text-blue-600 transition-colors">
                Cone Generator
              </Link>
              <Link href="/minecraft-torus-generator" className="hover:text-blue-600 transition-colors">
                Torus / Donut
              </Link>
              <Link href="/guides/how-to-build-a-dome-in-minecraft" className="hover:text-blue-600 transition-colors">
                Build Guide
              </Link>
            </nav>

            {/* Action CTA */}
            <div className="flex items-center gap-3">
              <Link
                href="/#generator"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold tracking-wide transition-colors cursor-pointer"
              >
                Launch 3D Builder
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>

        {/* Global Dark Footer */}
        <footer className="bg-[#0f172a] text-slate-400 border-t border-slate-800 pt-16 pb-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
              
              {/* Brand Col */}
              <div className="space-y-4">
                <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
                  <div className="w-7 h-7 bg-stone-900 flex items-center justify-center p-1 border border-stone-700">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <rect x="6" y="6" width="88" height="88" rx="0" fill="#0f172a" stroke="#2563eb" strokeWidth="6"/>
                      <rect x="20" y="70" width="60" height="10" fill="#0284c7"/>
                      <rect x="28" y="58" width="44" height="12" fill="#0369a1"/>
                      <rect x="36" y="44" width="28" height="14" fill="#0ea5e9"/>
                      <rect x="44" y="32" width="12" height="12" fill="#f59e0b"/>
                    </svg>
                  </div>
                  <span>
                    MinecraftDome<span className="text-blue-500">.cyou</span>
                  </span>
                </Link>
                <p className="text-xs leading-relaxed text-slate-400">
                  Free client-side 3D and 2D voxel shape generator for Minecraft builders. Calculate material stacks, hollow shells, and layer-by-layer blueprints with zero lag.
                </p>
              </div>

              {/* Col 1: Generators */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                  Shape Generators
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link href="/" className="hover:text-blue-400">Minecraft Dome Generator</Link></li>
                  <li><Link href="/minecraft-sphere-generator" className="hover:text-blue-400">Minecraft Sphere Generator</Link></li>
                  <li><Link href="/minecraft-circle-generator" className="hover:text-blue-400">Minecraft Circle Generator</Link></li>
                  <li><Link href="/minecraft-cone-generator" className="hover:text-blue-400">Minecraft Cone Generator</Link></li>
                  <li><Link href="/minecraft-torus-generator" className="hover:text-blue-400">Minecraft Torus &amp; Donut Generator</Link></li>
                  <li><Link href="/minecraft-geodesic-dome-generator" className="hover:text-blue-400">Geodesic Shell Generator</Link></li>
                </ul>
              </div>

              {/* Col 2: Guides & Resources */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                  Building Guides
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link href="/guides/how-to-build-a-dome-in-minecraft" className="hover:text-blue-400">How to Build a Dome in Minecraft</Link></li>
                  <li><Link href="/guides/half-slab-smooth-curves-guide" className="hover:text-blue-400">Half-Slab Smooth Curves Guide</Link></li>
                  <li><Link href="/#faq" className="hover:text-blue-400">Frequently Asked Questions</Link></li>
                </ul>
              </div>

              {/* Col 3: Company & Legal */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                  Legal &amp; Info
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
                  <li><Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-blue-400">Terms of Service</Link></li>
                  <li><Link href="/sitemap.xml" className="hover:text-blue-400">Sitemap</Link></li>
                </ul>
              </div>

            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
              <p>
                © 2026 <strong className="text-slate-300">MinecraftDomeGenerator.cyou</strong>. Minecraft is a trademark of Mojang Synergies AB. This site is not affiliated with Mojang or Microsoft.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="hover:text-slate-400">Privacy</Link>
                <Link href="/terms" className="hover:text-slate-400">Terms</Link>
                <Link href="/sitemap.xml" className="hover:text-slate-400">Sitemap</Link>
              </div>
            </div>

          </div>
        </footer>
      </body>
    </html>
  );
}
