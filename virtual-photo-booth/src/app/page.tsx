'use client';
import { useState } from 'react';
import Home from './components/pages/Home';
import PhotoSelection from './components/pages/PhotoSelection';
import PhotoSession from './components/pages/PhotoSession';
import { StripType, UserSelections } from './types/types';

export default function Page() {
  const [currentStep, setCurrentStep] = useState<string>('home');
  const [userSelections, setUserSelections] = useState<UserSelections>({
    stripType: '4x1'
  });

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
  };

  const updateUserSelection = <K extends keyof UserSelections>(
    key: K, 
    value: UserSelections[K]
  ) => {
    setUserSelections(prev => ({ ...prev, [key]: value }));
  };

  const handlePhotoSelectionNext = (stripType: StripType) => {
    updateUserSelection('stripType', stripType);
    setCurrentStep('photo-session');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'home':
        return <Home onNext={() => handleStepChange('photo-selection')} />;
      case 'photo-selection':
        return (
          <PhotoSelection 
            onNext={handlePhotoSelectionNext}
            initialSelection={userSelections.stripType}
          />
        );
      case 'photo-session':
        return <PhotoSession userSelections={userSelections} />;
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