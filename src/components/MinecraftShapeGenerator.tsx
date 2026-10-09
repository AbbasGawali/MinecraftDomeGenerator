'use client';

import React, { useState, useMemo, useEffect } from 'react';
import VoxelCanvas3D from './VoxelCanvas3D';
import LayerCanvas2D from './LayerCanvas2D';
import { generateVoxels, ShapeConfig, ShapeType } from '@/lib/voxelEngine';
import { useTheme } from '@/context/ThemeContext';
import { Layers, Settings, Share2, Printer, RotateCcw, Check, X, ChevronRight } from 'lucide-react';

export interface MinecraftShapeGeneratorProps {
  initialShape?: ShapeType;
  initialDiameter?: number;
  initialHeight?: number;
  initialSmoothCurve?: boolean;
  initialGeodesic?: boolean;
  title?: string;
  subtitle?: string;
}

export default function MinecraftShapeGenerator({
  initialShape = 'dome',
  initialDiameter = 30,
  initialHeight = 15,
  initialSmoothCurve = false,
  initialGeodesic = false,
  title,
  subtitle,
}: MinecraftShapeGeneratorProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Shape configuration
  const [shape, setShape] = useState<ShapeType>(initialShape);
  const [diameter, setDiameter] = useState<number>(initialDiameter);
  const [height, setHeight] = useState<number>(initialHeight);
  const [smoothCurve, setSmoothCurve] = useState<boolean>(initialSmoothCurve);
  const [geodesic, setGeodesic] = useState<boolean>(initialGeodesic || initialShape === 'geodesic');
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
  const [currentLayer, setCurrentLayer] = useState<number>(Math.max(0, initialHeight - 1));
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
      thickness: 1,
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
    <div
      className={`w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 transition-colors ${
        isDark ? 'text-white' : 'text-slate-900'
      }`}
    >
      {/* Top Title Banner */}
      <div
        className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b transition-colors ${
          isDark ? 'border-[#2d3540]' : 'border-stone-200'
        }`}
      >
        <div>
          <h1
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            <span className="text-emerald-500">❖</span> {title || 'Minecraft Dome Generator'}
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
            {subtitle || 'Free 3D & 2D voxel shape generator for Minecraft dome roofs, spheres, circles, and cones with layer-by-layer blueprints.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowExportModal(true)}
            className="mc-button-green px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-2 shadow-sm"
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
        <div
          className={`lg:col-span-4 w-full rounded-xl border overflow-hidden flex flex-col transition-colors ${
            isDark
              ? 'bg-[#181d24] border-[#2d3540] shadow-xl'
              : 'bg-white border-stone-200 shadow-sm'
          }`}
        >
          {/* TAB HEADER */}
          <div
            className={`grid grid-cols-2 border-b p-1.5 gap-1.5 transition-colors ${
              isDark ? 'border-[#2d3540] bg-[#14181d]' : 'border-stone-200 bg-stone-50'
            }`}
          >
            <button
              onClick={() => setActiveTab('shape')}
              className={`py-2 px-3 rounded-xs text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === 'shape'
                  ? isDark
                    ? 'bg-[#262e38] text-emerald-400 border-t-2 border-emerald-400 shadow-xs'
                    : 'bg-white text-emerald-700 border-t-2 border-emerald-500 shadow-xs'
                  : isDark
                  ? 'text-zinc-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Settings className="w-3.5 h-3.5" /> Shape Config
            </button>
            <button
              onClick={() => setActiveTab('layers')}
              className={`py-2 px-3 rounded-xs text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === 'layers'
                  ? isDark
                    ? 'bg-[#262e38] text-emerald-400 border-t-2 border-emerald-400 shadow-xs'
                    : 'bg-white text-emerald-700 border-t-2 border-emerald-500 shadow-xs'
                  : isDark
                  ? 'text-zinc-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
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
                  <div className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                    Base Primitive
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        setShape('dome');
                        setGeodesic(false);
                        if (height > Math.round(diameter / 2)) {
                          setHeight(Math.max(1, Math.round(diameter / 2)));
                        }
                      }}
                      className={`p-2.5 rounded-sm text-xs font-bold text-left transition flex items-center justify-between border ${
                        shape === 'dome' && !geodesic
                          ? isDark
                            ? 'bg-[#202934] border-emerald-500 text-emerald-300'
                            : 'bg-emerald-50 border-emerald-500 text-emerald-800'
                          : isDark
                          ? 'bg-[#14181d] border-[#2d3540] text-zinc-300 hover:bg-[#1c222a]'
                          : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100'
                      }`}
                    >
                      <span>Dome (roof)</span>
                      {shape === 'dome' && !geodesic && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                    </button>

                    <button
                      onClick={() => {
                        setShape('sphere');
                        setGeodesic(false);
                        setHeight(diameter);
                      }}
                      className={`p-2.5 rounded-sm text-xs font-bold text-left transition flex items-center justify-between border ${
                        shape === 'sphere'
                          ? isDark
                            ? 'bg-[#202934] border-emerald-500 text-emerald-300'
                            : 'bg-emerald-50 border-emerald-500 text-emerald-800'
                          : isDark
                          ? 'bg-[#14181d] border-[#2d3540] text-zinc-300 hover:bg-[#1c222a]'
                          : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100'
                      }`}
                    >
                      <span>Sphere (3D)</span>
                      {shape === 'sphere' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                    </button>

                    <button
                      onClick={() => {
                        setShape('cone');
                        setGeodesic(false);
                        setHeight(diameter);
                      }}
                      className={`p-2.5 rounded-sm text-xs font-bold text-left transition flex items-center justify-between border ${
                        shape === 'cone'
                          ? isDark
                            ? 'bg-[#202934] border-emerald-500 text-emerald-300'
                            : 'bg-emerald-50 border-emerald-500 text-emerald-800'
                          : isDark
                          ? 'bg-[#14181d] border-[#2d3540] text-zinc-300 hover:bg-[#1c222a]'
                          : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100'
                      }`}
                    >
                      <span>Cone (spire)</span>
                      {shape === 'cone' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                    </button>

                    <button
                      onClick={() => {
                        setShape('cylinder');
                        setGeodesic(false);
                        setHeight(1);
                      }}
                      className={`p-2.5 rounded-sm text-xs font-bold text-left transition flex items-center justify-between border ${
                        shape === 'cylinder'
                          ? isDark
                            ? 'bg-[#202934] border-emerald-500 text-emerald-300'
                            : 'bg-emerald-50 border-emerald-500 text-emerald-800'
                          : isDark
                          ? 'bg-[#14181d] border-[#2d3540] text-zinc-300 hover:bg-[#1c222a]'
                          : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100'
                      }`}
                    >
                      <span>Circle (2D)</span>
                      {shape === 'cylinder' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                    </button>

                    <button
                      onClick={() => {
                        setShape('torus');
                        setGeodesic(false);
                        setHeight(Math.max(4, Math.round(diameter / 3)));
                      }}
                      className={`p-2.5 rounded-sm text-xs font-bold text-left transition flex items-center justify-between border ${
                        shape === 'torus'
                          ? isDark
                            ? 'bg-[#202934] border-emerald-500 text-emerald-300'
                            : 'bg-emerald-50 border-emerald-500 text-emerald-800'
                          : isDark
                          ? 'bg-[#14181d] border-[#2d3540] text-zinc-300 hover:bg-[#1c222a]'
                          : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100'
                      }`}
                    >
                      <span>Torus (ring)</span>
                      {shape === 'torus' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                    </button>

                    <button
                      onClick={() => {
                        setShape('geodesic');
                        setGeodesic(true);
                        setHeight(Math.max(1, Math.round(diameter / 2)));
                      }}
                      className={`p-2.5 rounded-sm text-xs font-bold text-left transition flex items-center justify-between border ${
                        shape === 'geodesic' || (shape === 'dome' && geodesic)
                          ? isDark
                            ? 'bg-[#202934] border-emerald-500 text-emerald-300'
                            : 'bg-emerald-50 border-emerald-500 text-emerald-800'
                          : isDark
                          ? 'bg-[#14181d] border-[#2d3540] text-zinc-300 hover:bg-[#1c222a]'
                          : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100'
                      }`}
                    >
                      <span>Geodesic</span>
                      {(shape === 'geodesic' || (shape === 'dome' && geodesic)) && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                    </button>
                  </div>
                </div>

                {/* Additional Options */}
                <div className={`space-y-3 pt-2 border-t ${isDark ? 'border-[#262e38]' : 'border-stone-200'}`}>
                  <label className="flex items-start gap-2.5 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smoothCurve}
                      onChange={(e) => setSmoothCurve(e.target.checked)}
                      className="w-4 h-4 text-emerald-500 mt-0.5 rounded-xs"
                    />
                    <div>
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Smooth Curve (half slabs)
                      </div>
                      <div className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                        Uses lower/upper slabs to soften the dome &amp; cone outline.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={geodesic}
                      onChange={(e) => setGeodesic(e.target.checked)}
                      className="w-4 h-4 text-emerald-500 mt-0.5 rounded-xs"
                    />
                    <div>
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Geodesic shell
                      </div>
                      <div className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                        Samples the surface with triangular struts.
                      </div>
                    </div>
                  </label>
                </div>

                {/* Diameter Slider */}
                <div className={`space-y-2 pt-2 border-t ${isDark ? 'border-[#262e38]' : 'border-stone-200'}`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-bold ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>
                      Diameter: {diameter}
                    </span>
                    <input
                      type="number"
                      min={3}
                      max={maxSliderValue}
                      value={diameter}
                      onChange={(e) => setDiameter(Math.max(3, Math.min(maxSliderValue, Number(e.target.value) || 3)))}
                      className={`w-14 px-2 py-1 text-center font-mono text-xs border rounded-xs ${
                        isDark ? 'bg-[#111418] text-emerald-400 border-[#3b4450]' : 'bg-white text-emerald-700 border-stone-300'
                      }`}
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
                    <span className={`font-bold ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>
                      Height: {height}
                    </span>
                    <input
                      type="number"
                      min={2}
                      max={maxSliderValue}
                      value={height}
                      onChange={(e) => setHeight(Math.max(2, Math.min(maxSliderValue, Number(e.target.value) || 2)))}
                      className={`w-14 px-2 py-1 text-center font-mono text-xs border rounded-xs ${
                        isDark ? 'bg-[#111418] text-emerald-400 border-[#3b4450]' : 'bg-white text-emerald-700 border-stone-300'
                      }`}
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
                <div
                  className={`p-3 rounded-sm border space-y-1 ${
                    isDark ? 'bg-[#221c15] border-[#78350f]' : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <label className={`flex items-start gap-2 text-xs font-semibold cursor-pointer ${isDark ? 'text-[#fde047]' : 'text-amber-800'}`}>
                    <input
                      type="checkbox"
                      checked={allowLargeSizes}
                      onChange={(e) => setAllowLargeSizes(e.target.checked)}
                      className="w-4 h-4 text-amber-500 mt-0.5 rounded-xs"
                    />
                    <span>Allow sizes above 64 blocks</span>
                  </label>
                  <p className={`text-[11px] pl-6 ${isDark ? 'text-amber-200/80' : 'text-amber-700'}`}>
                    Structures &gt; 64 blocks contain thousands of voxels.
                  </p>
                </div>

                {/* Symmetry Lines Section */}
                <div
                  className={`p-3.5 rounded-sm border space-y-3 ${
                    isDark ? 'bg-[#14181d] border-[#2d3540]' : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <label className={`flex items-center gap-2 text-xs font-bold cursor-pointer ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <input
                      type="checkbox"
                      checked={showSymmetry}
                      onChange={(e) => setShowSymmetry(e.target.checked)}
                      className="w-4 h-4 text-emerald-500 rounded-xs"
                    />
                    <span>Show Symmetrical Lines (Ribs)</span>
                  </label>

                  {showSymmetry && (
                    <div className={`space-y-3 pt-2 border-t ${isDark ? 'border-[#262e38]' : 'border-stone-200'}`}>
                      <div className="space-y-1">
                        <div className={`flex justify-between text-xs ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
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
                        <div className={`flex justify-between text-xs ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
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
                        <div className={`flex justify-between text-xs ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
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
                        <div className={`flex justify-between text-xs ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
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

                  <div className={`flex items-center justify-between text-xs pt-1 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                    <button
                      onClick={handleResetLayers}
                      className="hover:underline flex items-center gap-1 font-medium transition"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset Tracker
                    </button>
                    <span className="font-mono font-bold text-emerald-500">
                      Layer {currentLayer + 1} / {model.height}
                    </span>
                  </div>
                </div>

                {/* Built Layers Grid */}
                <div className="space-y-2">
                  <div className={`text-xs font-bold ${isDark ? 'text-zinc-300' : 'text-slate-800'}`}>
                    Built Layers:
                  </div>
                  <div
                    className={`grid grid-cols-3 gap-1.5 max-h-40 overflow-y-auto p-2 rounded-sm border ${
                      isDark ? 'bg-[#111418] border-[#2d3540]' : 'bg-stone-50 border-stone-200'
                    }`}
                  >
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
                            : isDark
                            ? 'bg-[#181d24] border-[#2d3540] text-zinc-400 hover:bg-[#202730]'
                            : 'bg-white border-stone-300 text-slate-700 hover:bg-stone-100'
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
                <div
                  className={`p-3.5 rounded-sm border space-y-3 ${
                    isDark ? 'bg-[#14181d] border-[#2d3540]' : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className={`text-xs font-bold ${isDark ? 'text-zinc-300' : 'text-slate-800'}`}>
                    View Settings
                  </div>

                  {/* View Mode */}
                  <div
                    className={`grid grid-cols-3 gap-1 p-1 rounded-sm border ${
                      isDark ? 'bg-[#111418] border-[#2d3540]' : 'bg-stone-200 border-stone-300'
                    }`}
                  >
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
                            : isDark
                            ? 'text-zinc-400 hover:text-white'
                            : 'text-slate-600 hover:text-slate-900'
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
                    className={`w-full px-2.5 py-1.5 border rounded-xs text-xs font-medium focus:outline-emerald-500 ${
                      isDark ? 'bg-[#111418] border-[#3b4450] text-zinc-200' : 'bg-white border-stone-300 text-slate-800'
                    }`}
                  >
                    <option value="okabeIto">Okabe-Ito (High Contrast)</option>
                    <option value="minecraftWool">Classic Minecraft Wool</option>
                    <option value="cyberRainbow">Cyber Rainbow</option>
                    <option value="slateBlueprint">Slate Blueprint</option>
                  </select>

                  <label className={`flex items-center gap-2 text-xs cursor-pointer ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                    <input
                      type="checkbox"
                      checked={showOnionSkin}
                      onChange={(e) => setShowOnionSkin(e.target.checked)}
                      className="w-4 h-4 text-emerald-500 rounded-xs"
                    />
                    <span>Show Ghost Lower Layer</span>
                  </label>
                </div>

                {/* Survival Material Summary */}
                <div
                  className={`p-3.5 rounded-sm border space-y-2 text-xs ${
                    isDark ? 'bg-[#14181d] border-emerald-900/60' : 'bg-emerald-50/70 border-emerald-300'
                  }`}
                >
                  <div className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-900'}`}>
                    Survival Block Count:
                  </div>
                  <div className={`grid grid-cols-2 gap-2 font-mono ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                    <div>Total: <span className="font-bold">{totalBlocks}</span></div>
                    <div>Stacks: <span className="font-bold">{stacks64}s + {remainderBlocks}</span></div>
                    <div>Shulkers: <span className="font-bold">{shulkerBoxes}</span></div>
                    <div>This Layer: <span className="font-bold">{model.layers.get(currentLayer)?.length || 0}</span></div>
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
          <div
            className={`w-full max-w-xl rounded-sm border shadow-2xl p-6 space-y-5 ${
              isDark ? 'bg-[#181d24] border-[#3b4450] text-zinc-300' : 'bg-white border-stone-200 text-slate-800'
            }`}
          >
            <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-[#2d3540]' : 'border-stone-200'}`}>
              <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span className="text-emerald-500">❖</span> Export Blueprint
              </h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 hover:opacity-75"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p>
                <strong>Summary:</strong> {shape.toUpperCase()} • {diameter}x{diameter} Diameter • {height} Height • {totalBlocks} Blocks ({stacks64} stacks of 64).
              </p>

              <div
                className={`p-3 rounded-xs border font-mono text-[11px] max-h-48 overflow-y-auto whitespace-pre ${
                  isDark ? 'bg-[#111418] border-[#2d3540] text-emerald-400' : 'bg-stone-50 border-stone-200 text-emerald-800'
                }`}
              >
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
