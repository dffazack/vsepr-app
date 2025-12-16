import React, { useState, useEffect } from 'react';
import { Trophy, Star, ChevronLeft, Zap, Target, RefreshCw } from 'lucide-react';

const questions = [
    {
        id: 1,
        question: "Apa bentuk geometri molekul dari Metana (CH₄)?",
        options: ["Linear", "Trigonal Planar", "Tetrahedral", "Oktahedral"],
        correct: "Tetrahedral",
        explanation: "CH₄ memiliki 4 pasangan ikatan dan 0 pasangan bebas, membentuk geometri Tetrahedral dengan sudut ikatan 109.5°."
    },
    {
        id: 2,
        question: "Molekul manakah yang memiliki bentuk Linear?",
        options: ["H₂O", "CO₂", "BF₃", "NH₃"],
        correct: "CO₂",
        explanation: "CO₂ memiliki 2 domain ikatan dan 0 pasangan bebas pada atom pusat karbon, menghasilkan geometri Linear (180°)."
    },
    {
        id: 3,
        question: "Berapa sudut ikatan pada molekul Trigonal Planar?",
        options: ["90°", "109.5°", "120°", "180°"],
        correct: "120°",
        explanation: "Molekul Trigonal Planar (seperti BF₃) membagi lingkaran menjadi 3 bagian yang sama, jadi 360° / 3 = 120°."
    },
    {
        id: 4,
        question: "Amonia (NH₃) memiliki bentuk geometri molekul apa?",
        options: ["Tetrahedral", "Trigonal Piramida", "Bengkok (V)", "Jungkat-jungkit"],
        correct: "Trigonal Piramida",
        explanation: "NH₃ memiliki 3 pasangan ikatan dan 1 pasangan bebas. Geometri elektronnya Tetrahedral, tetapi geometri molekulnya Trigonal Piramida."
    },
    {
        id: 5,
        question: "Air (H₂O) memiliki dua pasangan bebas. Apa bentuk molekulnya?",
        options: ["Linear", "Bengkok (V)", "Trigonal Planar", "Bentuk T"],
        correct: "Bengkok (V)",
        explanation: "Dua pasangan bebas menekan pasangan ikatan, menciptakan bentuk molekul yang 'Bengkok' atau 'Huruf V'."
    }
];

const PracticeModule = ({ onNavigate, onBack }) => {
    const [gameState, setGameState] = useState('start'); // start, playing, end
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'

    const currentQuestion = questions[currentQuestionIdx];

    const handleStart = () => {
        setGameState('playing');
        setCurrentQuestionIdx(0);
        setScore(0);
        setStreak(0);
        setSelectedOption(null);
        setIsAnswered(false);
    };

    const handleAnswer = (option) => {
        if (isAnswered) return;

        setSelectedOption(option);
        setIsAnswered(true);

        if (option === currentQuestion.correct) {
            setScore(s => s + 100 + (streak * 10)); // Streak bonus
            setStreak(s => s + 1);
            setFeedback('correct');
        } else {
            setStreak(0);
            setFeedback('wrong');
        }

        // Auto advance after delay
        setTimeout(() => {
            if (currentQuestionIdx < questions.length - 1) {
                setCurrentQuestionIdx(curr => curr + 1);
                setSelectedOption(null);
                setIsAnswered(false);
                setFeedback(null);
            } else {
                setGameState('end');
            }
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#050510] relative text-slate-100 font-sans overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-cyan-600/10 rounded-full blur-[80px]"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-20 border-b border-white/5 backdrop-blur-sm bg-[#050510]/80">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={20} />
                        <span>Kembali ke Menu</span>
                    </button>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                            <Zap size={16} className="text-yellow-400 fill-yellow-400" />
                            <span className="font-bold text-yellow-100">{streak} Beruntun</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                            <Trophy size={16} className="text-cyan-400" />
                            <span className="font-bold text-cyan-100">{score} Poin</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 container mx-auto px-6 py-12 flex items-center justify-center min-h-[80vh]">

                {gameState === 'start' && (
                    <div className="text-center space-y-8 max-w-lg animate-fade-in-up">
                        <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                            <Target size={48} className="text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold">Tantangan VSEPR</h1>
                        <p className="text-slate-400 text-lg">
                            Uji pengetahuanmu tentang geometri molekul, sudut ikatan, dan domain elektron.
                            Bisakah kamu mendapatkan skor sempurna?
                        </p>
                        <button
                            onClick={handleStart}
                            className="w-full py-4 bg-white text-black font-bold text-xl rounded-xl hover:scale-105 transition-transform shadow-xl"
                        >
                            Mulai Kuis
                        </button>
                    </div>
                )}

                {gameState === 'playing' && (
                    <div className="w-full max-w-2xl">
                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm text-slate-400 mb-2">
                                <span>Pertanyaan {currentQuestionIdx + 1} dari {questions.length}</span>
                                <span>{Math.round(((currentQuestionIdx) / questions.length) * 100)}% Selesai</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-500 ease-out"
                                    style={{ width: `${((currentQuestionIdx) / questions.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Question Card */}
                        <div className="bg-[#0F1629]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                            {/* Feedback Overlay */}
                            {feedback && (
                                <div className={`absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${feedback === 'correct' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                                    <div className={`text-4xl font-bold animate-bounce ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                                        {feedback === 'correct' ? 'Benar!' : 'Salah'}
                                    </div>
                                </div>
                            )}

                            <h2 className="text-2xl font-bold mb-8 leading-relaxed">{currentQuestion.question}</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentQuestion.options.map((opt, idx) => {
                                    let btnClass = "p-4 rounded-xl border-2 text-left transition-all duration-300 font-medium ";
                                    if (isAnswered) {
                                        if (opt === currentQuestion.correct) btnClass += "border-green-500 bg-green-500/20 text-green-300";
                                        else if (opt === selectedOption) btnClass += "border-red-500 bg-red-500/20 text-red-300";
                                        else btnClass += "border-white/5 bg-white/5 text-slate-500";
                                    } else {
                                        btnClass += "border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]";
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(opt)}
                                            disabled={isAnswered}
                                            className={btnClass}
                                        >
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Explanation (Shows after answer) */}
                            {isAnswered && (
                                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-200 text-sm animate-fade-in-up">
                                    <span className="font-bold block mb-1">Penjelasan:</span>
                                    {currentQuestion.explanation}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {gameState === 'end' && (
                    <div className="text-center space-y-8 max-w-lg animate-fade-in-up">
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-yellow-500/20 blur-[50px] rounded-full"></div>
                            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center shadow-2xl relative z-10">
                                <Trophy size={48} className="text-white" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold">Kuis Selesai!</h1>
                            <p className="text-slate-400">Skor kamu: <span className="text-cyan-400 font-bold text-xl">{score}</span> poin</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                            <div className="text-center">
                                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Akurasi</div>
                                <div className="text-2xl font-bold text-green-400">{Math.round((score / (500 + (5 * 10))) * 100)}%</div>
                                {/* Rough calc for demo */}
                            </div>
                            <div className="text-center">
                                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Rekor Beruntun</div>
                                <div className="text-2xl font-bold text-yellow-400">{streak}</div>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={handleStart}
                                className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-all flex items-center justify-center space-x-2"
                            >
                                <RefreshCw size={18} />
                                <span>Coba Lagi</span>
                            </button>
                            <button
                                onClick={onBack}
                                className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-white transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)]"
                            >
                                Kembali ke Menu
                            </button>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default PracticeModule;
