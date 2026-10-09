import type { Metadata } from 'next';
import MinecraftShapeGenerator from '@/components/MinecraftShapeGenerator';

export const metadata: Metadata = {
  title: 'Minecraft Cone Generator 3D – Tapered Roofs & Tower Spires Builder',
  description:
    'Free Minecraft Cone Generator. Build 3D voxel cones, wizard tower spires, and pyramid roofs with layer-by-layer blueprints.',
  keywords: [
    'minecraft cone generator',
    'minecraft cone builder',
    'minecraft tower spire generator',
    'minecraft cone roof blueprint',
    'minecraft cone shape maker',
  ],
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/minecraft-cone-generator',
  },
};

export default function ConeGeneratorPage() {
  return (
    <main className="min-h-screen">
      <MinecraftShapeGenerator
        initialShape="cone"
        initialDiameter={30}
        initialHeight={30}
        title="Minecraft Cone & Tower Spire Generator"
        subtitle="Generate tapered cone spires, wizard towers, and pyramid roofs with customizable base diameter and vertical height scaling."
      />
    </main>
  );
}
