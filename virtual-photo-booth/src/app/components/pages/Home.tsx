import React, { useState } from 'react';
import { Camera, Users, User, Sparkles, Heart, Zap, Plus } from 'lucide-react';
import ModeCard from '../ModeCard';

interface HomeProps {
  onNext: () => void;
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}

export default function Home({ onNext }: HomeProps) {
  const [selectedMode, setSelectedMode] = useState<string>('');
  const features: Feature[] = [
    { 
      icon: Zap, 
      title: "Real-time Sync", 
      desc: "Instant connection with friends worldwide", 
      color: "text-teal-600", 
      bg: "bg-teal-50", 
      border: "border-teal-200" 
    },
    { 
      icon: Sparkles, 
      title: "Filters", 
      desc: "Photobooth style effects", 
      color: "text-cyan-600", 
      bg: "bg-cyan-50", 
      border: "border-cyan-200" 
    },
    { 
      icon: Heart, 
      title: "Save Memories", 
      desc: "Download your photo strips!", 
      color: "text-teal-500", 
      bg: "bg-teal-50", 
      border: "border-teal-200" 
    },
  ];

  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode);
  };

  const handleStartSession = () => {
    setSelectedMode('solo');
    onNext();
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Dotted pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #14b8a6 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} 
        />
      </div>

      {/* Main container */}
      <div className="relative min-h-screen">
        {/* Header section */}
        <div className="pt-36 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Logo and title row */}
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center space-x-8">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white">
                  <Camera className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-black text-gray-800 tracking-tight">CHINGU</h1>
                  <h1 className="text-5xl font-black text-teal-500 -mt-3 tracking-tight">BOOTH</h1>
                  <p className="text-gray-500 text-sm font-bold tracking-[0.2em] mt-2 uppercase">Online Photobooth</p>
                </div>
              </div>
            </div> 
          </div>
        </div>

        {/* Main content grid */}
        <div className="px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              
              {/* Mode selection cards */}
              <div className="lg:col-span-2">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Together mode */}
                  <ModeCard
                    mode="together"
                    subtitle="group sessions"
                    description="Take photos with friends in real-time."
                    subtext="Create a room and invite friends to join your booth."
                    icon={Users}
                    isSelected={selectedMode === 'together'}
                    onClick={() => handleModeSelect('together')}
                    buttons={[
                      {
                        text: "CREATE ROOM",
                        icon: Plus,
                        primary: true,
                        onClick: () => console.log("Create room clicked")
                      },
                      {
                        text: "JOIN ROOM",
                        primary: false,
                        onClick: () => console.log("Join room clicked")
                      }
                    ]}
                  />

                  {/* Solo mode */}
                  <ModeCard
                    mode="solo"
                    subtitle="individual sessions"
                    description="Take perfect photos by yourself or with your friends and family!"
                    subtext=""
                    icon={User}
                    isSelected={selectedMode === 'solo'}
                    onClick={() => handleModeSelect('solo')}
                    buttons={[
                      {
                        text: "START SESSION",
                        icon: Camera,
                        primary: true,
                        onClick: handleStartSession
                      }
                    ]}
                  />
                </div>
              </div>

              {/* Features sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-200 relative h-full">
                  <div className="absolute top-4 left-4 w-6 h-6 border-l-3 border-t-3 border-teal-300 rounded-tl-lg"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-r-3 border-t-3 border-teal-300 rounded-tr-lg"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-l-3 border-b-3 border-teal-300 rounded-bl-lg"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-r-3 border-b-3 border-teal-300 rounded-br-lg"></div>
                  
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-black text-gray-800 tracking-tight">FEATURES</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mt-2 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-8">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-5 group hover:scale-105 transition-all duration-300">
                        <div className={`w-18 h-18 ${feature.bg} rounded-2xl flex items-center justify-center shadow-lg border-2 ${feature.border} group-hover:shadow-xl transition-all duration-300 relative overflow-hidden flex-shrink-0`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
                          <feature.icon className={`w-7 h-7 ${feature.color} relative z-10`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-gray-800 font-black text-lg mb-1 tracking-tight">{feature.title}</h4>
                          <p className="text-gray-500 text-sm font-medium">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <div className="inline-block bg-gradient-to-r from-teal-100 to-cyan-100 px-6 py-2 rounded-full border border-teal-200">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}