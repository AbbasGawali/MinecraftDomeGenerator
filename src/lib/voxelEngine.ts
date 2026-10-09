// 3D Voxel Generator Core Engine for Minecraft Shapes

export type ShapeType = 'dome' | 'cone' | 'sphere' | 'torus' | 'cylinder' | 'geodesic';

export interface ShapeConfig {
  shape: ShapeType;
  diameterX: number;
  diameterZ: number;
  height: number;
  thickness: number; // 0 = solid, 1 = 1 block hollow shell, 2 = 2 blocks, etc.
  smoothCurve: boolean; // Enable half slab detection
  geodesic: boolean;
  symmetryLines: boolean;
  lineCount: number;
  lineWidthDeg: number;
  layerSpacing: number;
  rotationDeg: number;
  palette: string;
}

export interface VoxelBlock {
  x: number; // Local grid coords
  y: number;
  z: number;
  color: string;
  isSlab?: 'bottom' | 'top' | 'none';
  isSymmetry?: boolean;
}

export interface VoxelModel {
  voxels: VoxelBlock[];
  layers: Map<number, VoxelBlock[]>;
  totalBlocks: number;
  height: number;
  diameterX: number;
  diameterZ: number;
  minY: number;
  maxY: number;
}

// Color palettes for clear layer-by-layer distinguishing
export const COLOR_PALETTES: Record<string, string[]> = {
  okabeIto: [
    '#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7', '#000000',
  ],
  minecraftWool: [
    '#e9ecec', '#f07613', '#bd44b3', '#3aa0d9', '#f8c527', '#70b91a', '#ed8dac', '#3e4447',
    '#8e8e86', '#158991', '#792aac', '#35399d', '#724728', '#546d1b', '#a12722', '#141519',
  ],
  cyberRainbow: [
    '#ff0055', '#ff5500', '#ffaa00', '#ffff00', '#00ff66', '#00ffff', '#0066ff', '#aa00ff',
  ],
  slateBlueprint: [
    '#38bdf8', '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#64748b', '#475569', '#334155',
  ],
};

export function generateVoxels(config: ShapeConfig): VoxelModel {
  const {
    shape,
    diameterX,
    diameterZ,
    height,
    thickness,
    symmetryLines,
    lineCount,
    lineWidthDeg,
    layerSpacing,
    rotationDeg,
    palette,
  } = config;

  const colors = COLOR_PALETTES[palette] || COLOR_PALETTES.okabeIto;
  const voxels: VoxelBlock[] = [];
  const layers = new Map<number, VoxelBlock[]>();

  const rx = diameterX / 2;
  const rz = diameterZ / 2;
  const ry = height;

  const minX = -Math.ceil(rx);
  const maxX = Math.ceil(rx);
  const minZ = -Math.ceil(rz);
  const maxZ = Math.ceil(rz);
  const minY = 0;
  const maxY = Math.max(1, Math.ceil(height));

  const rotRad = (rotationDeg * Math.PI) / 180;
  const halfWidthRad = ((lineWidthDeg / 2) * Math.PI) / 180;
  const angleStep = (2 * Math.PI) / Math.max(1, lineCount);

  for (let y = minY; y < maxY; y++) {
    const layerVoxels: VoxelBlock[] = [];

    // Layer-specific radius checks
    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        // Distance calculation based on shape type
        let isInside = false;
        let isInner = false;

        const cx = x + (diameterX % 2 === 0 ? 0.5 : 0);
        const cz = z + (diameterZ % 2 === 0 ? 0.5 : 0);
        const cy = y + 0.5;

        if (shape === 'dome') {
          // Hemisphere
          const distSqOuter = (cx / rx) ** 2 + (cz / rz) ** 2 + (cy / ry) ** 2;
          isInside = distSqOuter <= 1.0;

          if (thickness > 0) {
            const innerRx = Math.max(0.1, rx - thickness);
            const innerRz = Math.max(0.1, rz - thickness);
            const innerRy = Math.max(0.1, ry - thickness);
            const distSqInner = (cx / innerRx) ** 2 + (cz / innerRz) ** 2 + (cy / innerRy) ** 2;
            isInner = distSqInner < 1.0;
          }
        } else if (shape === 'cone') {
          // Tapered cone: radius shrinks as y goes up
          const progress = 1 - cy / ry;
          if (progress >= 0) {
            const currRx = rx * progress;
            const currRz = rz * progress;
            const distSqOuter = (cx / Math.max(0.1, currRx)) ** 2 + (cz / Math.max(0.1, currRz)) ** 2;
            isInside = distSqOuter <= 1.0;

            if (thickness > 0) {
              const innerRx = Math.max(0.1, currRx - thickness);
              const innerRz = Math.max(0.1, currRz - thickness);
              const distSqInner = (cx / innerRx) ** 2 + (cz / innerRz) ** 2;
              isInner = distSqInner < 1.0;
            }
          }
        } else if (shape === 'sphere') {
          // Full Sphere centered at y = height / 2
          const midY = height / 2;
          const distSqOuter = (cx / rx) ** 2 + ((cy - midY) / (height / 2)) ** 2 + (cz / rz) ** 2;
          isInside = distSqOuter <= 1.0;

          if (thickness > 0) {
            const innerRx = Math.max(0.1, rx - thickness);
            const innerRz = Math.max(0.1, rz - thickness);
            const innerRy = Math.max(0.1, height / 2 - thickness);
            const distSqInner = (cx / innerRx) ** 2 + ((cy - midY) / innerRy) ** 2 + (cz / innerRz) ** 2;
            isInner = distSqInner < 1.0;
          }
        } else if (shape === 'torus') {
          // Donut / Torus
          const R = (rx + rz) / 2 * 0.7;
          const rTube = Math.max(1, height / 2);
          const distCenter = Math.sqrt(cx ** 2 + cz ** 2);
          const distSq = (distCenter - R) ** 2 + (cy - rTube) ** 2;
          isInside = distSq <= rTube ** 2;

          if (thickness > 0) {
            const innerRTube = Math.max(0.1, rTube - thickness);
            isInner = distSq < innerRTube ** 2;
          }
        } else if (shape === 'cylinder') {
          // Open/Closed Cylinder
          const distSqOuter = (cx / rx) ** 2 + (cz / rz) ** 2;
          isInside = distSqOuter <= 1.0 && cy <= ry;

          if (thickness > 0) {
            const innerRx = Math.max(0.1, rx - thickness);
            const innerRz = Math.max(0.1, rz - thickness);
            const distSqInner = (cx / innerRx) ** 2 + (cz / innerRz) ** 2;
            isInner = distSqInner < 1.0 && (y > 0 && y < maxY - 1);
          }
        } else {
          // Default Ellipsoid Dome
          const distSqOuter = (cx / rx) ** 2 + (cz / rz) ** 2 + (cy / ry) ** 2;
          isInside = distSqOuter <= 1.0;
        }

        if (isInside && !isInner) {
          // Check Symmetry Lines
          let isSym = false;
          if (symmetryLines && (y % layerSpacing === 0)) {
            const angle = (Math.atan2(cz, cx) - rotRad + 4 * Math.PI) % (2 * Math.PI);
            for (let i = 0; i < lineCount; i++) {
              const targetAngle = (i * angleStep) % (2 * Math.PI);
              let diff = Math.abs(angle - targetAngle);
              if (diff > Math.PI) diff = 2 * Math.PI - diff;
              if (diff <= halfWidthRad) {
                isSym = true;
                break;
              }
            }
          }

          // Pick block color based on layer pattern and symmetry
          const colorIndex = isSym ? 7 : (y + Math.abs(x % 2) + Math.abs(z % 2)) % colors.length;
          const blockColor = isSym ? '#ef4444' : colors[colorIndex];

          const block: VoxelBlock = {
            x,
            y,
            z,
            color: blockColor,
            isSymmetry: isSym,
          };

          layerVoxels.push(block);
          voxels.push(block);
        }
      }
    }

    if (layerVoxels.length > 0) {
      layers.set(y, layerVoxels);
    }
  }

  return {
    voxels,
    layers,
    totalBlocks: voxels.length,
    height: maxY,
    diameterX,
    diameterZ,
    minY,
    maxY,
  };
}
