'use client';

import React, { useState, useMemo, useEffect } from 'react';
import VoxelCanvas3D from './VoxelCanvas3D';
import LayerCanvas2D from './LayerCanvas2D';
import { generateVoxels, ShapeConfig, ShapeType } from '@/lib/voxelEngine';
import { Layers, Settings, Share2, Printer, RotateCcw, Check, X, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function MinecraftShapeGenerator() {
  // Shape configuration
  const [shape, setShape] = useState<ShapeType>('dome');
  const [diameter, setDiameter] = useState<number>(30);
  const [height, setHeight] = useState<number>(15);
  const [smoothCurve, setSmoothCurve] = useState<boolean>(false);
  const [geodesic, setGeodesic] = useState<boolean>(false);
  const [allowLargeSizes, setAllowLargeSizes] = useState<boolean>(false);

  // Symmetry settings
  const [showSymmetry, setShowSymmetry] = useState<boolean>(false);
  const [lineCount, setLineCount] = useState<number>(4);
  const [lineWidthDeg, setLineWidthDeg] = useState<number>(8);
  const [layerSpacing, setLayerSpacing] = useState<number>(1);
  const [rotationDeg, setRotationDeg] = useState<number>(0);

  // Tabs & Views
  const [activeTab, setActiveTab] = useState<'shape' | 'layers'>('shape');
  const [viewMode, setViewMode] = useState<'both' | '3d' | '2d'>('both');
  const [currentLayer, setCurrentLayer] = useState<number>(14);
  const [palette, setPalette] = useState<string>('okabeIto');
  const [showOnionSkin, setShowOnionSkin] = useState<boolean>(true);
  const [builtLayers, setBuiltLayers] = useState<Set<number>>(new Set());

  // Export Modal
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Voxel Model Computation
  const config: ShapeConfig = useMemo(
    () => ({
      shape,
      diameterX: diameter,
      diameterZ: diameter,
      height,
      thickness: 1, // standard hollow shell
      smoothCurve,
      geodesic,
      symmetryLines: showSymmetry,
      lineCount,
      lineWidthDeg,
      layerSpacing,
      rotationDeg,
      palette,
    }),
    [
      shape,
      diameter,
      height,
      smoothCurve,
      geodesic,
      showSymmetry,
      lineCount,
      lineWidthDeg,
      layerSpacing,
      rotationDeg,
      palette,
    ]
  );

  const model = useMemo(() => generateVoxels(config), [config]);

  // Adjust current layer if height changes
  useEffect(() => {
    if (currentLayer >= model.height) {
      setCurrentLayer(Math.max(0, model.height - 1));
    }
  }, [model.height, currentLayer]);

  const toggleMarkBuilt = (layerIdx: number) => {
    const updated = new Set(builtLayers);
    if (updated.has(layerIdx)) {
      updated.delete(layerIdx);
    } else {
      updated.add(layerIdx);
    }
    setBuiltLayers(updated);
  };

  const handleNextLayer = () => {
    if (currentLayer < model.height - 1) {
      setCurrentLayer(currentLayer + 1);
    }
  };

  const handleResetLayers = () => {
    setBuiltLayers(new Set());
    setCurrentLayer(0);
  };

  const maxSliderValue = allowLargeSizes ? 256 : 64;

  const totalBlocks = model.totalBlocks;
  const stacks64 = Math.floor(totalBlocks / 64);
  const remainderBlocks = totalBlocks % 64;
  const shulkerBoxes = (totalBlocks / (64 * 27)).toFixed(1);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Title Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#2d3540]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <span className="text-emerald-400">❖</span> Minecraft Shape Generator
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Build perfect hollow domes, spheres, and roofs with 3D orbit inspection and 2D layer slicer.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowExportModal(true)}
            className="mc-button-green px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-2"
          >
            <Share2 className="w-3.5 h-3.5" /> Export Blueprint
          </button>
        </div>
      </div>

      {/* Main 3-Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* VIEW AREA */}
        <div
          className={`grid gap-6 ${
            viewMode === 'both'
              ? 'lg:col-span-8 grid-cols-1 md:grid-cols-2'
              : 'lg:col-span-8 grid-cols-1'
          }`}
        >
          {(viewMode === 'both' || viewMode === '3d') && (
            <div className="w-full h-[520px]">
              <VoxelCanvas3D
                model={model}
                currentLayer={currentLayer}
                renderMode={activeTab === 'layers' ? 'upToCurrent' : 'all'}
              />
            </div>
          )}

          {(viewMode === 'both' || viewMode === '2d') && (
            <div className="w-full h-[520px]">
              <LayerCanvas2D
                model={model}
                currentLayer={currentLayer}
                showOnionSkin={showOnionSkin}
                colorCurrentLayerOnly={false}
              />
            </div>
          )}
        </div>

        {/* SIDEBAR CONTROLS */}
        <div className="lg:col-span-4 w-full bg-[#181d24] rounded-xl border border-[#2d3540] overflow-hidden flex flex-col shadow-xl">
          {/* TAB HEADER */}
          <div className="grid grid-cols-2 border-b border-[#2d3540] bg-[#14181d] p-1.5 gap-1.5">
            <button
              onClick={() => setActiveTab('shape')}
              className={`py-2 px-3 rounded-xs text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === 'shape'
                  ? 'bg-[#262e38] text-emerald-400 border-t-2 border-emerald-400 shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" /> Shape Config
            </button>
            <button
              onClick={() => setActiveTab('layers')}
              className={`py-2 px-3 rounded-xs text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === 'layers'
                  ? 'bg-[#262e38] text-emerald-400 border-t-2 border-emerald-400 shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Layer Tracker
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="p-5 space-y-6 max-h-[720px] overflow-y-auto">
            {/* TAB 1: SHAPE SETTINGS */}
            {activeTab === 'shape' && (
              <div className="space-y-6">
                {/* Shape Selection */}
                <div className="space-y-3">
                  <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Base Primitive
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setShape('dome')}
                      className={`p-2.5 rounded-sm text-xs font-bold text-left transition flex items-center justify-between border ${
                        shape === 'dome'
                          ? 'bg-[#202934] border-emerald-500 text-emerald-300'
                          : 'bg-[#14181d] border-[#2d3540] text-zinc-300 hover:bg-[#1c222a]'
                      }`}
                    >
                      <span>Dome (rounded)</span>
                      {shape === 'dome' && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>

                    <button
                      onClick={() => setShape('cone')}
                      className={`p-2.5 rounded-sm text-xs font-bold text-left transition flex items-center justify-between border ${
                        shape === 'cone'
                          ? 'bg-[#202934] border-emerald-500 text-emerald-300'
                          : 'bg-[#14181d] border-[#2d3540] text-zinc-300 hover:bg-[#1c222a]'
                      }`}
                    >
                      <span>Cone (tapered)</span>
                      {shape === 'cone' && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="space-y-3 pt-2 border-t border-[#262e38]">
                  <label className="flex items-start gap-2.5 text-xs text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smoothCurve}
                      onChange={(e) => setSmoothCurve(e.target.checked)}
                      className="w-4 h-4 text-emerald-500 bg-[#111418] border-[#3b4450] mt-0.5 rounded-xs"
                    />
                    <div>
                      <div className="font-bold text-white">Smooth Curve (half slabs)</div>
                      <div className="text-[11px] text-zinc-400">
                        Uses lower/upper slabs to soften the outline.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={geodesic}
                      onChange={(e) => setGeodesic(e.target.checked)}
                      className="w-4 h-4 text-emerald-500 bg-[#111418] border-[#3b4450] mt-0.5 rounded-xs"
                    />
                    <div>
                      <div className="font-bold text-white">Geodesic shell</div>
                      <div className="text-[11px] text-zinc-400">
                        Samples the surface with triangular struts.
                      </div>
                    </div>
                  </label>
                </div>

                {/* Diameter Slider */}
                <div className="space-y-2 pt-2 border-t border-[#262e38]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-200">Diameter: {diameter}</span>
                    <input
                      type="number"
                      min={3}
                      max={maxSliderValue}
                      value={diameter}
                      onChange={(e) => setDiameter(Math.max(3, Math.min(maxSliderValue, Number(e.target.value) || 3)))}
                      className="w-14 px-2 py-1 text-center font-mono text-xs bg-[#111418] text-emerald-400 border border-[#3b4450] rounded-xs"
                    />
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={maxSliderValue}
                    value={diameter}
                    onChange={(e) => setDiameter(Number(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>

                {/* Height Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-200">Height: {height}</span>
                    <input
                      type="number"
                      min={2}
                      max={maxSliderValue}
                      value={height}
                      onChange={(e) => setHeight(Math.max(2, Math.min(maxSliderValue, Number(e.target.value) || 2)))}
                      className="w-14 px-2 py-1 text-center font-mono text-xs bg-[#111418] text-emerald-400 border border-[#3b4450] rounded-xs"
                    />
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={maxSliderValue}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>

                {/* Large Size Warning Box */}
                <div className="p-3 rounded-sm bg-[#221c15] border border-[#78350f] space-y-1">
                  <label className="flex items-start gap-2 text-xs text-[#fde047] font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowLargeSizes}
                      onChange={(e) => setAllowLargeSizes(e.target.checked)}
                      className="w-4 h-4 text-amber-500 bg-[#111418] border-amber-600 mt-0.5 rounded-xs"
                    />
                    <span>Allow sizes above 64 blocks</span>
                  </label>
                  <p className="text-[11px] text-amber-200/80 pl-6">
                    Structures &gt; 64 blocks contain thousands of voxels.
                  </p>
                </div>

                {/* Symmetry Lines Section */}
                <div className="p-3.5 rounded-sm bg-[#14181d] border border-[#2d3540] space-y-3">
                  <label className="flex items-center gap-2 text-xs font-bold text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showSymmetry}
                      onChange={(e) => setShowSymmetry(e.target.checked)}
                      className="w-4 h-4 text-emerald-500 bg-[#111418] border-[#3b4450] rounded-xs"
                    />
                    <span>Show Symmetrical Lines (Ribs)</span>
                  </label>

                  {showSymmetry && (
                    <div className="space-y-3 pt-2 border-t border-[#262e38]">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-300">
                          <span>Line Count: {lineCount}</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={16}
                          value={lineCount}
                          onChange={(e) => setLineCount(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-300">
                          <span>Line Width: {lineWidthDeg}°</span>
                        </div>
                        <input
                          type="range"
                          min={2}
                          max={45}
                          value={lineWidthDeg}
                          onChange={(e) => setLineWidthDeg(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-300">
                          <span>Layer Spacing: {layerSpacing}</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={6}
                          value={layerSpacing}
                          onChange={(e) => setLayerSpacing(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-300">
                          <span>Rotation: {rotationDeg}°</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={360}
                          value={rotationDeg}
                          onChange={(e) => setRotationDeg(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: LAYERS */}
            {activeTab === 'layers' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => toggleMarkBuilt(currentLayer)}
                      className={`py-2.5 px-3 rounded-xs text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                        builtLayers.has(currentLayer)
                          ? 'mc-button-green'
                          : 'mc-button'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {builtLayers.has(currentLayer) ? 'Marked Built' : 'Mark Built'}
                    </button>

                    <button
                      onClick={handleNextLayer}
                      disabled={currentLayer >= model.height - 1}
                      className="mc-button-blue py-2.5 px-3 rounded-xs text-xs font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1"
                    >
                      Next Layer <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 text-zinc-400">
                    <button
                      onClick={handleResetLayers}
                      className="hover:text-white flex items-center gap-1 font-medium transition"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset Tracker
                    </button>
                    <span className="font-mono font-bold text-emerald-400">
                      Layer {currentLayer + 1} / {model.height}
                    </span>
                  </div>
                </div>

                {/* Built Layers Grid */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-zinc-300">Built Layers:</div>
                  <div className="grid grid-cols-3 gap-1.5 max-h-40 overflow-y-auto p-2 bg-[#111418] rounded-sm border border-[#2d3540]">
                    {Array.from({ length: model.height }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setCurrentLayer(i);
                          toggleMarkBuilt(i);
                        }}
                        className={`py-1.5 px-2 rounded-xs text-xs font-mono font-bold border flex items-center justify-between transition ${
                          builtLayers.has(i)
                            ? 'bg-[#064e3b] border-emerald-500 text-emerald-300'
                            : i === currentLayer
                            ? 'bg-[#0369a1] border-sky-400 text-white'
                            : 'bg-[#181d24] border-[#2d3540] text-zinc-400 hover:bg-[#202730]'
                        }`}
                      >
                        <span>{i + 1}</span>
                        {builtLayers.has(i) && <Check className="w-3 h-3 text-emerald-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Layer Scrubber */}
                <div className="space-y-1.5">
                  <input
                    type="range"
                    min={0}
                    max={Math.max(0, model.height - 1)}
                    value={currentLayer}
                    onChange={(e) => setCurrentLayer(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Layers & View Sub-Card */}
                <div className="p-3.5 rounded-sm bg-[#14181d] border border-[#2d3540] space-y-3">
                  <div className="text-xs font-bold text-zinc-300">View Settings</div>

                  {/* View Mode */}
                  <div className="grid grid-cols-3 gap-1 bg-[#111418] p-1 rounded-sm border border-[#2d3540]">
                    {[
                      { id: '3d', label: '3D' },
                      { id: '2d', label: '2D' },
                      { id: 'both', label: 'Both' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setViewMode(item.id as any)}
                        className={`py-1 rounded-xs text-xs font-bold transition ${
                          viewMode === item.id
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Color Palette */}
                  <select
                    value={palette}
                    onChange={(e) => setPalette(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#111418] border border-[#3b4450] rounded-xs text-xs text-zinc-200 font-medium focus:outline-emerald-500"
                  >
                    <option value="okabeIto">Okabe-Ito (High Contrast)</option>
                    <option value="minecraftWool">Classic Minecraft Wool</option>
                    <option value="cyberRainbow">Cyber Rainbow</option>
                    <option value="slateBlueprint">Slate Blueprint</option>
                  </select>

                  <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showOnionSkin}
                      onChange={(e) => setShowOnionSkin(e.target.checked)}
                      className="w-4 h-4 text-emerald-500 bg-[#111418] border-[#3b4450] rounded-xs"
                    />
                    <span>Show Ghost Lower Layer</span>
                  </label>
                </div>

                {/* Survival Material Summary */}
                <div className="p-3.5 rounded-sm bg-[#14181d] border border-emerald-900/60 space-y-2 text-xs">
                  <div className="font-bold text-emerald-400">Survival Block Count:</div>
                  <div className="grid grid-cols-2 gap-2 text-zinc-300 font-mono">
                    <div>Total: <span className="font-bold text-white">{totalBlocks}</span></div>
                    <div>Stacks: <span className="font-bold text-white">{stacks64}s + {remainderBlocks}</span></div>
                    <div>Shulkers: <span className="font-bold text-white">{shulkerBoxes}</span></div>
                    <div>This Layer: <span className="font-bold text-white">{model.layers.get(currentLayer)?.length || 0}</span></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EXPORT MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#181d24] w-full max-w-xl rounded-sm border border-[#3b4450] shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#2d3540] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">❖</span> Export Blueprint
              </h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              <p>
                <strong>Summary:</strong> {shape.toUpperCase()} • {diameter}x{diameter} Diameter • {height} Height • {totalBlocks} Blocks ({stacks64} stacks of 64).
              </p>

              <div className="p-3 bg-[#111418] rounded-xs border border-[#2d3540] font-mono text-[11px] text-emerald-400 max-h-48 overflow-y-auto whitespace-pre">
{`# Minecraft Dome Blueprint
Shape: ${shape}
Diameter: ${diameter}x${diameter}
Height: ${height}
Total Blocks: ${totalBlocks} (${stacks64} stacks + ${remainderBlocks})

Layers breakdown:
${Array.from({ length: model.height }, (_, i) => `Layer ${i + 1}: ${model.layers.get(i)?.length || 0} blocks`).join('\n')}`}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Minecraft Dome Blueprint\nDiameter: ${diameter}x${diameter}\nHeight: ${height}\nTotal Blocks: ${totalBlocks} (${stacks64} stacks of 64)\nGenerated with https://minecraftdomegenerator.cyou`
                  );
                  setCopiedText(true);
                  setTimeout(() => setCopiedText(false), 2000);
                }}
                className="mc-button px-4 py-2 text-xs font-bold"
              >
                {copiedText ? 'Copied!' : 'Copy Summary'}
              </button>
              <button
                onClick={() => window.print()}
                className="mc-button-green px-4 py-2 text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
