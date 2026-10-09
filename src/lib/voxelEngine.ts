// 3D Voxel Generator Core Engine for Minecraft Shapes (High Performance)

export type ShapeType = 'dome' | 'cone' | 'sphere' | 'torus' | 'cylinder' | 'geodesic';

export interface ShapeConfig {
  shape: ShapeType;
  diameterX: number;
  diameterZ: number;
  height: number;
  thickness: number; // 0 = solid, 1 = 1 block hollow shell, 2 = 2 blocks, etc.
  smoothCurve: boolean;
  geodesic: boolean;
  symmetryLines: boolean;
  lineCount: number;
  lineWidthDeg: number;
  layerSpacing: number;
  rotationDeg: number;
  palette: string;
}

export interface VoxelBlock {
  x: number;
  y: number;
  z: number;
  color: string;
  isSlab?: 'bottom' | 'top' | 'none';
  isHalfSlab?: boolean;
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

// Color palettes
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
    smoothCurve,
    geodesic,
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
  const ry = Math.max(1, height);

  const minY = 0;
  const maxY = Math.max(1, Math.ceil(height));

  const rotRad = (rotationDeg * Math.PI) / 180;
  const halfWidthRad = ((lineWidthDeg / 2) * Math.PI) / 180;
  const angleStep = (2 * Math.PI) / Math.max(1, lineCount);

  const offX = diameterX % 2 === 0 ? 0.5 : 0;
  const offZ = diameterZ % 2 === 0 ? 0.5 : 0;

  for (let y = minY; y < maxY; y++) {
    const layerVoxels: VoxelBlock[] = [];
    const cy = y + 0.5;

    // Calculate dynamic horizontal bounding box for this layer to skip outer empty space
    let layerRx = rx;
    let layerRz = rz;

    if (shape === 'dome') {
      const hRatio = Math.min(1, cy / ry);
      const radScale = Math.sqrt(Math.max(0, 1 - hRatio * hRatio));
      layerRx = rx * radScale;
      layerRz = rz * radScale;
    } else if (shape === 'cone') {
      const progress = Math.max(0, 1 - cy / ry);
      layerRx = rx * progress;
      layerRz = rz * progress;
    } else if (shape === 'sphere') {
      const midY = ry / 2;
      const hRatio = Math.min(1, Math.abs(cy - midY) / midY);
      const radScale = Math.sqrt(Math.max(0, 1 - hRatio * hRatio));
      layerRx = rx * radScale;
      layerRz = rz * radScale;
    }

    const minX = -Math.ceil(layerRx) - 1;
    const maxX = Math.ceil(layerRx) + 1;
    const minZ = -Math.ceil(layerRz) - 1;
    const maxZ = Math.ceil(layerRz) + 1;

    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        let isInside = false;
        let isInner = false;

        const cx = x + offX;
        const cz = z + offZ;

        if (shape === 'dome') {
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
          const progress = 1 - cy / ry;
          if (progress >= 0) {
            const currRx = Math.max(0.1, rx * progress);
            const currRz = Math.max(0.1, rz * progress);
            const distSqOuter = (cx / currRx) ** 2 + (cz / currRz) ** 2;
            isInside = distSqOuter <= 1.0;

            if (thickness > 0) {
              const innerRx = Math.max(0.1, currRx - thickness);
              const innerRz = Math.max(0.1, currRz - thickness);
              const distSqInner = (cx / innerRx) ** 2 + (cz / innerRz) ** 2;
              isInner = distSqInner < 1.0;
            }
          }
        } else if (shape === 'sphere') {
          const midY = ry / 2;
          const distSqOuter = (cx / rx) ** 2 + ((cy - midY) / midY) ** 2 + (cz / rz) ** 2;
          isInside = distSqOuter <= 1.0;

          if (thickness > 0) {
            const innerRx = Math.max(0.1, rx - thickness);
            const innerRz = Math.max(0.1, rz - thickness);
            const innerRy = Math.max(0.1, midY - thickness);
            const distSqInner = (cx / innerRx) ** 2 + ((cy - midY) / innerRy) ** 2 + (cz / innerRz) ** 2;
            isInner = distSqInner < 1.0;
          }
        } else if (shape === 'torus') {
          const R = (rx + rz) / 2 * 0.7;
          const rTube = Math.max(1, height / 2);
          const distCenter = Math.sqrt(cx ** 2 + cz ** 2);
          const distSq = (distCenter - R) ** 2 + (cy - rTube) ** 2;
          isInside = distSq <= rTube ** 2;

          if (thickness > 0) {
            const innerRTube = Math.max(0.1, rTube - thickness);
            isInner = distSq < innerRTube ** 2;
          }
        } else {
          const distSqOuter = (cx / rx) ** 2 + (cz / rz) ** 2;
          isInside = distSqOuter <= 1.0 && cy <= ry;

          if (thickness > 0) {
            const innerRx = Math.max(0.1, rx - thickness);
            const innerRz = Math.max(0.1, rz - thickness);
            const distSqInner = (cx / innerRx) ** 2 + (cz / innerRz) ** 2;
            isInner = distSqInner < 1.0 && (y > 0 && y < maxY - 1);
          }
        }

        if (isInside && !isInner) {
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

          const colorIndex = isSym ? 7 : (y + Math.abs(x % 2) + Math.abs(z % 2)) % colors.length;
          const blockColor = isSym ? '#000000' : colors[colorIndex];

          const block: VoxelBlock = {
            x,
            y,
            z,
            color: blockColor,
            isHalfSlab: smoothCurve && (y % 2 === 1),
            isSymmetry: isSym,
          };

          layerVoxels.push(block);
          voxels.push(block);
        }
      }
    }

    layers.set(y, layerVoxels);
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
