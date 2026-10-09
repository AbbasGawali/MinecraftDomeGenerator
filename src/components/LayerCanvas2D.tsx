'use client';

import React, { useRef, useEffect, useState } from 'react';
import { VoxelModel, VoxelBlock } from '@/lib/voxelEngine';
import { useTheme } from '@/context/ThemeContext';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

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

  // Interactive Pan and Zoom State
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1.0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const viewAngle = activeViewAngle || internalViewAngle;
  const setView = (angle: ViewAngle) => {
    if (onViewAngleChange) onViewAngleChange(angle);
    else setInternalViewAngle(angle);
  };

  // Reset Pan/Zoom on view angle or dimension change
  const handleResetPanZoom = () => {
    setPan({ x: 0, y: 0 });
    setZoom(1.0);
  };

  useEffect(() => {
    handleResetPanZoom();
  }, [viewAngle, model.diameterX, model.diameterZ, model.height]);

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
    const isDark = theme === 'dark';
    ctx.fillStyle = isDark ? '#14181d' : '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const maxDim = Math.max(model.diameterX, model.diameterZ, model.height) + 4;
    const baseCellSize = Math.max(5, Math.min(26, Math.floor((Math.min(width, height) - 40) / maxDim)));
    const cellSize = baseCellSize * zoom;

    // Center point with user pan offset
    const centerX = width / 2 + pan.x;
    const centerY = height / 2 + pan.y;

    // 2. Grid Lines
    ctx.strokeStyle = isDark ? '#1f262f' : '#eef2f6';
    ctx.lineWidth = 1;

    const gridExtent = Math.ceil((maxDim * 2) / zoom) + 10;
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
    ctx.strokeStyle = isDark ? '#3b4450' : '#cbd5e1';
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

      // Skip off-screen rendering
      if (px + cellSize < 0 || px > width || py + cellSize < 0 || py > height) return;

      if (isGhost) {
        ctx.fillStyle = isDark ? 'rgba(75, 85, 99, 0.4)' : 'rgba(148, 163, 184, 0.32)';
        ctx.fillRect(px + 1, py + 1, cellSize - 2, cellSize - 2);
        ctx.strokeStyle = isDark ? 'rgba(107, 114, 128, 0.6)' : 'rgba(100, 116, 139, 0.45)';
        ctx.lineWidth = 1;
        ctx.strokeRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);

        ctx.strokeStyle = isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)';
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
  }, [model, currentLayer, viewAngle, showOnionSkin, colorCurrentLayerOnly, theme, pan, zoom]);

  // Pan & Zoom Event Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.87;
    setZoom((prev) => Math.max(0.4, Math.min(5.0, prev * factor)));
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`relative w-full h-full min-h-[460px] rounded-xl border overflow-hidden flex flex-col transition-colors ${
        isDark ? 'bg-[#14181d] border-[#2d3540]' : 'bg-white border-stone-200 shadow-xs'
      }`}
    >
      {/* 2D View Top Control Bar */}
      <div
        className={`p-3 border-b flex flex-wrap items-center justify-between gap-2 transition-colors ${
          isDark ? 'bg-[#181d24] border-[#2d3540]' : 'bg-stone-50 border-stone-200'
        }`}
      >
        <div className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-zinc-300' : 'text-slate-800'}`}>
          <span className="text-emerald-500">❖</span> 2D Slicer
        </div>

        {/* View Angle Toggles */}
        <div className={`flex items-center gap-1 p-1 rounded-sm border ${isDark ? 'bg-[#111418] border-[#2d3540]' : 'bg-stone-200/80 border-stone-300'}`}>
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
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-[#21272e]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend Badge & Zoom Controls */}
      <div
        className={`px-4 py-1.5 border-b flex items-center justify-between gap-4 text-[11px] ${
          isDark ? 'bg-[#161a20] border-[#21272e] text-zinc-400' : 'bg-stone-50 border-stone-100 text-slate-500'
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block"></span>
            <span>Layer Block</span>
          </span>
          {showOnionSkin && (
            <span className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-xs inline-block ${isDark ? 'bg-zinc-600' : 'bg-slate-300'}`}></span>
              <span>Ghost (Lower Layer)</span>
            </span>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom((z) => Math.min(5.0, z * 1.2))}
            className={`p-1 rounded-xs border transition ${
              isDark ? 'bg-[#111418] border-[#2d3540] text-zinc-300 hover:text-white' : 'bg-white border-stone-300 text-slate-700 hover:bg-stone-100'
            }`}
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.4, z / 1.2))}
            className={`p-1 rounded-xs border transition ${
              isDark ? 'bg-[#111418] border-[#2d3540] text-zinc-300 hover:text-white' : 'bg-white border-stone-300 text-slate-700 hover:bg-stone-100'
            }`}
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetPanZoom}
            className={`p-1 rounded-xs border transition ${
              isDark ? 'bg-[#111418] border-[#2d3540] text-zinc-300 hover:text-white' : 'bg-white border-stone-300 text-slate-700 hover:bg-stone-100'
            }`}
            title="Reset Pan & Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Canvas Viewport (Draggable + Zoomable) */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative flex-1 w-full h-full min-h-[360px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none overflow-hidden"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Movable Helper Badge */}
        <div
          className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-xs border text-[10px] font-medium pointer-events-none ${
            isDark ? 'bg-[#1c2229]/90 border-[#3b4450] text-zinc-300' : 'bg-white/90 border-stone-300 text-slate-600'
          }`}
        >
          Drag to pan 2D view • Scroll to zoom ({(zoom * 100).toFixed(0)}%)
        </div>
      </div>
    </div>
  );
}
