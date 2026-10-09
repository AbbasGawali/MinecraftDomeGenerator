'use client';

import React, { useState, useMemo, useEffect } from 'react';
import VoxelCanvas3D from './VoxelCanvas3D';
import LayerCanvas2D from './LayerCanvas2D';
import { generateVoxels, ShapeConfig, ShapeType, COLOR_PALETTES } from '@/lib/voxelEngine';
import { Layers, Settings, Share2, Printer, RotateCcw, Check, Sun, Moon, Info, X, ChevronRight, CheckCircle2 } from 'lucide-react';
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

  // Stacks calculation
  const totalBlocks = model.totalBlocks;
  const stacks64 = Math.floor(totalBlocks / 64);
  const remainderBlocks = totalBlocks % 64;
  const shulkerBoxes = (totalBlocks / (64 * 27)).toFixed(1);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* 1. MINIMALIST TOP HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Minecraft Shape Generator
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Visualize domes, cones, and layers with on-canvas controls.
          </p>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <Link
            href="/about"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-stone-200 hover:bg-stone-50 hover:border-stone-300 transition-all shadow-2xs"
          >
            About
          </Link>
          <button
            onClick={() => setShowExportModal(true)}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-all shadow-xs flex items-center gap-2"
          >
            <Share2 className="w-3.5 h-3.5" /> Export...
          </button>
        </div>
      </div>

      {/* 2. THREE-PANEL CORE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* VIEW AREA (3D & 2D CANVASES) */}
        <div
          className={`grid gap-6 ${
            viewMode === 'both'
              ? 'lg:col-span-8 grid-cols-1 md:grid-cols-2'
              : 'lg:col-span-8 grid-cols-1'
          }`}
        >
          {/* 3D Interactive Canvas */}
          {(viewMode === 'both' || viewMode === '3d') && (
            <div className="w-full h-[520px]">
              <VoxelCanvas3D
                model={model}
                currentLayer={currentLayer}
                renderMode={activeTab === 'layers' ? 'upToCurrent' : 'all'}
              />
            </div>
          )}

          {/* 2D Layer Slicer Canvas */}
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

        {/* CONTROLS & SETTINGS SIDEBAR */}
        <div className="lg:col-span-4 w-full bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden flex flex-col">
          {/* TAB HEADER */}
          <div className="grid grid-cols-2 border-b border-stone-200 bg-stone-50/60 p-1.5 gap-1.5">
            <button
              onClick={() => setActiveTab('layers')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'layers'
                  ? 'bg-white text-blue-600 shadow-xs border border-stone-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Layers
            </button>
            <button
              onClick={() => setActiveTab('shape')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'shape'
                  ? 'bg-white text-blue-600 shadow-xs border border-stone-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Settings className="w-3.5 h-3.5" /> Shape Settings
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="p-5 space-y-6 max-h-[720px] overflow-y-auto">
            {/* TAB 1: SHAPE SETTINGS */}
            {activeTab === 'shape' && (
              <div className="space-y-6">
                {/* Shape Configuration */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Shape Configuration
                  </h3>

                  {/* Radio Shape Selection */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 cursor-pointer">
                      <input
                        type="radio"
                        name="shape"
                        checked={shape === 'dome'}
                        onChange={() => setShape('dome')}
                        className="w-4 h-4 text-blue-600 border-stone-300 focus:ring-blue-500"
                      />
                      <span>Dome (rounded)</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 cursor-pointer">
                      <input
                        type="radio"
                        name="shape"
                        checked={shape === 'cone'}
                        onChange={() => setShape('cone')}
                        className="w-4 h-4 text-blue-600 border-stone-300 focus:ring-blue-500"
                      />
                      <span>Cone (tapered)</span>
                    </label>
                  </div>
                </div>

                {/* Additional Shape Flags */}
                <div className="space-y-3 pt-2 border-t border-stone-100">
                  <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smoothCurve}
                      onChange={(e) => setSmoothCurve(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 border-stone-300 mt-0.5 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-semibold text-slate-800">Smooth Curve (half slabs)</div>
                      <div className="text-[11px] text-slate-500">
                        Uses lower/upper slabs near the surface to soften the dome/cone outline.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={geodesic}
                      onChange={(e) => setGeodesic(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 border-stone-300 mt-0.5 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-semibold text-slate-800">Geodesic shell</div>
                      <div className="text-[11px] text-slate-500">
                        Samples the dome surface with triangular struts.
                      </div>
                    </div>
                  </label>
                </div>

                {/* Diameter Slider & Input */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Diameter: {diameter}</span>
                    <input
                      type="number"
                      min={3}
                      max={maxSliderValue}
                      value={diameter}
                      onChange={(e) => setDiameter(Math.max(3, Math.min(maxSliderValue, Number(e.target.value) || 3)))}
                      className="w-14 px-2 py-1 text-center font-mono text-xs border border-stone-300 rounded-lg focus:outline-blue-500"
                    />
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={maxSliderValue}
                    value={diameter}
                    onChange={(e) => setDiameter(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Height Slider & Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Height: {height}</span>
                    <input
                      type="number"
                      min={2}
                      max={maxSliderValue}
                      value={height}
                      onChange={(e) => setHeight(Math.max(2, Math.min(maxSliderValue, Number(e.target.value) || 2)))}
                      className="w-14 px-2 py-1 text-center font-mono text-xs border border-stone-300 rounded-lg focus:outline-blue-500"
                    />
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={maxSliderValue}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Warning / Allow Large Sizes Box */}
                <div className="p-3.5 rounded-xl bg-[#fff8f0] border border-[#fed7aa] space-y-1.5">
                  <label className="flex items-start gap-2 text-xs text-[#9a3412] font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowLargeSizes}
                      onChange={(e) => setAllowLargeSizes(e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-orange-300 mt-0.5 rounded focus:ring-orange-500"
                    />
                    <span>Allow sizes above 64 blocks (⚠️ May lag your computer badly while it computes. Give it a second.)</span>
                  </label>
                  <p className="text-[11px] text-[#c2410c] pl-6 leading-relaxed">
                    Anything bigger than 64 blocks may lag your computer during initial computation.
                  </p>
                </div>

                {/* Symmetry Lines Section */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showSymmetry}
                      onChange={(e) => setShowSymmetry(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-stone-300 rounded focus:ring-blue-500"
                    />
                    <span>Show Symmetrical Lines</span>
                  </label>

                  {showSymmetry && (
                    <div className="space-y-4 pt-2 border-t border-stone-200">
                      {/* Line Count */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-700 font-medium">
                          <span>Line Count: {lineCount}</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={16}
                          value={lineCount}
                          onChange={(e) => setLineCount(Number(e.target.value))}
                          className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                      </div>

                      {/* Line Width */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-700 font-medium">
                          <span>Line Width (degrees): {lineWidthDeg}</span>
                        </div>
                        <input
                          type="range"
                          min={2}
                          max={45}
                          value={lineWidthDeg}
                          onChange={(e) => setLineWidthDeg(Number(e.target.value))}
                          className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                      </div>

                      {/* Layer Spacing */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-700 font-medium">
                          <span>Layer Spacing: {layerSpacing}</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={6}
                          value={layerSpacing}
                          onChange={(e) => setLayerSpacing(Number(e.target.value))}
                          className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="text-[10px] text-slate-500">
                          Spacing &gt; 1 creates dashed vertical arcs by skipping layers.
                        </div>
                      </div>

                      {/* Rotation */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-700 font-medium">
                          <span>Rotation (degrees): {rotationDeg}</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={360}
                          value={rotationDeg}
                          onChange={(e) => setRotationDeg(Number(e.target.value))}
                          className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: LAYERS & ASSISTANT */}
            {activeTab === 'layers' && (
              <div className="space-y-6">
                {/* Action Controls */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => toggleMarkBuilt(currentLayer)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        builtLayers.has(currentLayer)
                          ? 'bg-emerald-700 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-xs'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {builtLayers.has(currentLayer) ? 'Marked Built' : 'Mark Built'}
                    </button>

                    <button
                      onClick={handleNextLayer}
                      disabled={currentLayer >= model.height - 1}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1"
                    >
                      Next Layer <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      onClick={handleResetLayers}
                      className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium transition"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                    <span className="font-bold text-slate-800">
                      Layer {currentLayer + 1} / {model.height}
                    </span>
                  </div>
                </div>

                {/* Built Layers Checkbox Matrix */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-800">Built Layers:</div>
                  <div className="grid grid-cols-3 gap-1.5 max-h-40 overflow-y-auto p-2 bg-stone-50 rounded-xl border border-stone-200">
                    {Array.from({ length: model.height }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setCurrentLayer(i);
                          toggleMarkBuilt(i);
                        }}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border flex items-center justify-between transition ${
                          builtLayers.has(i)
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                            : i === currentLayer
                            ? 'bg-blue-50 border-blue-300 text-blue-700'
                            : 'bg-white border-stone-200 text-slate-600 hover:bg-stone-100'
                        }`}
                      >
                        <span>{i + 1}</span>
                        {builtLayers.has(i) && <Check className="w-3 h-3 text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Layer Scrubber Slider */}
                <div className="space-y-1.5">
                  <input
                    type="range"
                    min={0}
                    max={Math.max(0, model.height - 1)}
                    value={currentLayer}
                    onChange={(e) => setCurrentLayer(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Layers & View Sub-Card */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-4">
                  <div className="text-xs font-bold text-slate-900">Layers &amp; View</div>

                  {/* View Mode */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-600">View Mode</div>
                    <div className="grid grid-cols-3 gap-1 bg-stone-200/80 p-1 rounded-xl">
                      {[
                        { id: '3d', label: '3D' },
                        { id: '2d', label: '2D' },
                        { id: 'both', label: 'Both' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setViewMode(item.id as any)}
                          className={`py-1 rounded-lg text-xs font-semibold transition ${
                            viewMode === item.id
                              ? 'bg-white text-blue-600 shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-600">Color Palette</div>
                    <select
                      value={palette}
                      onChange={(e) => setPalette(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-blue-500"
                    >
                      <option value="okabeIto">Okabe-Ito (Colorblind Accessible)</option>
                      <option value="classic">Classic Minecraft Wool</option>
                      <option value="rainbow">Cyber Rainbow</option>
                      <option value="blueprint">Slate Blueprint</option>
                    </select>
                  </div>

                  {/* Onion Skin Checkbox */}
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showOnionSkin}
                      onChange={(e) => setShowOnionSkin(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-stone-300 rounded focus:ring-blue-500"
                    />
                    <span>Show Ghost Lower Layer (Onion Skin)</span>
                  </label>
                </div>

                {/* Materials Count */}
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2 text-xs">
                  <div className="font-bold text-blue-900">Survival Materials:</div>
                  <div className="grid grid-cols-2 gap-2 text-slate-700">
                    <div>Total: <span className="font-mono font-bold text-slate-900">{totalBlocks}</span></div>
                    <div>Stacks: <span className="font-mono font-bold text-slate-900">{stacks64}s + {remainderBlocks}</span></div>
                    <div>Shulkers: <span className="font-mono font-bold text-slate-900">{shulkerBoxes}</span></div>
                    <div>Current Layer: <span className="font-mono font-bold text-slate-900">{model.layers.get(currentLayer)?.length || 0}</span></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. EXPORT MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl border border-stone-200 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                Export Minecraft Blueprint
              </h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                <strong>Structure Summary:</strong> {shape.toUpperCase()} • {diameter}x{diameter} Diameter • {height} Height • {totalBlocks} Total Blocks ({stacks64} stacks of 64).
              </p>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 font-mono text-[11px] max-h-48 overflow-y-auto whitespace-pre">
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
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-slate-800 transition"
              >
                {copiedText ? 'Copied to Clipboard!' : 'Copy Summary'}
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1.5"
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
