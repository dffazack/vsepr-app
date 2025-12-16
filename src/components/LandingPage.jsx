import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Atom, BookOpen, FlaskConical as Flask, PenTool, Award, ChevronRight, Triangle } from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-[#050510] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden relative">

            {/* Web3 Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,138,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,138,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] opacity-50"></div>
                {/* Reduced blur radius for performance */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[60px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full bg-blend-screen blur-[60px]"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-20 border-b border-white/5 backdrop-blur-sm bg-[#050510]/80 sticky top-0">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <Atom className="text-white" size={24} />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">VSEPR.io</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Materi</a>
                        <a href="#" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Simulasi</a>
                        <div className="h-4 w-px bg-white/10"></div>
                        <button className="text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-5 py-2 rounded-full border border-white/5 transition-all">
                            Gabung Kelas
                        </button>
                    </div>
                </div>
            </nav>

            {/* 3D Content Wrapper (Underlay) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Hero3D />
                <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-[#050510] via-[#050510]/80 to-transparent pointer-events-none"></div>
            </div>

            {/* Main Content (Overlay) */}
            <div className="relative z-10 pointer-events-none">
                <section className="container mx-auto px-6 pt-32 pb-20 min-h-[90vh] flex items-center">
                    <div className="md:w-1/2 space-y-8 pointer-events-auto">
                        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-400 text-sm font-medium shadow-[0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-sm">
                            <span className="relative flex h-2 w-2 mr-1">
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Pengalaman 3D Interaktif
                        </div>

                        <h1 className="text-5xl md:text-8xl font-bold leading-tight tracking-tighter shadow-black drop-shadow-2xl">
                            Kuasai <br />
                            Geometri <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                                Molekul
                            </span>
                        </h1>

                        <p className="text-lg text-slate-300 max-w-xl leading-relaxed border-l-2 border-cyan-500/50 pl-6 backdrop-blur-sm bg-black/10 rounded-r-lg p-2">
                            Jelajahi teori VSEPR dalam lingkungan 3D yang imersif. Manipulasi atom, visualisasikan ikatan, dan pahami struktur kimia dengan cara baru.
                        </p>

                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                            <button
                                onClick={() => onNavigate('simulasi')}
                                className="group relative px-8 py-4 bg-cyan-600 rounded-xl font-bold text-white overflow-hidden shadow-[0_0_40px_rgba(8,145,178,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(8,145,178,0.6)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                <span className="relative flex items-center justify-center space-x-2">
                                    <span>Mulai Aplikasi</span>
                                    <ChevronRight size={20} />
                                </span>
                            </button>
                            <button
                                onClick={() => onNavigate('materi')}
                                className="px-8 py-4 bg-[#0F1629]/60 border border-slate-700/50 rounded-xl font-bold text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all hover:bg-slate-800/80 backdrop-blur-sm"
                            >
                                Pelajari Dasar
                            </button>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-slate-400 pt-8 backdrop-blur-sm inline-block rounded-xl pr-4">
                            <div className="flex items-center space-x-2">
                                <Flask size={16} className="text-purple-500" />
                                <span>Fisika Real-time</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Triangle size={16} className="text-cyan-500" />
                                <span>Model Akurat</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature Grid */}
                <section className="container mx-auto px-6 py-24 pointer-events-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Modul Utama</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            title="Teori & Konsep"
                            subtitle="Module 01"
                            icon={<BookOpen size={28} className="text-blue-400" />}
                            onClick={() => onNavigate('materi')}
                            delay={0}
                        />
                        <FeatureCard
                            title="Simulasi 3D"
                            subtitle="Module 02"
                            icon={<Flask size={28} className="text-emerald-400" />}
                            onClick={() => onNavigate('simulasi')}
                            active={true}
                            delay={100}
                        />
                        <FeatureCard
                            title="Latihan Interaktif"
                            subtitle="Module 03"
                            icon={<PenTool size={28} className="text-orange-400" />}
                            onClick={() => onNavigate('latihan')}
                            delay={200}
                        />
                        <FeatureCard
                            title="Kuis Akhir"
                            subtitle="Module 04"
                            icon={<Award size={28} className="text-purple-400" />}
                            onClick={() => onNavigate('kuis')}
                            delay={300}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

// Optimized 3D Component with Window Sizing
const Hero3D = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Use window dimensions instead of container dimensions for reliability
        let width = window.innerWidth;
        let height = window.innerHeight;
        let frameId;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050510, 0.04);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);

        const updateCameraPosition = () => {
            if (window.innerWidth < 768) {
                camera.position.set(0, 0, 10);
                camera.lookAt(0, 0, 0);
            } else {
                camera.position.set(-2, 0, 8);
                camera.lookAt(2, 0, 0);
            }
        };
        updateCameraPosition();

        // Removed powerPreference to avoid potential context creation failures on some devices
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0x22d3ee, 2);
        keyLight.position.set(5, 5, 5);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0xa855f7, 1);
        fillLight.position.set(-5, -5, 5);
        scene.add(fillLight);

        // Molecule
        const molecule = new THREE.Group();
        if (window.innerWidth >= 768) molecule.position.set(2.5, 0, 0);
        scene.add(molecule);

        // Standard Materials (Lightweight yet looking good)
        const atomMaterial = new THREE.MeshStandardMaterial({
            color: 0x06b6d4, // Cyan
            metalness: 0.2,
            roughness: 0.1,
            emissive: 0x06b6d4,
            emissiveIntensity: 0.4
        });

        const terminalAtomMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.0,
        });

        const bondMaterial = new THREE.MeshStandardMaterial({
            color: 0x94a3b8,
            metalness: 0.4,
            roughness: 0.4
        });

        // Geometry - High Poly for smoothness
        const centralAtom = new THREE.Mesh(new THREE.SphereGeometry(1.0, 64, 64), atomMaterial);
        molecule.add(centralAtom);

        const positions = [
            new THREE.Vector3(1, 1, 1),
            new THREE.Vector3(1, -1, -1),
            new THREE.Vector3(-1, 1, -1),
            new THREE.Vector3(-1, -1, 1),
        ];

        // Shared Geometry - Smoother
        const terminalGeo = new THREE.SphereGeometry(0.5, 32, 32);

        positions.forEach(pos => {
            pos.normalize().multiplyScalar(2.8);

            const atom = new THREE.Mesh(terminalGeo, terminalAtomMaterial);
            atom.position.copy(pos);
            molecule.add(atom);

            const distance = pos.length();
            const bondGeo = new THREE.CylinderGeometry(0.15, 0.15, distance, 32);
            const bond = new THREE.Mesh(bondGeo, bondMaterial);

            bond.position.copy(pos).multiplyScalar(0.5);
            bond.lookAt(pos);
            bond.rotateX(-Math.PI / 2);
            molecule.add(bond);
        });

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);

            if (window.innerWidth >= 768) {
                molecule.position.set(2.5, 0, 0);
                updateCameraPosition();
            } else {
                molecule.position.set(0, 0, 0);
                updateCameraPosition();
            }
        };
        window.addEventListener('resize', handleResize);

        // Render Loop
        const animate = () => {
            frameId = requestAnimationFrame(animate);

            const time = Date.now() * 0.001; // Current time in seconds

            // rotation = speed * time
            // This is stateless and guarantees continuous motion based on system clock
            molecule.rotation.y = time * 0.5;
            molecule.rotation.x = Math.sin(time * 0.5) * 0.2; // Gentle tilt
            molecule.rotation.z = Math.sin(time * 0.3) * 0.1;

            // Float
            molecule.position.y = Math.sin(time) * 0.1;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="w-full h-full" />;
};

const FeatureCard = ({ title, subtitle, icon, onClick, active, delay }) => (
    <div
        onClick={onClick}
        className={`group relative p-6 rounded-2xl border bg-[#0F1629]/80 backdrop-blur-sm cursor-pointer overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2
        ${active ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'border-white/5 hover:border-cyan-500/30'}`}
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/5 transition-all duration-500"></div>

        <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                    {icon}
                </div>
                <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400">{subtitle}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-white">{title}</h3>

            <div className="mt-auto flex items-center space-x-2 text-sm text-cyan-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span>Explore</span>
                <ChevronRight size={14} />
            </div>
        </div>
    </div>
);

export default LandingPage;
