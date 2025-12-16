import React, { useState } from 'react';
import { Award, CheckCircle, XCircle, Clock, ChevronRight, RotateCcw, Home } from 'lucide-react';

const questions = [
    {
        id: 1,
        question: "Apa kepanjangan dari VSEPR?",
        options: [
            "Valence Shell Electron Pair Repulsion",
            "Variable Shell Electron Pair Repulsion",
            "Valence Solid Electron Pulse Resonance",
            "Vertical Shell Electron Pair Rotation"
        ],
        correct: 0
    },
    {
        id: 2,
        question: "Prinsip utama teori VSEPR adalah bahwa pasangan elektron akan...",
        options: [
            "Saling tarik menarik sekuat mungkin",
            "Saling tolak menolak sejauh mungkin",
            "Berkumpul di inti atom",
            "Membentuk orbital hibrida sp3"
        ],
        correct: 1
    },
    {
        id: 3,
        question: "Berapa sudut ikatan ideal untuk geometri molekul Tetrahedral?",
        options: ["90°", "120°", "109.5°", "180°"],
        correct: 2
    },
    {
        id: 4,
        question: "Molekul SF₆ memiliki bentuk geometri...",
        options: ["Tetrahedral", "Oktahedral", "Trigonal Bipiramida", "Segi Empat Datar"],
        correct: 1
    },
    {
        id: 5,
        question: "Manakah molekul di bawah ini yang memiliki bentuk Linear?",
        options: ["H₂O", "NH₃", "CH₄", "BeCl₂"],
        correct: 3
    },
    {
        id: 6,
        question: "Apa pengaruh Pasangan Elektron Bebas (PEB) terhadap sudut ikatan?",
        options: [
            "Memperbesar sudut ikatan",
            "Tidak berpengaruh",
            "Memperkecil sudut ikatan",
            "Membuat sudut menjadi 90°"
        ],
        correct: 2
    },
    {
        id: 7,
        question: "Molekul air (H₂O) memiliki notasi AXE...",
        options: ["AX₂E₂", "AX₂E₁", "AX₃E₁", "AX₄"],
        correct: 0
    },
    {
        id: 8,
        question: "Bentuk molekul PCl₅ adalah...",
        options: ["Oktahedral", "Trigonal Bipiramida", "Seesaw", "Bentuk T"],
        correct: 1
    },
    {
        id: 9,
        question: "Urutan kekuatan tolakan pasangan elektron dari yang terkuat adalah...",
        options: [
            "PEI-PEI > PEB-PEI > PEB-PEB",
            "PEB-PEB > PEI-PEI > PEB-PEI",
            "PEB-PEB > PEB-PEI > PEI-PEI",
            "PEB-PEI > PEB-PEB > PEI-PEI"
        ],
        correct: 2
    },
    {
        id: 10,
        question: "Jika sebuah molekul memiliki 3 Pasangan Ikatan dan 1 Pasangan Bebas, bentuknya adalah...",
        options: ["Tetrahedral", "Trigonal Piramida", "Trigonal Planar", "Bentuk T"],
        correct: 1
    }
];

const QuizModule = ({ onNavigate, onBack }) => {
    const [started, setStarted] = useState(false);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({}); // Map question ID to selected option index
    const [finished, setFinished] = useState(false);

    const handleStart = () => setStarted(true);

    const handleSelect = (optionIdx) => {
        setAnswers({ ...answers, [currentIdx]: optionIdx });
    };

    const handleNext = () => {
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(curr => curr + 1);
        } else {
            setFinished(true);
        }
    };

    // Calculate Results
    const calculateScore = () => {
        let correctCount = 0;
        questions.forEach((q, idx) => {
            if (answers[idx] === q.correct) correctCount++;
        });
        return Math.round((correctCount / questions.length) * 100);
    };

    const score = finished ? calculateScore() : 0;

    let grade = 'C';
    let gradeColor = 'text-red-500';
    let feedbackMsg = "Perlu Belajar Lagi";

    if (score >= 90) { grade = 'A'; gradeColor = 'text-cyan-400'; feedbackMsg = "Luar Biasa!"; }
    else if (score >= 70) { grade = 'B'; gradeColor = 'text-yellow-400'; feedbackMsg = "Bagus!"; }

    const restart = () => {
        setStarted(false);
        setFinished(false);
        setCurrentIdx(0);
        setAnswers({});
    };

    if (!started) {
        return (
            <div className="min-h-screen bg-[#050510] flex items-center justify-center p-6 font-sans">
                <div className="max-w-xl w-full text-center space-y-8 animate-fade-in-up">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-purple-500/20">
                        <Award size={48} className="text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Kuis Akhir VSEPR</h1>
                    <p className="text-slate-400 text-lg">
                        Evaluasi pemahamanmu tentang teori VSEPR.
                        Terdiri dari 10 soal pilihan ganda tanpa bantuan.
                    </p>
                    <div className="flex justify-center space-x-8 text-sm text-slate-500">
                        <span className="flex items-center"><Clock size={16} className="mr-2" /> 10 Soal</span>
                        <span className="flex items-center"><CheckCircle size={16} className="mr-2" /> Penilaian Otomatis</span>
                    </div>
                    <div className="flex space-x-4 pt-4">
                        <button onClick={onBack} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl text-slate-300 font-bold hover:bg-white/10 transition-colors">
                            Kembali
                        </button>
                        <button onClick={handleStart} className="flex-[2] py-4 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-500/25">
                            Mulai Ujian
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (finished) {
        return (
            <div className="min-h-screen bg-[#050510] flex items-center justify-center p-6 font-sans">
                <div className="max-w-2xl w-full bg-[#0F1629] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden animate-fade-in text-center">
                    {/* Background glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-cyan-500/10 blur-[60px]"></div>

                    <div className="relative z-10 space-y-8">
                        <div>
                            <span className="text-slate-400 uppercase tracking-widest text-xs font-bold">Hasil Akhir</span>
                            <h2 className={`text-6xl md:text-8xl font-bold mt-4 mb-2 ${gradeColor}`}>{score}</h2>
                            <p className="text-2xl text-white font-medium">{feedbackMsg}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-t border-b border-slate-800 py-8">
                            <div>
                                <div className="text-slate-500 text-xs uppercase mb-1">Status</div>
                                <div className="text-white font-bold">{score >= 70 ? 'Lulus' : 'Gagal'}</div>
                            </div>
                            <div>
                                <div className="text-slate-500 text-xs uppercase mb-1">Benar</div>
                                <div className="text-green-400 font-bold">{Math.round((score / 100) * 10)} / 10</div>
                            </div>
                            <div>
                                <div className="text-slate-500 text-xs uppercase mb-1">Grade</div>
                                <div className={`font-bold ${gradeColor}`}>{grade}</div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                            <button onClick={restart} className="flex-1 py-3 flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors">
                                <RotateCcw size={18} />
                                <span>Ulangi Kuis</span>
                            </button>
                            <button onClick={() => onNavigate('landing')} className="flex-1 py-3 flex items-center justify-center space-x-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-colors">
                                <Home size={18} />
                                <span>Kembali ke Beranda</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const q = questions[currentIdx];
    const isLast = currentIdx === questions.length - 1;

    return (
        <div className="min-h-screen bg-[#050510] flex flex-col font-sans text-slate-100">
            {/* Header */}
            <header className="h-20 border-b border-white/5 flex items-center px-6 justify-between bg-[#050510]/90 backdrop-blur sticky top-0 z-10">
                <div className="flex items-center space-x-4">
                    <span className="text-slate-400 text-sm">Soal {currentIdx + 1}/{questions.length}</span>
                    <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 transition-all duration-300" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}></div>
                    </div>
                </div>
                <button onClick={() => setFinished(true)} className="text-sm text-red-400 hover:text-red-300">
                    Akhiri Kuis
                </button>
            </header>

            {/* Question Area */}
            <main className="flex-1 container mx-auto px-6 py-12 flex items-center justify-center">
                <div className="w-full max-w-3xl space-y-12">
                    <h2 className="text-3xl md:text-4xl font-bold leading-relaxed">{q.question}</h2>

                    <div className="space-y-4">
                        {q.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSelect(idx)}
                                className={`w-full p-6 text-left rounded-2xl border-2 transition-all flex items-center justify-between group ${answers[currentIdx] === idx
                                        ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                                        : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20'
                                    }`}
                            >
                                <span className={`text-lg font-medium ${answers[currentIdx] === idx ? 'text-cyan-300' : 'text-slate-300 group-hover:text-white'}`}>
                                    {opt}
                                </span>
                                {answers[currentIdx] === idx && <CheckCircle className="text-cyan-400" />}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-end pt-8">
                        <button
                            onClick={handleNext}
                            disabled={answers[currentIdx] === undefined}
                            className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-bold text-lg transition-all ${answers[currentIdx] !== undefined
                                    ? 'bg-white text-black hover:scale-105'
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                }`}
                        >
                            <span>{isLast ? 'Selesaikan' : 'Selanjutnya'}</span>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default QuizModule;
