'use client';

import React, { useRef, useEffect, useState } from 'react';
import { VoxelModel, VoxelBlock } from '@/lib/voxelEngine';
import { useTheme } from '@/context/ThemeContext';

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
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [internalViewAngle, setInternalViewAngle] = useState<ViewAngle>('top');

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

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // 1. Background based on active theme
    ctx.fillStyle = theme === 'dark' ? '#14181d' : '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const maxDim = Math.max(model.diameterX, model.diameterZ, model.height) + 4;
    const cellSize = Math.max(5, Math.min(26, Math.floor((Math.min(width, height) - 40) / maxDim)));
    const centerX = width / 2;
    const centerY = height / 2;

    // 2. Grid Lines
    ctx.strokeStyle = theme === 'dark' ? '#1f262f' : '#eef2f6';
    ctx.lineWidth = 1;

    const gridExtent = Math.ceil(maxDim / 2) + 4;
    for (let i = -gridExtent; i <= gridExtent; i++) {
      ctx.beginPath();
      ctx.moveTo(centerX + i * cellSize, 0);
      ctx.lineTo(centerX + i * cellSize, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, centerY + i * cellSize);
      ctx.lineTo(width, centerY + i * cellSize);
      ctx.stroke();
    }

    // 3. Center Crosshairs
    ctx.strokeStyle = theme === 'dark' ? '#3b4450' : '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // 4. Draw Voxels
    let currentVoxels: VoxelBlock[] = [];
    let prevVoxels: VoxelBlock[] = [];

    if (viewAngle === 'top') {
      currentVoxels = model.layers.get(currentLayer) || [];
      if (showOnionSkin && currentLayer > 0) {
        prevVoxels = model.layers.get(currentLayer - 1) || [];
      }
    } else {
      currentVoxels = model.voxels;
    }

    const drawBlock = (x: number, y: number, color: string, isGhost: boolean, isHalfSlab?: boolean) => {
      const px = centerX + x * cellSize - cellSize / 2;
      const py = centerY + y * cellSize - cellSize / 2;

      if (isGhost) {
        ctx.fillStyle = theme === 'dark' ? 'rgba(75, 85, 99, 0.4)' : 'rgba(148, 163, 184, 0.28)';
        ctx.fillRect(px + 1, py + 1, cellSize - 2, cellSize - 2);
        ctx.strokeStyle = theme === 'dark' ? 'rgba(107, 114, 128, 0.6)' : 'rgba(100, 116, 139, 0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);

        ctx.strokeStyle = theme === 'dark' ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 0.18)';
        ctx.lineWidth = 1;
        ctx.strokeRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);

        if (isHalfSlab) {
          ctx.strokeStyle = '#34d399';
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

    if (viewAngle === 'top' && showOnionSkin) {
      prevVoxels.forEach((v) => {
        drawBlock(v.x, -v.z, v.color, true);
      });
    }

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
  }, [model, currentLayer, viewAngle, showOnionSkin, colorCurrentLayerOnly, theme]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-[var(--panel-bg)] rounded-xl border border-[var(--border-color)] overflow-hidden flex flex-col shadow-inner transition-colors">
      {/* 2D View Top Control Bar */}
      <div className="p-3 bg-[var(--card-bg)] border-b border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-bold text-[var(--text-color)] flex items-center gap-1.5">
          <span className="text-emerald-500">❖</span> 2D Slicer
        </div>

        {/* View Angle Toggles */}
        <div className="flex items-center gap-1 bg-[var(--panel-bg)] p-1 rounded-sm border border-[var(--border-color)]">
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
              className={`px-2.5 py-1 rounded-xs text-xs font-bold transition-all ${
                viewAngle === item.id
                  ? 'bg-emerald-600 text-white border-t border-emerald-400 shadow-xs'
                  : 'text-zinc-400 hover:text-[var(--text-color)] hover:bg-[var(--card-bg)]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend Badge */}
      <div className="px-4 py-1.5 bg-[var(--panel-bg)] border-b border-[var(--border-color)] flex items-center gap-4 text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block"></span>
          <span>Layer Block</span>
        </span>
        {showOnionSkin && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-zinc-400 inline-block"></span>
            <span>Ghost (Lower Layer)</span>
          </span>
        )}
      </div>

      {/* Canvas */}
      <div className="relative flex-1 w-full h-full min-h-[360px] flex items-center justify-center p-2 bg-[var(--panel-bg)]">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
}
