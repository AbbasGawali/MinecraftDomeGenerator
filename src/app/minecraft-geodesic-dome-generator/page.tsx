import type { Metadata } from 'next';
import MinecraftShapeGenerator from '@/components/MinecraftShapeGenerator';

export const metadata: Metadata = {
  title: 'Minecraft Geodesic Dome Generator – Triangular Strut Biosphere Slicer',
  description:
    'Free Minecraft Geodesic Dome Generator. Generate architectural geodesic shells, triangular strut biospheres, and greenhouse domes.',
  keywords: [
    'minecraft geodesic dome generator',
    'minecraft geodesic sphere',
    'minecraft greenhouse dome',
    'minecraft biosphere builder',
  ],
  alternates: {
    canonical: 'https://minecraftdomegenerator.cyou/minecraft-geodesic-dome-generator',
  },
};

export default function GeodesicDomeGeneratorPage() {
  return (
    <main className="min-h-screen">
      <MinecraftShapeGenerator
        initialShape="geodesic"
        initialGeodesic={true}
        initialDiameter={30}
        initialHeight={15}
        title="Minecraft Geodesic Dome Generator"
        subtitle="Construct geodesic domes with reinforced strut geometry for survival greenhouses, botanical gardens, and sci-fi biospheres."
      />
    </main>
  );
}
