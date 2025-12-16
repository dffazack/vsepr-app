import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Settings, RefreshCw, Info, RotateCw, Play, Pause, ChevronLeft } from 'lucide-react';

// Constants
const ELEMENT_COLORS = {
    C: 0x2d3748, // Carbon - Black/Dark Grey
    N: 0x3b82f6, // Nitrogen - Blue
    O: 0xef4444, // Oxygen - Red
    S: 0xeab308, // Sulfur - Yellow
    P: 0xf97316, // Phosphorus - Orange
    H: 0xffffff, // Hydrogen - White
    Cl: 0x10b981, // Chlorine - Green
    F: 0x84cc16, // Fluorine - Lime Green
    B: 0xf472b6, // Boron - Pink/Rose
    X: 0x9ca3af, // Generic - Grey
    LonePair: 0xfecaca // Lone Pair - Light Red/Pink
};

const BOND_LENGTH = 1.8;

const PRESETS = [
    { formula: 'CH4', central: 'C', bonded: 4, lone: 0 },
    { formula: 'H2O', central: 'O', bonded: 2, lone: 2 },
    { formula: 'NH3', central: 'N', bonded: 3, lone: 1 },
    { formula: 'CO2', central: 'C', bonded: 2, lone: 0 },
    { formula: 'BF3', central: 'B', bonded: 3, lone: 0 },
    { formula: 'SF6', central: 'S', bonded: 6, lone: 0 },
    { formula: 'PCl5', central: 'P', bonded: 5, lone: 0 },
    { formula: 'ClF3', central: 'Cl', bonded: 3, lone: 2 },
    { formula: 'XeF4', central: 'X', bonded: 4, lone: 2 },
    { formula: 'SF4', central: 'S', bonded: 4, lone: 1 },
];

const SimulationModule = ({ onBack }) => {
    const mountRef = useRef(null);
    const [molecule, setMolecule] = useState(PRESETS[0]);
    const [viewSettings, setViewSettings] = useState({
        showLonePairs: true,
        autoRotate: true,
        rotationSpeed: 1
    });

    // Three.js refs
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const controlsRef = useRef(null);
    const frameIdRef = useRef(null);
    const moleculeGroupRef = useRef(null);

    // Initialize Three.js
    useEffect(() => {
        if (!mountRef.current) return;
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f172a); // Slate-900
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 2, 8);
        cameraRef.current = camera;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(5, 5, 5);
        scene.add(mainLight);

        const backLight = new THREE.DirectionalLight(0x4f46e5, 0.5); // Purpleish back light
        backLight.position.set(-5, 0, -5);
        scene.add(backLight);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controlsRef.current = controls;

        // Molecule Group
        const group = new THREE.Group();
        scene.add(group);
        moleculeGroupRef.current = group;

        // Resize handler using ResizeObserver (More robust for flex layouts)
        // Resize handler using ResizeObserver (More robust for flex layouts)
        const handleResize = (entries) => {
            const width = entries && entries[0] ? entries[0].contentRect.width : mountRef.current?.clientWidth;
            const height = entries && entries[0] ? entries[0].contentRect.height : mountRef.current?.clientHeight;

            if (renderer && camera && width > 0 && height > 0) {
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(mountRef.current);

        // Force initial resize
        setTimeout(() => handleResize([]), 100);

        // Animation Loop
        const animate = () => {
            frameIdRef.current = requestAnimationFrame(animate);
            if (controlsRef.current) controlsRef.current.update();

            if (viewSettings.autoRotate && moleculeGroupRef.current) {
                moleculeGroupRef.current.rotation.y += 0.005 * viewSettings.rotationSpeed;
            }

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(frameIdRef.current);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []); // Run once on mount

    // Update Molecule
    useEffect(() => {
        if (!moleculeGroupRef.current) return;

        // Clear previous
        while (moleculeGroupRef.current.children.length > 0) {
            const child = moleculeGroupRef.current.children[0];
            moleculeGroupRef.current.remove(child);
            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();
        }

        generateMoleculeDisplay();
    }, [molecule, viewSettings.showLonePairs]);

    // Helper to get unit vectors for domains based on VSEPR shapes
    const getVSEPRPositions = (count) => {
        const positions = [];
        // Basic static geometries
        if (count === 2) { // Linear
            positions.push(new THREE.Vector3(1, 0, 0));
            positions.push(new THREE.Vector3(-1, 0, 0));
        } else if (count === 3) { // Trigonal Planar
            for (let i = 0; i < 3; i++) {
                const angle = (i / 3) * Math.PI * 2;
                positions.push(new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0));
            }
        } else if (count === 4) { // Tetrahedral
            // Vertices of a tetrahedron
            const a = 1 / Math.sqrt(3);
            positions.push(new THREE.Vector3(a, a, a));
            positions.push(new THREE.Vector3(-a, -a, a));
            positions.push(new THREE.Vector3(-a, a, -a));
            positions.push(new THREE.Vector3(a, -a, -a));
        } else if (count === 5) { // Trigonal Bipyramidal
            // 3 Equatorial
            for (let i = 0; i < 3; i++) {
                const angle = (i / 3) * Math.PI * 2;
                positions.push(new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)));
            }
            // 2 Axial
            positions.push(new THREE.Vector3(0, 1, 0));
            positions.push(new THREE.Vector3(0, -1, 0));
        } else if (count === 6) { // Octahedral
            positions.push(new THREE.Vector3(1, 0, 0));
            positions.push(new THREE.Vector3(-1, 0, 0));
            positions.push(new THREE.Vector3(0, 1, 0));
            positions.push(new THREE.Vector3(0, -1, 0));
            positions.push(new THREE.Vector3(0, 0, 1));
            positions.push(new THREE.Vector3(0, 0, -1));
        } else {
            // Fallback for 1 or other, just put at +X
            positions.push(new THREE.Vector3(1, 0, 0));
        }
        return positions;
    };

    const assignSlots = (total, bonded, lone) => {
        const slots = new Array(total).fill('B');

        if (total === 5) {
            // Indices 0,1,2 are equatorial (preferred for LP)
            // Indices 3,4 are axial
            const equatorial = [0, 1, 2];
            const axial = [3, 4];

            let lonesToPlace = lone;

            // Prioritize equatorial for Lone Pairs
            while (lonesToPlace > 0 && equatorial.length > 0) {
                slots[equatorial.shift()] = 'L';
                lonesToPlace--;
            }
            while (lonesToPlace > 0 && axial.length > 0) {
                slots[axial.shift()] = 'L';
                lonesToPlace--;
            }
        } else if (total === 6) {
            // Octahedral
            if (lone >= 1) slots[4] = 'L'; // +Z (top)
            if (lone >= 2) slots[5] = 'L'; // -Z (bottom) - keep them far apart
        } else if (total === 3 || total === 4) {
            // Equivalent positions
            for (let i = 0; i < lone; i++) slots[i] = 'L';
        }
        return slots;
    };

    const generateMoleculeDisplay = () => {
        const group = moleculeGroupRef.current;
        const { central, bonded, lone } = molecule;
        const totalDomains = bonded + lone;

        // Central Atom
        const centralGeo = new THREE.SphereGeometry(0.5, 32, 32);
        const centralMat = new THREE.MeshStandardMaterial({
            color: ELEMENT_COLORS[central] || 0x9ca3af,
            roughness: 0.3,
            metalness: 0.3
        });
        const centralMesh = new THREE.Mesh(centralGeo, centralMat);
        group.add(centralMesh);

        // Calculate Positions
        const positions = getVSEPRPositions(totalDomains);
        const slotTypes = assignSlots(totalDomains, bonded, lone);

        slotTypes.forEach((type, idx) => {
            if (!positions[idx]) return;
            const pos = positions[idx].clone().normalize();

            if (type === 'B') {
                // Bonded Atom
                const atomGeo = new THREE.SphereGeometry(0.35, 32, 32);
                const atomMat = new THREE.MeshStandardMaterial({
                    color: ELEMENT_COLORS['X'], // Default grey for bonded terminal atoms
                    roughness: 0.5
                });
                const atomMesh = new THREE.Mesh(atomGeo, atomMat);
                atomMesh.position.copy(pos).multiplyScalar(BOND_LENGTH);
                group.add(atomMesh);

                // Bond Cylinder
                const start = new THREE.Vector3(0, 0, 0);
                const end = atomMesh.position.clone();
                const bondMesh = createBond(start, end);
                group.add(bondMesh);

            } else if (type === 'L' && viewSettings.showLonePairs) {
                // Lone Pair Lobe
                const lobeGeo = new THREE.CapsuleGeometry(0.2, 0.4, 4, 16).translate(0, 0.2, 0); // Offset to start from center
                // Note: CapsuleGeometry might not be in older Three versions, use Sphere/Cylinder combo if fails. 
                // Creating a custom lobe shape
                // Let's use Sphere scaled
                const lobeShapeGeo = new THREE.SphereGeometry(0.3, 32, 32);
                lobeShapeGeo.scale(0.8, 1.2, 0.8);
                lobeShapeGeo.translate(0, 0.4, 0); // Shift away

                const lobeMat = new THREE.MeshStandardMaterial({
                    color: ELEMENT_COLORS.LonePair,
                    transparent: true,
                    opacity: 0.5,
                    roughness: 0.1,
                    metalness: 0
                });
                const lobeMesh = new THREE.Mesh(lobeShapeGeo, lobeMat);

                // Align to direction
                const target = pos.clone().add(new THREE.Vector3(0, 0, 0)); // relative to 0,0,0
                lobeMesh.lookAt(target);
                // Rotate to align Y axis to target
                lobeMesh.rotateX(Math.PI / 2);

                // Actually lookAt works by pointing +Z to target. If our geometry is Y-up, we need to rotate.
                // Alternative: just use a container
                const lobeContainer = new THREE.Object3D();
                lobeContainer.lookAt(pos);
                // The container's +Z points to pos.
                // If we add child, we need to orient it correctly.

                // Let's keep it simple: Position it
                lobeMesh.position.set(0, 0, 0);
                lobeMesh.lookAt(pos);
                // Now +Z of mesh points to pos. 
                // If geometry is translated +Z, it works.
                // My geometry translate(0, 0.4, 0) is +Y.
                lobeMesh.rotateX(Math.PI / 2); // Now +Y becomes +Z

                group.add(lobeMesh);
            }
        });
    };

    const createBond = (start, end) => {
        const distance = start.distanceTo(end);
        const position = end.clone().add(start).multiplyScalar(0.5);
        // Cylinder height corresponds to Y axis
        const cylinder = new THREE.CylinderGeometry(0.08, 0.08, distance, 12);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
        const mesh = new THREE.Mesh(cylinder, material);
        mesh.position.copy(position);
        mesh.lookAt(end);
        mesh.rotateX(-Math.PI / 2); // Rotate so Y aligns with Z (LookAt direction)
        return mesh;
    };


    return (
        <div className="flex flex-col md:flex-row h-screen bg-slate-900 text-slate-100 overflow-hidden">
            {/* Sidebar Controls */}
            <div className="w-full md:w-80 flex-shrink-0 bg-slate-800 border-r border-slate-700 p-6 flex flex-col h-full overflow-y-auto z-10 shadow-xl custom-scrollbar">
                <button onClick={onBack} className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 mb-6 transition-colors self-start">
                    <ChevronLeft size={20} />
                    <span>Kembali ke Menu</span>
                </button>

                <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
                    <Settings className="text-cyan-500" />
                    <span>Pembangun Molekul</span>
                </h2>

                {/* Presets */}
                <div className="mb-8 pl-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-3 text-left">Preset Cepat</label>
                    <div className="grid grid-cols-4 gap-2">
                        {PRESETS.map(p => (
                            <button
                                key={p.formula}
                                onClick={() => setMolecule({ ...p })}
                                className={`px-2 py-2 rounded text-sm font-mono font-bold transition-all ${molecule.formula === p.formula ? 'bg-cyan-600 text-white shadow-lg scale-105 ring-2 ring-cyan-400/50' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                            >
                                {p.formula}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Custom Builder */}
                <div className="space-y-4 mb-8 bg-slate-800/50 rounded-xl">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Parameter</label>

                    <div>
                        <span className="text-sm text-slate-300 font-medium mb-1 block">Atom Pusat</span>
                        <div className="relative">
                            <select
                                value={molecule.central}
                                onChange={(e) => setMolecule({ ...molecule, central: e.target.value, formula: 'Custom' })}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:border-cyan-500 outline-none appearance-none"
                            >
                                {Object.keys(ELEMENT_COLORS).filter(k => k.length <= 2 && k !== 'H' && k !== 'LonePair').map(el => (
                                    <option key={el} value={el}>{el}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-2.5 pointer-events-none text-slate-400">
                                <ChevronLeft size={14} className="-rotate-90" />
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <span className="text-sm text-slate-300 font-medium block mb-1">Ikatan (PEI)</span>
                            <input
                                type="number" min="1" max="6"
                                value={molecule.bonded}
                                onChange={(e) => setMolecule({ ...molecule, bonded: parseInt(e.target.value) || 1, formula: 'Custom' })}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:border-cyan-500 outline-none"
                            />
                        </div>
                        <div className="flex-1">
                            <span className="text-sm text-slate-300 font-medium block mb-1">Bebas (PEB)</span>
                            <input
                                type="number" min="0" max="3"
                                value={molecule.lone}
                                onChange={(e) => setMolecule({ ...molecule, lone: parseInt(e.target.value) || 0, formula: 'Custom' })}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:border-cyan-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600 mt-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-400">Prediksi Geometri</span>
                            <span className="text-sm font-bold text-cyan-400">AX{molecule.bonded}E{molecule.lone}</span>
                        </div>
                    </div>
                </div>

                {/* View Settings */}
                <div className="mt-auto border-t border-slate-700 pt-6">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Opsi Tampilan</label>
                    <div className="space-y-3">
                        <button
                            onClick={() => setViewSettings(s => ({ ...s, showLonePairs: !s.showLonePairs }))}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${viewSettings.showLonePairs ? 'bg-slate-700 border border-cyan-500/50' : 'bg-slate-800 border border-slate-700 hover:bg-slate-700'}`}
                        >
                            <span className="text-sm text-slate-300">Tampilkan PEB</span>
                            <div className={`w-4 h-4 rounded-sm ${viewSettings.showLonePairs ? 'bg-cyan-500' : 'bg-slate-600'}`}></div>
                        </button>

                        <button
                            onClick={() => setViewSettings(s => ({ ...s, autoRotate: !s.autoRotate }))}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${viewSettings.autoRotate ? 'bg-slate-700 border border-cyan-500/50' : 'bg-slate-800 border border-slate-700 hover:bg-slate-700'}`}
                        >
                            <span className="text-sm text-slate-300">Rotasi Otomatis</span>
                            {viewSettings.autoRotate ? <Pause size={16} className="text-cyan-400" /> : <Play size={16} className="text-slate-400" />}
                        </button>

                        <div>
                            <span className="text-xs text-slate-400 mb-1 block">Kecepatan Rotasi</span>
                            <input
                                type="range" min="0" max="5" step="0.5"
                                value={viewSettings.rotationSpeed}
                                onChange={(e) => setViewSettings(s => ({ ...s, rotationSpeed: parseFloat(e.target.value) }))}
                                className="w-full accent-cyan-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3D Canvas Area */}
            <div className="flex-1 relative bg-gradient-to-br from-slate-900 to-slate-800">
                <div ref={mountRef} className="w-full h-full cursor-move z-0" />

                {/* Overlay Info Card */}
                <div className="absolute top-6 right-6 bg-slate-800/90 backdrop-blur-md border border-slate-600 p-5 rounded-xl min-w-[240px] shadow-2xl pointer-events-none select-none">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-2xl font-bold text-white tracking-tight">{molecule.formula}</h3>
                            <span className="text-xs font-mono text-cyan-400 bg-cyan-900/30 px-2 py-0.5 rounded">AX{molecule.bonded}E{molecule.lone}</span>
                        </div>
                    </div>
                    <div className="space-y-1 text-xs text-slate-300 border-t border-slate-700 pt-2 mt-2">
                        <div className="flex justify-between">
                            <span>Total Domain:</span>
                            <span className="font-bold">{molecule.bonded + molecule.lone}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Pasangan Ikatan:</span>
                            <span className="text-slate-100">{molecule.bonded}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Pasangan Bebas:</span>
                            <span className="text-red-300">{molecule.lone}</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 left-6 text-slate-500 text-xs pointer-events-none flex items-center space-x-4">
                    <span className="flex items-center"><RotateCw size={12} className="mr-1" /> Geser untuk Putar</span>
                    <span className="flex items-center"><RefreshCw size={12} className="mr-1" /> Scroll untuk Zoom</span>
                </div>
            </div>
        </div>
    );
};

export default SimulationModule;
