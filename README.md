# ❖ Minecraft Dome Generator & 3D Voxel Blueprint Slicer

> Free, fast, 100% client-side 3D voxel shape generator and 2D layer-by-layer blueprint slicer for Minecraft Java & Bedrock Edition builders.

**Live Domain:** [https://minecraftdomegenerator.cyou](https://minecraftdomegenerator.cyou)

---

## 🌟 Key Features

- **⚡ 100% Client-Side WebGL:** Zero server lag. High-speed instanced voxel rendering with 360° free orbit and responsive controls for builds up to 256+ blocks.
- **📐 2D Layer-by-Layer Slicer:** Isolated zoom, drag-to-pan, layer tracker, onion-skin ghosting of lower layers, and multi-angle projections (Top, Front, Side).
- **🏗️ 6 Voxel Architectural Primitives:**
  - **Dome (rounded):** Hemisphere roof layer blueprints, glass biospheres, observatory caps.
  - **Sphere (3D):** Perfect voxel spheres and hollow ellipsoids.
  - **Cone (tapered):** Wizard tower spires, tapered roofs, volcano slopes.
  - **Circle (2D):** Precise pixel circle charts (even & odd centers).
  - **Torus (ring):** Donut rings, space station arches, portal conduits.
  - **Geodesic Dome:** Triangular strut structural frameworks for botanical greenhouses.
- **🧱 Survival Material Calculator:** Live block stack counter and Shulker box estimates.
- **🌓 Light & Dark Theme:** Clean, high-contrast light mode default with seamless dark mode toggling.
- **📱 Fully Responsive:** Works on desktop, tablet, and mobile devices as a second-screen building companion.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language:** TypeScript
- **3D Graphics:** Three.js / WebGL (InstancedMesh, zero-idle render loop)
- **Styling:** Tailwind CSS + Theme Tokens
- **Icons:** Lucide React

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/AbbasGawali/MinecraftDomeGenerator.git
cd MinecraftDomeGenerator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 4. Build for production
```bash
npm run build
```

---

## 📄 License & Disclaimer

Minecraft is a registered trademark of Mojang Synergies AB / Microsoft. This project is an independent open-source tool for Minecraft builders.
