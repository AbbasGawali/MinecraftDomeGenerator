import type { Metadata } from 'next';
import MinecraftShapeGenerator from '@/components/MinecraftShapeGenerator';

export const metadata: Metadata = {
  title: 'Minecraft Torus Generator – 3D Donut Ring & Portal Tube Slicer',
  description:
    'Free Minecraft Torus & Donut Generator. Design circular tube tunnels, space station rings, and sci-fi portals in Minecraft.',
  keywords: [
    'minecraft torus generator',
    'minecraft donut generator',
    'minecraft ring generator',
    'minecraft tube generator',
  ],
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/minecraft-torus-generator',
  },
};

export default function TorusGeneratorPage() {
  return (
    <main className="min-h-screen">
      <MinecraftShapeGenerator
        initialShape="torus"
        initialDiameter={30}
        initialHeight={10}
        title="Minecraft Torus & Donut Ring Generator"
        subtitle="Generate 3D hollow rings and torus arches for orbital stargates and futuristic megastructures with layer-by-layer blueprints."
      />
    </main>
  );
}
