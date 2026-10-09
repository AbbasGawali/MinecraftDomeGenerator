import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
    <html lang="en" className="dark-theme scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          {/* Dynamic Theme-Aware Navbar */}
          <Navbar />

          {/* Main Content */}
          <div className="flex-1">{children}</div>

          {/* Dynamic Theme-Aware Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
