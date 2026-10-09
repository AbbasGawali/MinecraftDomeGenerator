'use client';

import React, { useState, useMemo, useEffect } from 'react';
import VoxelCanvas3D from './VoxelCanvas3D';
import LayerCanvas2D from './LayerCanvas2D';
import { generateVoxels, ShapeConfig, ShapeType, COLOR_PALETTES } from '@/lib/voxelEngine';

export default function MinecraftShapeGenerator() {
  // Shape configuration
  const [shape, setShape] = useState<ShapeType>('dome');
  const [diameter, setDiameter] = useState<number>(30);
  const [diameterZ, setDiameterZ] = useState<number>(30);
  const [uniformDiameter, setUniformDiameter] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(15);
  const [thickness, setThickness] = useState<number>(1); // 1 = hollow shell
  const [smoothCurve, setSmoothCurve] = useState<boolean>(false);
  const [geodesic, setGeodesic] = useState<boolean>(false);
  const [allowLargeSizes, setAllowLargeSizes] = useState<boolean>(false);

  // Symmetry settings
  const [showSymmetry, setShowSymmetry] = useState<boolean>(false);
  const [lineCount, setLineCount] = useState<number>(4);
  const [lineWidthDeg, setLineWidthDeg] = useState<number>(8);
  const [layerSpacing, setLayerSpacing] = useState<number>(1);
  const [rotationDeg, setRotationDeg] = useState<number>(0);

  // Layer & Visual settings
  const [activeTab, setActiveTab] = useState<'layers' | 'shape'>('shape');
  const [currentLayer, setCurrentLayer] = useState<number>(14);
  const [viewMode, setViewMode] = useState<'3d' | '2d' | 'both'>('both');
  const [palette, setPalette] = useState<string>('okabeIto');
  const [colorCurrentLayerOnly, setColorCurrentLayerOnly] = useState<boolean>(false);
  const [showOnionSkin, setShowOnionSkin] = useState<boolean>(true);
  const [builtLayers, setBuiltLayers] = useState<Set<number>>(new Set());

  // Export & Share state
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string>('');

  const actualDiameterZ = uniformDiameter ? diameter : diameterZ;

  const config: ShapeConfig = useMemo(
    () => ({
      shape,
      diameterX: diameter,
      diameterZ: actualDiameterZ,
      height,
      thickness,
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
      actualDiameterZ,
      height,
      thickness,
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

  // Handle Mark Built
  const toggleMarkBuilt = (layerIdx: number) => {
    const updated = new Set(builtLayers);
    if (updated.has(layerIdx)) {
      updated.delete(layerIdx);
    } else {
      updated.add(layerIdx);
    }
    setBuiltLayers(updated);
  };

  const nextLayer = () => {
    if (currentLayer < model.height - 1) {
      setCurrentLayer(currentLayer + 1);
    }
  };

  const prevLayer = () => {
    if (currentLayer > 0) {
      setCurrentLayer(currentLayer - 1);
    }
  };

  const handleExportText = () => {
    let report = `Minecraft Shape Generator Plan (${shape.toUpperCase()})\n`;
    report += `Dimensions: ${diameter}x${actualDiameterZ} Blocks | Height: ${height} Layers\n`;
    report += `Total Blocks: ${model.totalBlocks} (${Math.floor(model.totalBlocks / 64)} stacks + ${model.totalBlocks % 64} blocks)\n\n`;
    report += `Layer by Layer Breakdown:\n`;

    for (let y = 0; y < model.height; y++) {
      const count = model.layers.get(y)?.length || 0;
      report += `Layer ${y + 1}: ${count} blocks\n`;
    }

    report += `\nGenerated via https://minecraftdomegenerator.cyou`;

    navigator.clipboard.writeText(report).then(() => {
      setCopiedText('✓ Plan Copied to Clipboard!');
      setTimeout(() => setCopiedText(''), 3000);
    });
  };

  const totalStacks = Math.floor(model.totalBlocks / 64);
  const remainingBlocks = model.totalBlocks % 64;

  return (
    <div className="w-full bg-[#fdfbf7]">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-stone-200 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            Minecraft Shape &amp; Dome Generator
          </h1>
          <p className="text-xs text-slate-500">
            Visualize hollow domes, cones, spheres, and layer-by-layer blueprints with on-canvas controls.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            Export... 📦
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="max-w-[1700px] mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Canvas Area (3D + 2D) */}
          <div className={`${viewMode === 'both' ? 'lg:col-span-8' : 'lg:col-span-8'} space-y-4`}>
            
            <div className={`grid gap-4 ${viewMode === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {(viewMode === '3d' || viewMode === 'both') && (
                <div className="w-full h-[480px]">
                  <VoxelCanvas3D
                    model={model}
                    currentLayer={currentLayer}
                    renderMode="all"
                    showGrid={true}
                  />
                </div>
              )}

              {(viewMode === '2d' || viewMode === 'both') && (
                <div className="w-full h-[480px]">
                  <LayerCanvas2D
                    model={model}
                    currentLayer={currentLayer}
                    showOnionSkin={showOnionSkin}
                    colorCurrentLayerOnly={colorCurrentLayerOnly}
                  />
                </div>
              )}
            </div>

            {/* Quick Material Calculator Bar */}
            <div className="bg-white border border-stone-200 p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-900">
                  Total Materials: <strong className="text-orange-600 font-mono text-sm">{model.totalBlocks} Blocks</strong>
                </span>
                <span className="text-stone-500 bg-stone-100 px-2.5 py-1 border border-stone-200">
                  📦 <strong>{totalStacks} Stacks</strong> + {remainingBlocks} blocks
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevLayer}
                  disabled={currentLayer <= 0}
                  className="px-2.5 py-1 bg-stone-100 border border-stone-300 font-bold hover:bg-stone-200 disabled:opacity-40 cursor-pointer"
                >
                  ◀ Prev Layer
                </button>
                <span className="font-bold text-slate-800 font-mono">
                  Layer {currentLayer + 1} / {model.height}
                </span>
                <button
                  onClick={nextLayer}
                  disabled={currentLayer >= model.height - 1}
                  className="px-2.5 py-1 bg-stone-100 border border-stone-300 font-bold hover:bg-stone-200 disabled:opacity-40 cursor-pointer"
                >
                  Next Layer ▶
                </button>
              </div>
            </div>

          </div>

          {/* Right Control Settings Panel */}
          <div className="lg:col-span-4 bg-white border-2 border-stone-300 shadow-sm">
            
            {/* Mode Tabs */}
            <div className="grid grid-cols-2 border-b border-stone-300 text-xs font-bold text-center">
              <button
                onClick={() => setActiveTab('layers')}
                className={`py-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'layers'
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-stone-600 hover:bg-stone-50'
                }`}
              >
                Layers
              </button>
              <button
                onClick={() => setActiveTab('shape')}
                className={`py-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'shape'
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-stone-600 hover:bg-stone-50'
                }`}
              >
                Shape Settings
              </button>
            </div>

            {/* TAB 1: LAYERS ASSISTANT */}
            {activeTab === 'layers' && (
              <div className="p-5 space-y-6 max-h-[620px] overflow-y-auto">
                
                {/* Build Progress Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleMarkBuilt(currentLayer)}
                    className={`flex-1 py-2 font-bold text-xs transition-colors cursor-pointer text-white shadow-xs ${
                      builtLayers.has(currentLayer) ? 'bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    {builtLayers.has(currentLayer) ? '✓ Layer Marked Built' : 'Mark Built'}
                  </button>
                  <button
                    onClick={nextLayer}
                    className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 font-bold text-xs text-stone-800 transition-colors cursor-pointer"
                  >
                    Next Layer ▶
                  </button>
                  <button
                    onClick={() => setBuiltLayers(new Set())}
                    className="px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 font-bold text-xs text-stone-600 transition-colors cursor-pointer"
                    title="Reset built progress"
                  >
                    ↺ Reset
                  </button>
                </div>

                {/* Layer Matrix Checkbox Grid */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-stone-700">
                    <span>Built Layers Matrix:</span>
                    <span className="text-orange-600 font-mono">Layer {currentLayer + 1} / {model.height}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 p-2 bg-stone-50 border border-stone-200 max-h-40 overflow-y-auto">
                    {Array.from({ length: model.height }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentLayer(idx)}
                        className={`p-1.5 text-xs font-bold border transition-colors flex items-center justify-between cursor-pointer ${
                          currentLayer === idx
                            ? 'bg-blue-600 text-white border-blue-700'
                            : builtLayers.has(idx)
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        <span>{idx + 1}</span>
                        {builtLayers.has(idx) && <span className="text-[10px]">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Layer Slider */}
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

                {/* View Mode */}
                <div className="space-y-2 pt-2 border-t border-stone-200">
                  <label className="text-xs font-bold text-slate-800 block">
                    View Mode
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                    {(['3d', '2d', 'both'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`py-1.5 border transition-colors cursor-pointer uppercase ${
                          viewMode === mode
                            ? 'bg-blue-600 text-white border-blue-700'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {mode === 'both' ? '3D + 2D' : mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 block">
                    Color Palette
                  </label>
                  <select
                    value={palette}
                    onChange={(e) => setPalette(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 p-2 text-xs font-semibold text-slate-800"
                  >
                    <option value="okabeIto">Okabe-Ito (Colorblind Accessible)</option>
                    <option value="minecraftWool">Classic Minecraft Wool Colors</option>
                    <option value="cyberRainbow">Cyber Rainbow</option>
                    <option value="slateBlueprint">Slate Blueprint</option>
                  </select>
                </div>

                {/* Checkboxes */}
                <div className="space-y-2.5 pt-2 border-t border-stone-200 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={colorCurrentLayerOnly}
                      onChange={(e) => setColorCurrentLayerOnly(e.target.checked)}
                      className="rounded-none accent-orange-500"
                    />
                    <span>Color Current Layer Only (Highlight Active)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showOnionSkin}
                      onChange={(e) => setShowOnionSkin(e.target.checked)}
                      className="rounded-none accent-orange-500"
                    />
                    <span>Show Previous Layer Ghosting (Onion-Skin)</span>
                  </label>
                </div>

              </div>
            )}

            {/* TAB 2: SHAPE CONFIGURATION */}
            {activeTab === 'shape' && (
              <div className="p-5 space-y-6 max-h-[620px] overflow-y-auto">
                
                {/* Shape Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
                    Shape Type
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                    {[
                      { id: 'dome', label: 'Dome (rounded)' },
                      { id: 'cone', label: 'Cone (tapered)' },
                      { id: 'sphere', label: 'Sphere' },
                      { id: 'torus', label: 'Torus (donut)' },
                      { id: 'cylinder', label: 'Cylinder' },
                      { id: 'geodesic', label: 'Geodesic Shell' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setShape(s.id as ShapeType)}
                        className={`p-2 border text-left transition-colors cursor-pointer ${
                          shape === s.id
                            ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dimensions: Diameter & Height */}
                <div className="space-y-4 pt-2 border-t border-stone-200">
                  
                  {/* Diameter */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span>Diameter: {diameter} Blocks</span>
                      <input
                        type="number"
                        min={3}
                        max={allowLargeSizes ? 256 : 64}
                        value={diameter}
                        onChange={(e) => setDiameter(Math.max(3, Number(e.target.value)))}
                        className="w-16 p-1 text-center font-mono border border-stone-300 text-xs"
                      />
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={allowLargeSizes ? 128 : 64}
                      value={diameter}
                      onChange={(e) => setDiameter(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Height */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span>Height: {height} Blocks</span>
                      <input
                        type="number"
                        min={2}
                        max={allowLargeSizes ? 256 : 64}
                        value={height}
                        onChange={(e) => setHeight(Math.max(2, Number(e.target.value)))}
                        className="w-16 p-1 text-center font-mono border border-stone-300 text-xs"
                      />
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={allowLargeSizes ? 128 : 64}
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Thickness */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span>Structure Fill:</span>
                      <span className="text-orange-600 font-bold">
                        {thickness === 0 ? 'Solid Fill' : `${thickness} Block Hollow Shell`}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 0].map((t) => (
                        <button
                          key={t}
                          onClick={() => setThickness(t)}
                          className={`flex-1 py-1 text-xs font-bold border transition-colors cursor-pointer ${
                            thickness === t
                              ? 'bg-stone-900 text-white border-stone-900'
                              : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                          }`}
                        >
                          {t === 0 ? 'Solid' : `${t} Block Hollow`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Allow large sizes toggle */}
                  <div className="bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-900 space-y-1">
                    <label className="flex items-center gap-2 font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={allowLargeSizes}
                        onChange={(e) => setAllowLargeSizes(e.target.checked)}
                        className="accent-amber-600"
                      />
                      <span>Allow sizes above 64 blocks</span>
                    </label>
                    <p className="text-[10px] text-amber-700 leading-tight">
                      ⚠️ Large diameters (100+) generate tens of thousands of voxels and may take a moment to compute.
                    </p>
                  </div>
                </div>

                {/* Symmetry Lines Section */}
                <div className="space-y-3 pt-2 border-t border-stone-200">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-900 uppercase">
                      Symmetry Lines
                    </label>
                    <input
                      type="checkbox"
                      checked={showSymmetry}
                      onChange={(e) => setShowSymmetry(e.target.checked)}
                      className="accent-blue-600"
                    />
                  </div>

                  {showSymmetry && (
                    <div className="bg-stone-50 border border-stone-200 p-3 space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>Line Count:</span>
                          <span>{lineCount}</span>
                        </div>
                        <input
                          type="range"
                          min={2}
                          max={16}
                          step={2}
                          value={lineCount}
                          onChange={(e) => setLineCount(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>Line Width (degrees):</span>
                          <span>{lineWidthDeg}°</span>
                        </div>
                        <input
                          type="range"
                          min={2}
                          max={30}
                          value={lineWidthDeg}
                          onChange={(e) => setLineWidthDeg(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>Layer Spacing:</span>
                          <span>{layerSpacing}</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={5}
                          value={layerSpacing}
                          onChange={(e) => setLayerSpacing(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>Rotation (degrees):</span>
                          <span>{rotationDeg}°</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={360}
                          step={5}
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

          </div>

        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-stone-900 max-w-lg w-full p-6 space-y-5 shadow-xl">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Export Minecraft Build Plan</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p>
                <strong>Structure:</strong> {shape.toUpperCase()} ({diameter}x{actualDiameterZ}, Height: {height})
              </p>
              <p>
                <strong>Total Blocks:</strong> {model.totalBlocks} ({totalStacks} Stacks + {remainingBlocks} Blocks)
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleExportText}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase transition-colors cursor-pointer"
                >
                  {copiedText || 'Copy Text Layer-by-Layer Guide 📋'}
                </button>
                <button
                  onClick={() => window.print()}
                  className="w-full py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 font-bold text-xs text-stone-800 transition-colors cursor-pointer"
                >
                  Print Printable Blueprint 🖨️
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
