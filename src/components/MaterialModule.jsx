import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ChevronDown, CheckCircle, Info, Play } from 'lucide-react';

const MaterialModule = ({ onNavigate, onBack }) => {
    const [activeSection, setActiveSection] = useState('intro');
    const [progress, setProgress] = useState(0);
    const [axeInput, setAxeInput] = useState({ A: 1, X: 4, E: 0 });
    const [prediction, setPrediction] = useState(null);

    const sections = ['intro', 'pairs', 'notation', 'shapes'];

    useEffect(() => {
        // Calculate progress
        const idx = sections.indexOf(activeSection);
        const p = ((idx + 1) / sections.length) * 100;
        setProgress(p);
    }, [activeSection]);

    const predictShape = () => {
        const { X, E } = axeInput;
        const total = X + E;
        let shape = "Unknown";
        let angle = "-";

        if (total === 2) { shape = "Linear"; angle = "180°"; }
        else if (total === 3) {
            if (E === 0) { shape = "Trigonal Planar"; angle = "120°"; }
            else { shape = "Bent (V-shape)"; angle = "<120°"; }
        }
        else if (total === 4) {
            if (E === 0) { shape = "Tetrahedral"; angle = "109.5°"; }
            else if (E === 1) { shape = "Trigonal Pyramidal"; angle = "<109.5°"; }
            else if (E === 2) { shape = "Bent (V-shape)"; angle = "<<109.5°"; }
        }
        else if (total === 5) {
            if (E === 0) shape = "Trigonal Bipyramidal";
            else if (E === 1) shape = "Seesaw";
            else if (E === 2) shape = "T-shaped";
            else if (E === 3) shape = "Linear";
        }
        else if (total === 6) {
            if (E === 0) shape = "Octahedral";
            else if (E === 1) shape = "Square Pyramidal";
            else if (E === 2) shape = "Square Planar";
        }

        setPrediction({ shape, angle, formula: `AX${X}E${E}` });
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
            {/* Header */}
            <header className="bg-slate-800 border-b border-slate-700 py-4 px-6 sticky top-0 z-20">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button onClick={onBack} className="p-2 hover:bg-slate-700 rounded-full transition-colors hidden md:block">
                            <ChevronLeft size={20} />
                        </button>
                        <h1 className="text-xl font-bold text-white flex items-center"><span className="text-cyan-500 mr-2">Modul 2</span> Teori VSEPR</h1>
                    </div>

                    <div className="w-1/3 mx-4">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Selesai</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>

                    <button onClick={onBack} className="md:hidden text-sm text-slate-400">Keluar</button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 md:px-6 py-8 md:max-w-4xl">

                {/* Section A: Pengantar */}
                <Section
                    id="intro"
                    title="1. Pengantar Teori VSEPR"
                    active={activeSection === 'intro'}
                    onToggle={() => setActiveSection('intro')}
                >
                    <div className="space-y-4 text-slate-300 leading-relaxed">
                        <p>
                            <strong className="text-cyan-400">VSEPR</strong> (Valence Shell Electron Pair Repulsion) adalah teori yang digunakan untuk memprediksi geometri molekul berdasarkan jumlah pasangan elektron di sekitar atom pusat.
                        </p>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                            <h4 className="font-bold text-white mb-2 flex items-center"><Info size={16} className="mr-2 text-cyan-500" /> Prinsip Utama</h4>
                            <p>
                                Pasangan elektron di kulit valensi atom pusat akan saling tolak-menolak sejauh mungkin untuk meminimalkan gaya tolak antar elektron.
                            </p>
                        </div>
                        <p>
                            Kekuatan tolakan: <br />
                            <span className="text-red-400 font-bold border-b border-red-400/30">PEB-PEB</span> &gt; <span className="text-yellow-400 font-bold border-b border-yellow-400/30">PEB-PEI</span> &gt; <span className="text-blue-400 font-bold border-b border-blue-400/30">PEI-PEI</span>
                        </p>
                    </div>
                </Section>

                {/* Section B: Jenis Pasangan Elektron */}
                <Section
                    id="pairs"
                    title="2. Jenis Pasangan Elektron"
                    active={activeSection === 'pairs'}
                    onToggle={() => setActiveSection('pairs')}
                >
                    <div className="space-y-6">
                        <p className="text-slate-300">
                            Dalam VSEPR, kita membedakan dua jenis domain elektron:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-blue-900/10 border border-blue-500/30 p-4 rounded-xl">
                                <h4 className="font-bold text-blue-400 mb-2">Pasangan Elektron Ikatan (PEI)</h4>
                                <p className="text-sm text-slate-300">Elektron yang digunakan bersama oleh dua atom untuk membentuk ikatan kimia.</p>
                                <div className="mt-4 h-20 flex items-center justify-center bg-slate-800/50 rounded-lg relative overflow-hidden">
                                    {/* Simple SVG diagram */}
                                    <div className="w-6 h-6 rounded-full bg-slate-400 mr-8 z-10"></div>
                                    <div className="w-20 h-2 bg-blue-500 rounded-full absolute"></div>
                                    <div className="w-6 h-6 rounded-full bg-slate-400 ml-8 z-10"></div>
                                </div>
                            </div>
                            <div className="bg-red-900/10 border border-red-500/30 p-4 rounded-xl">
                                <h4 className="font-bold text-red-400 mb-2">Pasangan Elektron Bebas (PEB)</h4>
                                <p className="text-sm text-slate-300">Elektron valensi yang tidak terlibat dalam pembentukan ikatan (Lone Pair).</p>
                                <div className="mt-4 h-20 flex items-center justify-center bg-slate-800/50 rounded-lg relative">
                                    <div className="w-8 h-8 rounded-full bg-slate-400"></div>
                                    <div className="absolute -top-3 w-6 h-8 rounded-[50%] bg-red-500/50 blur-[2px]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Section C: Notasi AXE */}
                <Section
                    id="notation"
                    title="3. Notasi AXE"
                    active={activeSection === 'notation'}
                    onToggle={() => setActiveSection('notation')}
                >
                    <div className="space-y-6">
                        <div className="flex space-x-8 justify-center my-4 font-mono text-xl">
                            <div className="text-center">
                                <span className="block text-4xl font-bold text-white mb-2">A</span>
                                <span className="text-xs text-slate-400 uppercase tracking-wider">Atom Pusat</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-4xl font-bold text-blue-400 mb-2">X<span className="text-lg align-top">m</span></span>
                                <span className="text-xs text-slate-400 uppercase tracking-wider">PEI (m)</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-4xl font-bold text-red-400 mb-2">E<span className="text-lg align-top">n</span></span>
                                <span className="text-xs text-slate-400 uppercase tracking-wider">PEB (n)</span>
                            </div>
                        </div>

                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <h4 className="font-bold text-white mb-4 border-b border-slate-700 pb-2">Simulator Notasi</h4>
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="text-xs text-slate-400 uppercase font-bold block mb-2">Jumlah X (PEI)</label>
                                    <input
                                        type="number" min="2" max="6"
                                        value={axeInput.X}
                                        onChange={e => setAxeInput({ ...axeInput, X: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-slate-900 text-white border border-slate-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 uppercase font-bold block mb-2">Jumlah E (PEB)</label>
                                    <input
                                        type="number" min="0" max="3"
                                        value={axeInput.E}
                                        onChange={e => setAxeInput({ ...axeInput, E: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-slate-900 text-white border border-slate-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={predictShape}
                                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg font-bold transition-all transform hover:scale-[1.02]"
                            >
                                Prediksi Bentuk
                            </button>
                            {prediction && (
                                <div className="mt-6 p-4 bg-slate-900 rounded-lg text-center animate-fade-in border border-cyan-500/30">
                                    <div className="text-xs text-slate-500 uppercase mb-1">Hasil Prediksi</div>
                                    <div className="text-2xl font-bold text-white mb-1">{prediction.shape}</div>
                                    <div className="text-sm text-cyan-400 font-mono">{prediction.formula} • {prediction.angle}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </Section>

                {/* Section D: Overview Table */}
                <Section
                    id="shapes"
                    title="4. Tabel Bentuk Molekul"
                    active={activeSection === 'shapes'}
                    onToggle={() => setActiveSection('shapes')}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="bg-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                                    <th className="p-4 border-b border-slate-700">Total</th>
                                    <th className="p-4 border-b border-slate-700">Notasi</th>
                                    <th className="p-4 border-b border-slate-700">Bentuk</th>
                                    <th className="p-4 border-b border-slate-700">Sudut</th>
                                    <th className="p-4 border-b border-slate-700">Contoh</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-slate-300">
                                <TableRow total="2" axe="AX2" shape="Linear" angle="180°" ex="CO2, BeCl2" />
                                <TableRow total="3" axe="AX3" shape="Trigonal Planar" angle="120°" ex="BF3" />
                                <TableRow total="3" axe="AX2E" shape="Bent (V)" angle="<120°" ex="SO2" />
                                <TableRow total="4" axe="AX4" shape="Tetrahedral" angle="109.5°" ex="CH4" />
                                <TableRow total="4" axe="AX3E" shape="Trigonal Pyramidal" angle="<109.5°" ex="NH3" />
                                <TableRow total="4" axe="AX2E2" shape="Bent (V)" angle="<<109.5°" ex="H2O" />
                                <TableRow total="5" axe="AX5" shape="Trigonal Bipyramidal" angle="90°, 120°" ex="PCl5" />
                                <TableRow total="6" axe="AX6" shape="Octahedral" angle="90°" ex="SF6" />
                            </tbody>
                        </table>
                    </div>
                </Section>

                <div className="mt-12 flex justify-end">
                    <button
                        onClick={() => onNavigate('simulasi')}
                        className="group flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-8 py-4 rounded-xl text-white font-bold shadow-lg shadow-purple-900/20 transition-all transform hover:-translate-y-1"
                    >
                        <div className="text-left">
                            <span className="block text-xs opacity-70 font-normal">Modul Selanjutnya</span>
                            <span>Masuk ke Simulasi 3D</span>
                        </div>
                        <div className="bg-white/20 p-2 rounded-full">
                            <Play fill="currentColor" size={16} />
                        </div>
                    </button>
                </div>

            </main>
        </div>
    );
};

const Section = ({ id, title, active, onToggle, children }) => (
    <div className={`mb-6 border border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 ${active ? 'bg-slate-800/30 ring-1 ring-cyan-500/30' : 'bg-slate-800/10 hover:bg-slate-800/20'}`}>
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
        >
            <h3 className={`text-xl font-bold transition-colors ${active ? 'text-cyan-400' : 'text-slate-300'}`}>{title}</h3>
            <ChevronDown className={`transition-transform duration-300 ${active ? 'rotate-180 text-cyan-500' : 'text-slate-500'}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${active ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-6 pt-0 border-t border-slate-700/50">
                {children}
            </div>
        </div>
    </div>
);

const TableRow = ({ total, axe, shape, angle, ex }) => (
    <tr className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
        <td className="p-4 text-slate-500 font-mono">{total}</td>
        <td className="p-4 font-bold text-cyan-400">{axe}</td>
        <td className="p-4 text-white font-medium">{shape}</td>
        <td className="p-4 font-mono text-xs">{angle}</td>
        <td className="p-4 text-slate-400 italic">{ex}</td>
    </tr>
);

export default MaterialModule;
