'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import Home from './components/pages/Home';
import { StripType, UserSelections } from './types/types';

const PhotoSelection = dynamic(() => import('./components/pages/PhotoSelection'), {
  ssr: false,
  loading: () => <div className=' bg-white'></div>
})

const PhotoSession = dynamic(() => import('./components/pages/PhotoSession'), {
  ssr: false,
  loading: () => <div className='bg-white'></div>
})

const PhotoReview = dynamic(() => import('./components/pages/PhotoReview'), {
  ssr: false,
  loading: () => <div className='bg-white'></div>
})

export default function Page() {
  const [currentStep, setCurrentStep] = useState<string>('home');
  const [userSelections, setUserSelections] = useState<UserSelections>({
    stripType: '4x1'
  });
  const [userPhotos, setUserPhotos] = useState<string[]>([]);

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

  const updateUserPhoto = (photos: string[]) => {
    setUserPhotos(photos)  
  }

  const handleUserPhotoNext = (photos: string[]) => {
    updateUserPhoto(photos)
    setCurrentStep('photo-review');
  }

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
        return <PhotoSession onNext={handleUserPhotoNext} userSelections={userSelections} />;
      case 'photo-review':
        return <PhotoReview photos={userPhotos} userSelections={userSelections}/>
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