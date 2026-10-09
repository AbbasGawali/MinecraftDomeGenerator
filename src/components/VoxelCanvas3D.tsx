'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { VoxelModel } from '@/lib/voxelEngine';

interface Props {
  model: VoxelModel;
  currentLayer: number;
  renderMode: 'all' | 'upToCurrent' | 'currentOnly';
  showGrid?: boolean;
}

export default function VoxelCanvas3D({ model, currentLayer, renderMode }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Smooth Orbit Controller state with inertia damping
  const ctrlRef = useRef({
    isDragging: false,
    isPanning: false,
    prevX: 0,
    prevY: 0,
    theta: Math.PI / 4,
    phi: Math.PI / 3.2,
    radius: 45,
    target: new THREE.Vector3(0, 0, 0),
    // Target values for smooth interpolation
    targetTheta: Math.PI / 4,
    targetPhi: Math.PI / 3.2,
    targetRadius: 45,
    targetCenter: new THREE.Vector3(0, 0, 0),
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#ffffff');
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 1000);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing and high DPR
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting for crisp voxel contrast
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xdfe3e8, 0.7);
    scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.75);
    dirLight1.position.set(60, 100, 60);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight2.position.set(-60, 40, -60);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0xffffff, 0.25);
    dirLight3.position.set(0, -50, 0); // Subtle under-lighting for 360 underside view
    scene.add(dirLight3);

    // 5. Clean minimalist ground grid
    const maxDim = Math.max(model.diameterX, model.diameterZ, 30);
    const gridSize = Math.ceil(maxDim * 1.6);
    const gridHelper = new THREE.GridHelper(gridSize, gridSize, 0x94a3b8, 0xe2e8f0);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    // 6. Camera distance and center calculations
    const ctrl = ctrlRef.current;
    const modelHeight = model.height || 15;
    const initialRadius = Math.max(model.diameterX, model.diameterZ, modelHeight) * 2.2 + 8;
    ctrl.radius = initialRadius;
    ctrl.targetRadius = initialRadius;
    ctrl.targetCenter.set(0, modelHeight * 0.4, 0);
    ctrl.target.copy(ctrl.targetCenter);

    // 7. Mouse & Touch Interaction with full 360-degree orbit
    const onPointerDown = (e: PointerEvent) => {
      ctrl.isDragging = true;
      ctrl.isPanning = e.button === 2 || e.shiftKey;
      ctrl.prevX = e.clientX;
      ctrl.prevY = e.clientY;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!ctrl.isDragging) return;
      const dx = e.clientX - ctrl.prevX;
      const dy = e.clientY - ctrl.prevY;
      ctrl.prevX = e.clientX;
      ctrl.prevY = e.clientY;

      if (ctrl.isPanning) {
        // Pan Target
        const panSpeed = ctrl.radius * 0.0015;
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
        ctrl.targetCenter.addScaledVector(right, -dx * panSpeed);
        ctrl.targetCenter.y += dy * panSpeed;
      } else {
        // Full 360-degree Orbit (No artificial ceiling clamp)
        ctrl.targetTheta -= dx * 0.008;
        // Allows viewing from straight top (0.02) to under the base (Math.PI - 0.05)
        ctrl.targetPhi = Math.max(0.02, Math.min(Math.PI - 0.05, ctrl.targetPhi - dy * 0.008));
      }
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
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('pointercancel', onPointerUp);
    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('contextmenu', (e) => e.preventDefault());

    // 8. Animation loop with buttery smooth damping (lerp)
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      // Smooth interpolation
      const damp = 0.12;
      ctrl.theta += (ctrl.targetTheta - ctrl.theta) * damp;
      ctrl.phi += (ctrl.targetPhi - ctrl.phi) * damp;
      ctrl.radius += (ctrl.targetRadius - ctrl.radius) * damp;
      ctrl.target.lerp(ctrl.targetCenter, damp);

      // Spherical to Cartesian coordinate transformation
      camera.position.x = ctrl.target.x + ctrl.radius * Math.sin(ctrl.phi) * Math.sin(ctrl.theta);
      camera.position.y = ctrl.target.y + ctrl.radius * Math.cos(ctrl.phi);
      camera.position.z = ctrl.target.z + ctrl.radius * Math.sin(ctrl.phi) * Math.cos(ctrl.theta);
      camera.lookAt(ctrl.target);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
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
  }, [model.diameterX, model.diameterZ, model.height]);

  // 9. Voxel Mesh Generation with Clean Beveled Edges
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clear old mesh
    const existing = scene.getObjectByName('voxelMesh');
    if (existing) scene.remove(existing);

    // Filter active voxels
    let activeVoxels = model.voxels;
    if (renderMode === 'upToCurrent') {
      activeVoxels = model.voxels.filter((v) => v.y <= currentLayer);
    } else if (renderMode === 'currentOnly') {
      activeVoxels = model.voxels.filter((v) => v.y === currentLayer);
    }

    if (activeVoxels.length === 0) return;

    // InstancedMesh with clean BoxGeometry (0.95 unit size provides sharp 3D voxel grid seams)
    const boxGeo = new THREE.BoxGeometry(0.95, 0.95, 0.95);
    const boxMat = new THREE.MeshLambertMaterial({
      vertexColors: false,
      reflectivity: 0.2,
    });

    const instancedMesh = new THREE.InstancedMesh(boxGeo, boxMat, activeVoxels.length);
    instancedMesh.name = 'voxelMesh';

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    activeVoxels.forEach((voxel, i) => {
      dummy.position.set(voxel.x, voxel.y, voxel.z);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);

      color.set(voxel.color);

      // Highlight active layer slightly
      if (voxel.y === currentLayer) {
        color.offsetHSL(0, 0, 0.05);
      }
      instancedMesh.setColorAt(i, color);
    });

    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;

    scene.add(instancedMesh);
  }, [model, currentLayer, renderMode]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden flex flex-col">
      <div
        ref={mountRef}
        className="w-full h-full flex-1 cursor-grab active:cursor-grabbing select-none touch-none"
        title="Left click + drag to rotate 360° • Right click + drag to pan • Scroll to zoom"
      />

      {/* Floating Minimalist 3D HUD */}
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-200 text-[11px] font-medium text-slate-600 shadow-2xs pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Drag to orbit 360° • Scroll to zoom</span>
      </div>

      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-200 text-[11px] font-semibold text-slate-700 shadow-2xs pointer-events-none">
        {model.totalBlocks.toLocaleString()} voxels
      </div>
    </div>
  );
}
