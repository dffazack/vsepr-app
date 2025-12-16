import React, { useState } from 'react'; // v2.0 - Forced Update
import LandingPage from './components/LandingPage';
import SimulationModule from './components/SimulationModule';
import MaterialModule from './components/MaterialModule';
import PracticeModule from './components/PracticeModule';
import QuizModule from './components/QuizModule';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentView} />;
      case 'materi':
        return <MaterialModule onNavigate={setCurrentView} onBack={() => setCurrentView('landing')} />;
      case 'simulasi':
        return <SimulationModule onBack={() => setCurrentView('landing')} />;
      case 'latihan':
        return <PracticeModule onNavigate={setCurrentView} onBack={() => setCurrentView('landing')} />;
      case 'kuis':
        return <QuizModule onNavigate={setCurrentView} onBack={() => setCurrentView('landing')} />;
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <>
      {renderView()}
    </>
  );
}

export default App;
