'use client';

import React, { useRef, useEffect, useState } from 'react';
import { VoxelModel, VoxelBlock } from '@/lib/voxelEngine';

interface Props {
  model: VoxelModel;
  currentLayer: number;
  showOnionSkin: boolean;
  colorCurrentLayerOnly: boolean;
}

export type ViewAngle = 'top' | 'front' | 'right' | 'left' | 'back';

export default function LayerCanvas2D({
  model,
  currentLayer,
  showOnionSkin,
  colorCurrentLayerOnly,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewAngle, setViewAngle] = useState<ViewAngle>('top');
  const [hoveredBlock, setHoveredBlock] = useState<{ x: number; y: number; z: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high-dpi displays
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Compute grid scale based on dimensions
    const maxDimension = Math.max(model.diameterX, model.diameterZ, model.height) + 4;
    const cellSize = Math.max(6, Math.min(28, Math.floor((Math.min(width, height) - 40) / maxDimension)));
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw Subtle Grid lines
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;

    const gridExtent = Math.ceil(maxDimension / 2) + 2;
    for (let i = -gridExtent; i <= gridExtent; i++) {
      // Vertical
      ctx.beginPath();
      ctx.moveTo(centerX + i * cellSize, 0);
      ctx.lineTo(centerX + i * cellSize, height);
      ctx.stroke();

      // Horizontal
      ctx.beginPath();
      ctx.moveTo(0, centerY + i * cellSize);
      ctx.lineTo(width, centerY + i * cellSize);
      ctx.stroke();
    }

    // Axes Center Highlight
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Data to draw depending on view angle
    const currentLayerVoxels = model.layers.get(currentLayer) || [];
    const prevLayerVoxels = showOnionSkin && currentLayer > 0 ? model.layers.get(currentLayer - 1) || [] : [];

    // Helper to draw a single voxel on 2D grid
    const drawVoxel2D = (v: VoxelBlock, isCurrent: boolean, isPrev: boolean) => {
      let gx = 0;
      let gy = 0;

      if (viewAngle === 'top') {
        gx = v.x;
        gy = -v.z; // -Z corresponds to top of screen
      } else if (viewAngle === 'front') {
        gx = v.x;
        gy = -v.y;
      } else if (viewAngle === 'back') {
        gx = -v.x;
        gy = -v.y;
      } else if (viewAngle === 'right') {
        gx = v.z;
        gy = -v.y;
      } else if (viewAngle === 'left') {
        gx = -v.z;
        gy = -v.y;
      }

      const px = centerX + gx * cellSize - cellSize / 2;
      const py = centerY + gy * cellSize - cellSize / 2;

      if (isPrev) {
        // Onion skin ghosting
        ctx.fillStyle = 'rgba(203, 213, 225, 0.4)';
        ctx.fillRect(px, py, cellSize, cellSize);
        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);
      } else if (isCurrent) {
        ctx.fillStyle = colorCurrentLayerOnly ? '#f97316' : v.color;
        ctx.fillRect(px, py, cellSize, cellSize);

        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);

        // Symmetry marker or pattern highlight
        if (v.isSymmetry) {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(px + cellSize / 2, py + cellSize / 2, Math.max(1.5, cellSize * 0.18), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // Draw Previous Layer (Onion skin)
    if (viewAngle === 'top') {
      prevLayerVoxels.forEach((v) => drawVoxel2D(v, false, true));
    }

    // Draw Current Layer
    if (viewAngle === 'top') {
      currentLayerVoxels.forEach((v) => drawVoxel2D(v, true, false));
    } else {
      // Side cross-section views: render all up to current layer or active
      model.voxels.forEach((v) => {
        const isCur = v.y === currentLayer;
        const isLower = v.y < currentLayer;
        if (isCur || isLower) {
          drawVoxel2D(v, isCur, !isCur);
        }
      });
    }
  }, [model, currentLayer, viewAngle, showOnionSkin, colorCurrentLayerOnly]);

  const activeCount = model.layers.get(currentLayer)?.length || 0;

  return (
    <div className="relative w-full h-full min-h-[380px] bg-white border border-stone-300 flex flex-col">
      {/* 2D View Settings Toolbar */}
      <div className="bg-stone-50 border-b border-stone-200 p-2 flex items-center justify-between gap-2 overflow-x-auto">
        <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider pl-1 shrink-0">
          2D View Settings:
        </span>
        <div className="flex gap-1">
          {(['top', 'front', 'right', 'left', 'back'] as ViewAngle[]).map((angle) => (
            <button
              key={angle}
              onClick={() => setViewAngle(angle)}
              className={`px-3 py-1 text-xs font-bold transition-all cursor-pointer capitalize ${
                viewAngle === angle
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {angle === 'top' ? 'Top' : angle === 'front' ? 'Front (+Z)' : angle === 'right' ? 'Right (+X)' : angle === 'left' ? 'Left (-X)' : 'Back (-Z)'}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="relative flex-1 min-h-[340px]">
        <canvas ref={canvasRef} className="w-full h-full min-h-[340px] block" />
        
        {/* Layer Info Badge */}
        <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 border border-stone-700 pointer-events-none">
          Layer {currentLayer + 1} / {model.height} • {activeCount} Blocks in this layer
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-white/95 px-3 py-1 border border-stone-200 text-[10px] font-bold text-stone-600 pointer-events-none">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-orange-500 inline-block"></span> Active layer block
          </span>
          {showOnionSkin && (
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-stone-300 border border-stone-400 inline-block"></span> Previous layer (Onion-skin)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
