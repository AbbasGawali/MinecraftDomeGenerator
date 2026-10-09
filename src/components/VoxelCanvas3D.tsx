'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { VoxelModel } from '@/lib/voxelEngine';
import { useTheme } from '@/context/ThemeContext';

interface Props {
  model: VoxelModel;
  currentLayer: number;
  renderMode: 'all' | 'upToCurrent' | 'currentOnly';
}

export default function VoxelCanvas3D({ model, currentLayer, renderMode }: Props) {
  const { theme } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const instancedMeshRef = useRef<THREE.InstancedMesh | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);
  const isNeedsRenderRef = useRef<boolean>(true);
  const animFrameRef = useRef<number | null>(null);

  // Orbit Controller State
  const ctrlRef = useRef({
    isDragging: false,
    isPanning: false,
    prevX: 0,
    prevY: 0,
    theta: Math.PI / 4,
    phi: Math.PI / 3.2,
    radius: 45,
    target: new THREE.Vector3(0, 0, 0),
    targetTheta: Math.PI / 4,
    targetPhi: Math.PI / 3.2,
    targetRadius: 45,
    targetCenter: new THREE.Vector3(0, 0, 0),
  });

  // 1. ONE-TIME Three.js Initialization (Zero leaks)
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(theme === 'dark' ? '#14181d' : '#ffffff');
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 1000);
    cameraRef.current = camera;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'mediump',
      preserveDrawingBuffer: false,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const headlight = new THREE.DirectionalLight(0xffffff, 0.45);
    headlight.position.set(0, 0, 1);
    camera.add(headlight);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.3);
    topLight.position.set(20, 50, 20);
    scene.add(topLight);

    // Dynamic grid helper
    const grid = new THREE.GridHelper(
      60,
      60,
      theme === 'dark' ? 0x3b4450 : 0x94a3b8,
      theme === 'dark' ? 0x21272f : 0xe2e8f0
    );
    grid.position.y = -0.5;
    scene.add(grid);
    gridHelperRef.current = grid;

    const ctrl = ctrlRef.current;

    const requestRender = () => {
      isNeedsRenderRef.current = true;
    };

    // Mouse & Touch Orbit Controls
    const onPointerDown = (e: PointerEvent) => {
      ctrl.isDragging = true;
      ctrl.isPanning = e.button === 2 || e.shiftKey;
      ctrl.prevX = e.clientX;
      ctrl.prevY = e.clientY;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      requestRender();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!ctrl.isDragging) return;
      const dx = e.clientX - ctrl.prevX;
      const dy = e.clientY - ctrl.prevY;
      ctrl.prevX = e.clientX;
      ctrl.prevY = e.clientY;

      if (ctrl.isPanning) {
        const panSpeed = ctrl.radius * 0.0015;
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
        ctrl.targetCenter.addScaledVector(right, -dx * panSpeed);
        ctrl.targetCenter.y += dy * panSpeed;
      } else {
        ctrl.targetTheta -= dx * 0.008;
        ctrl.targetPhi = Math.max(0.02, Math.min(Math.PI - 0.05, ctrl.targetPhi - dy * 0.008));
      }
      requestRender();
    };

    const onPointerUp = (e: PointerEvent) => {
      ctrl.isDragging = false;
      ctrl.isPanning = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY > 0 ? 1.12 : 0.89;
      ctrl.targetRadius = Math.max(4, Math.min(350, ctrl.targetRadius * zoomFactor));
      requestRender();
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('pointercancel', onPointerUp);
    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('contextmenu', (e) => e.preventDefault());

    // Intelligent Render Loop (Zero CPU when idle)
    let idleFrames = 0;
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      const damp = 0.16;
      const diffTheta = Math.abs(ctrl.targetTheta - ctrl.theta);
      const diffPhi = Math.abs(ctrl.targetPhi - ctrl.phi);
      const diffRadius = Math.abs(ctrl.targetRadius - ctrl.radius);
      const diffCenter = ctrl.target.distanceTo(ctrl.targetCenter);

      const isMoving = diffTheta > 0.0005 || diffPhi > 0.0005 || diffRadius > 0.01 || diffCenter > 0.01;

      if (isMoving || isNeedsRenderRef.current || idleFrames < 5) {
        ctrl.theta += (ctrl.targetTheta - ctrl.theta) * damp;
        ctrl.phi += (ctrl.targetPhi - ctrl.phi) * damp;
        ctrl.radius += (ctrl.targetRadius - ctrl.radius) * damp;
        ctrl.target.lerp(ctrl.targetCenter, damp);

        camera.position.x = ctrl.target.x + ctrl.radius * Math.sin(ctrl.phi) * Math.sin(ctrl.theta);
        camera.position.y = ctrl.target.y + ctrl.radius * Math.cos(ctrl.phi);
        camera.position.z = ctrl.target.z + ctrl.radius * Math.sin(ctrl.phi) * Math.cos(ctrl.theta);
        camera.lookAt(ctrl.target);

        renderer.render(scene, camera);

        if (!isMoving) {
          idleFrames++;
          isNeedsRenderRef.current = false;
        } else {
          idleFrames = 0;
        }
      }
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      requestRender();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('pointercancel', onPointerUp);
      dom.removeEventListener('wheel', onWheel);
      renderer.dispose();
    };
  }, []);

  // 2. React to Theme Changes (Light vs Dark)
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    scene.background = new THREE.Color(theme === 'dark' ? '#14181d' : '#ffffff');

    if (gridHelperRef.current) {
      scene.remove(gridHelperRef.current);
      gridHelperRef.current.geometry.dispose();
      const maxDim = Math.max(model.diameterX, model.diameterZ, 30);
      const gridSize = Math.ceil(maxDim * 1.6);
      const newGrid = new THREE.GridHelper(
        gridSize,
        gridSize,
        theme === 'dark' ? 0x3b4450 : 0x94a3b8,
        theme === 'dark' ? 0x21272f : 0xe2e8f0
      );
      newGrid.position.y = -0.5;
      scene.add(newGrid);
      gridHelperRef.current = newGrid;
    }

    isNeedsRenderRef.current = true;
  }, [theme]);

  // 3. Camera Fit
  useEffect(() => {
    const ctrl = ctrlRef.current;
    const modelHeight = model.height || 15;
    const initialRadius = Math.max(model.diameterX, model.diameterZ, modelHeight) * 2.2 + 8;
    ctrl.targetRadius = initialRadius;
    ctrl.targetCenter.set(0, modelHeight * 0.4, 0);

    const scene = sceneRef.current;
    if (scene && gridHelperRef.current) {
      scene.remove(gridHelperRef.current);
      gridHelperRef.current.geometry.dispose();
      const maxDim = Math.max(model.diameterX, model.diameterZ, 30);
      const gridSize = Math.ceil(maxDim * 1.6);
      const newGrid = new THREE.GridHelper(
        gridSize,
        gridSize,
        theme === 'dark' ? 0x3b4450 : 0x94a3b8,
        theme === 'dark' ? 0x21272f : 0xe2e8f0
      );
      newGrid.position.y = -0.5;
      scene.add(newGrid);
      gridHelperRef.current = newGrid;
    }

    isNeedsRenderRef.current = true;
  }, [model.diameterX, model.diameterZ, model.height]);

  // 4. Fast InstancedMesh Update
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (instancedMeshRef.current) {
      scene.remove(instancedMeshRef.current);
      instancedMeshRef.current.geometry.dispose();
      (instancedMeshRef.current.material as THREE.Material).dispose();
      instancedMeshRef.current = null;
    }

    let activeVoxels = model.voxels;
    if (renderMode === 'upToCurrent') {
      activeVoxels = model.voxels.filter((v) => v.y <= currentLayer);
    } else if (renderMode === 'currentOnly') {
      activeVoxels = model.voxels.filter((v) => v.y === currentLayer);
    }

    if (activeVoxels.length === 0) {
      isNeedsRenderRef.current = true;
      return;
    }

    const boxGeo = new THREE.BoxGeometry(0.94, 0.94, 0.94);
    const boxMat = new THREE.MeshLambertMaterial({ vertexColors: false });

    const instancedMesh = new THREE.InstancedMesh(boxGeo, boxMat, activeVoxels.length);
    instancedMesh.name = 'voxelMesh';

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    for (let i = 0; i < activeVoxels.length; i++) {
      const voxel = activeVoxels[i];
      dummy.position.set(voxel.x, voxel.y, voxel.z);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);

      color.set(voxel.color);
      instancedMesh.setColorAt(i, color);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;

    scene.add(instancedMesh);
    instancedMeshRef.current = instancedMesh;
    isNeedsRenderRef.current = true;
  }, [model, currentLayer, renderMode]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-[var(--panel-bg)] rounded-xl border border-[var(--border-color)] overflow-hidden flex flex-col shadow-inner transition-colors">
      <div
        ref={mountRef}
        className="w-full h-full flex-1 cursor-grab active:cursor-grabbing select-none touch-none"
        title="Left click + drag to rotate 360° • Right click + drag to pan • Scroll to zoom"
      />

      {/* Floating HUD */}
      <div className="absolute bottom-3 left-3 bg-[var(--card-bg)]/90 backdrop-blur-md px-3 py-1.5 rounded-sm border border-[var(--border-color)] text-[11px] font-semibold text-[var(--text-color)] pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span>Drag 360° • Scroll to zoom</span>
      </div>

      <div className="absolute top-3 right-3 bg-[var(--card-bg)]/90 backdrop-blur-md px-2.5 py-1 rounded-sm border border-[var(--border-color)] text-[11px] font-mono font-bold text-emerald-500 pointer-events-none">
        {model.totalBlocks.toLocaleString()} blocks
      </div>
    </div>
  );
}
