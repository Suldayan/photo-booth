'use client';
import { useState } from 'react';
import Home from './components/pages/Home';
import PhotoSelection from './components/pages/PhotoSelection';

export default function Page() {
  const [currentStep, setCurrentStep] = useState<string>('home');

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'home':
        return <Home onNext={() => handleStepChange('photo-selection')} />;
      case 'photo-selection':
        return <PhotoSelection />;
      default:
        return <Home onNext={() => handleStepChange('photo-selection')} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentStep()}
    </div>
  );
}