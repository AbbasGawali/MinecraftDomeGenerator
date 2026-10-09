'use client';

import React, { useRef, useEffect, useState } from 'react';
import { VoxelModel, VoxelBlock } from '@/lib/voxelEngine';

interface Props {
  model: VoxelModel;
  currentLayer: number;
  showOnionSkin: boolean;
  colorCurrentLayerOnly: boolean;
  activeViewAngle?: ViewAngle;
  onViewAngleChange?: (angle: ViewAngle) => void;
}

export type ViewAngle = 'top' | 'right' | 'left' | 'front' | 'back';

export default function LayerCanvas2D({
  model,
  currentLayer,
  showOnionSkin,
  colorCurrentLayerOnly,
  activeViewAngle,
  onViewAngleChange,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [internalViewAngle, setInternalViewAngle] = useState<ViewAngle>('top');
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

  const viewAngle = activeViewAngle || internalViewAngle;
  const setView = (angle: ViewAngle) => {
    if (onViewAngleChange) onViewAngleChange(angle);
    else setInternalViewAngle(angle);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High-DPI handling
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // 1. Clean Graph Paper Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const maxDim = Math.max(model.diameterX, model.diameterZ, model.height) + 4;
    const cellSize = Math.max(5, Math.min(26, Math.floor((Math.min(width, height) - 40) / maxDim)));
    const centerX = width / 2;
    const centerY = height / 2;

    // 2. Crisp Graph Paper Grid Lines
    ctx.strokeStyle = '#eef2f6';
    ctx.lineWidth = 1;

    const gridExtent = Math.ceil(maxDim / 2) + 4;
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

    // 3. Center Crosshairs (Engineering Blueprints)
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // 4. Extract voxels based on view plane
    let currentVoxels: VoxelBlock[] = [];
    let prevVoxels: VoxelBlock[] = [];

    if (viewAngle === 'top') {
      currentVoxels = model.layers.get(currentLayer) || [];
      if (showOnionSkin && currentLayer > 0) {
        prevVoxels = model.layers.get(currentLayer - 1) || [];
      }
    } else {
      // Side profile projections
      currentVoxels = model.voxels;
    }

    const drawBlock = (x: number, y: number, color: string, isGhost: boolean, isHalfSlab?: boolean) => {
      const px = centerX + x * cellSize - cellSize / 2;
      const py = centerY + y * cellSize - cellSize / 2;

      if (isGhost) {
        ctx.fillStyle = 'rgba(148, 163, 184, 0.28)';
        ctx.fillRect(px + 1, py + 1, cellSize - 2, cellSize - 2);
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);

        // Crisp block border
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.18)';
        ctx.lineWidth = 1;
        ctx.strokeRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);

        // If half slab, draw cross/diagonal
        if (isHalfSlab) {
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(px + 2, py + 2);
          ctx.lineTo(px + cellSize - 2, py + cellSize - 2);
          ctx.moveTo(px + cellSize - 2, py + 2);
          ctx.lineTo(px + 2, py + cellSize - 2);
          ctx.stroke();
        }
      }
    };

    // Draw Previous Layer Ghost First
    if (viewAngle === 'top' && showOnionSkin) {
      prevVoxels.forEach((v) => {
        drawBlock(v.x, -v.z, v.color, true);
      });
    }

    // Draw Current Layer Voxels
    currentVoxels.forEach((v) => {
      if (viewAngle === 'top') {
        drawBlock(v.x, -v.z, v.color, false, v.isHalfSlab);
      } else if (viewAngle === 'front') {
        drawBlock(v.x, -v.y, v.color, false);
      } else if (viewAngle === 'back') {
        drawBlock(-v.x, -v.y, v.color, false);
      } else if (viewAngle === 'right') {
        drawBlock(v.z, -v.y, v.color, false);
      } else if (viewAngle === 'left') {
        drawBlock(-v.z, -v.y, v.color, false);
      }
    });
  }, [model, currentLayer, viewAngle, showOnionSkin, colorCurrentLayerOnly]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden flex flex-col">
      {/* 2D View Top Control Bar */}
      <div className="p-3.5 bg-stone-50/80 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <span>2D View Settings</span>
        </div>

        {/* View Angle Pill Toggles */}
        <div className="flex items-center gap-1 bg-stone-200/70 p-1 rounded-xl">
          {[
            { id: 'top', label: 'Top' },
            { id: 'right', label: 'Right (+X)' },
            { id: 'left', label: 'Left (-X)' },
            { id: 'front', label: 'Front (+Z)' },
            { id: 'back', label: 'Back (-Z)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewAngle)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewAngle === item.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend Badge */}
      <div className="px-4 py-1.5 bg-white border-b border-stone-100 flex items-center gap-4 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block"></span>
          <span>Active layer block</span>
        </span>
        {showOnionSkin && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-300 inline-block"></span>
            <span>Ghost (previous layer)</span>
          </span>
        )}
      </div>

      {/* Canvas */}
      <div className="relative flex-1 w-full h-full min-h-[360px] flex items-center justify-center p-2 bg-white">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
}
