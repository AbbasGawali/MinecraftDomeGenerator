'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { VoxelModel } from '@/lib/voxelEngine';

interface Props {
  model: VoxelModel;
  currentLayer: number;
  renderMode: 'all' | 'upToCurrent' | 'currentOnly';
  showGrid: boolean;
}

export default function VoxelCanvas3D({ model, currentLayer, renderMode, showGrid }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<{ isDragging: boolean; prevX: number; prevY: number; theta: number; phi: number; radius: number; target: THREE.Vector3 }>({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    theta: Math.PI / 4,
    phi: Math.PI / 3,
    radius: 40,
    target: new THREE.Vector3(0, 0, 0),
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#ffffff');
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight1.position.set(50, 80, 50);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.35);
    dirLight2.position.set(-50, 40, -50);
    scene.add(dirLight2);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(Math.max(model.diameterX, model.diameterZ) * 2 + 10, Math.max(model.diameterX, model.diameterZ) * 2 + 10, 0xd1d5db, 0xe5e7eb);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    // Orbit Controls (Pure custom implementation for reliability)
    const ctrl = controlsRef.current;
    ctrl.radius = Math.max(model.diameterX, model.diameterZ, model.height) * 2.5 + 10;
    ctrl.target.set(0, model.height / 2, 0);

    const updateCamera = () => {
      camera.position.x = ctrl.target.x + ctrl.radius * Math.sin(ctrl.phi) * Math.sin(ctrl.theta);
      camera.position.y = ctrl.target.y + ctrl.radius * Math.cos(ctrl.phi);
      camera.position.z = ctrl.target.z + ctrl.radius * Math.sin(ctrl.phi) * Math.cos(ctrl.theta);
      camera.lookAt(ctrl.target);
    };
    updateCamera();

    const onMouseDown = (e: MouseEvent) => {
      ctrl.isDragging = true;
      ctrl.prevX = e.clientX;
      ctrl.prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!ctrl.isDragging) return;
      const dx = e.clientX - ctrl.prevX;
      const dy = e.clientY - ctrl.prevY;
      ctrl.prevX = e.clientX;
      ctrl.prevY = e.clientY;

      if (e.buttons === 1) {
        // Left click: Rotate
        ctrl.theta -= dx * 0.01;
        ctrl.phi = Math.max(0.05, Math.min(Math.PI / 2 - 0.01, ctrl.phi - dy * 0.01));
      } else if (e.buttons === 2) {
        // Right click: Pan
        const panSpeed = 0.05;
        ctrl.target.y += dy * panSpeed;
      }
      updateCamera();
    };

    const onMouseUp = () => {
      ctrl.isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      ctrl.radius = Math.max(5, Math.min(250, ctrl.radius + e.deltaY * 0.05));
      updateCamera();
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('contextmenu', (e) => e.preventDefault());

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [model.diameterX, model.diameterZ, model.height]);

  // Update Voxels in Scene
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove previous mesh
    const existing = scene.getObjectByName('voxelMesh');
    if (existing) scene.remove(existing);

    // Filter voxels based on currentLayer and renderMode
    let activeVoxels = model.voxels;
    if (renderMode === 'upToCurrent') {
      activeVoxels = model.voxels.filter((v) => v.y <= currentLayer);
    } else if (renderMode === 'currentOnly') {
      activeVoxels = model.voxels.filter((v) => v.y === currentLayer);
    }

    if (activeVoxels.length === 0) return;

    // High performance InstancedMesh
    const boxGeo = new THREE.BoxGeometry(0.96, 0.96, 0.96);
    const boxMat = new THREE.MeshLambertMaterial({ vertexColors: false });
    const instancedMesh = new THREE.InstancedMesh(boxGeo, boxMat, activeVoxels.length);
    instancedMesh.name = 'voxelMesh';

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    activeVoxels.forEach((voxel, i) => {
      dummy.position.set(voxel.x, voxel.y, voxel.z);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);

      // Current active layer highlight
      if (voxel.y === currentLayer) {
        color.set(voxel.color);
      } else {
        // Subtly dim lower layers for depth
        color.set(voxel.color).multiplyScalar(0.85);
      }
      instancedMesh.setColorAt(i, color);
    });

    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;

    scene.add(instancedMesh);
  }, [model, currentLayer, renderMode]);

  return (
    <div className="relative w-full h-full min-h-[380px] bg-white border border-stone-300">
      <div ref={mountRef} className="w-full h-full min-h-[380px] cursor-grab active:cursor-grabbing" />
      
      {/* 3D View Helper Badges */}
      <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 border border-stone-700 pointer-events-none">
        3D Interactive View • {model.totalBlocks} Blocks
      </div>

      <div className="absolute bottom-3 left-3 text-[10px] text-stone-500 bg-white/90 px-2 py-0.5 border border-stone-200 pointer-events-none">
        Left-Click: Rotate • Right-Click: Pan • Scroll: Zoom
      </div>
    </div>
  );
}
