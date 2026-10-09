import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://minecraftdomegenerator.cyou';
  const lastModified = new Date();

  const routes = [
    '',
    '/minecraft-sphere-generator',
    '/minecraft-circle-generator',
    '/minecraft-cone-generator',
    '/minecraft-torus-generator',
    '/minecraft-geodesic-dome-generator',
    '/guides/how-to-build-a-dome-in-minecraft',
    '/guides/half-slab-smooth-curves-guide',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/minecraft-') ? 0.9 : route.startsWith('/guides') ? 0.8 : 0.5,
  }));
}
