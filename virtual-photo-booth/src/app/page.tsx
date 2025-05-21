'use client'
import { useState, useEffect } from 'react';
import { Camera, Users, Sparkles } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Loading Screen */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="relative">
            <div className="w-24 h-24 border-8 border-teal-300 border-t-teal-500 rounded-full animate-spin"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-teal-500" size={24} />
          </div>
          <p className="mt-4 text-xl font-bold text-teal-600">Loading Virtual Together...</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-teal-600 drop-shadow-md">
              Virtual Together
              <span className="inline-block animate-bounce ml-2">📸</span>
            </h1>
            <p className="mt-4 text-xl text-blue-600">Create memories, together or solo!</p>
          </header>
          
          <div className="absolute top-0 left-0 w-full overflow-hidden h-16 pointer-events-none">
            <div className="flex justify-between">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-16 h-16 bg-amber-300 rounded-full opacity-20"></div>
              ))}
            </div>
          </div>
          
          {/* Main Content: Photobooth Frame */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6 border-8 border-teal-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-600">Choose Your Photobooth Experience</h2>
              <p className="mt-2 text-gray-600">Strike a pose and create memories that last forever!</p>
            </div>
            
            {/* Options */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/* Solo Option */}
              <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="bg-blue-500 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Camera size={32} />
                </div>
                <h3 className="text-2xl font-bold text-center text-blue-600 mb-2">Solo Booth</h3>
                <p className="text-center text-gray-600">Take fun photos with filters, stickers, and frames - just you and your creativity!</p>
                <div className="mt-6 text-center">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors">
                    Start Solo Session
                  </button>
                </div>
              </div>
              
              {/* Together Option */}
              <div className="group bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg border-2 border-teal-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="bg-teal-500 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users size={32} />
                </div>
                <h3 className="text-2xl font-bold text-center text-teal-600 mb-2">Group Booth</h3>
                <p className="text-center text-gray-600">Invite friends and take synchronized photos together from anywhere in the world!</p>
                <div className="mt-6 text-center">
                  <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-full transition-colors">
                    Start Group Session
                  </button>
                </div>
              </div>
            </div>
            
            {/* Decorative Polaroid Stack */}
            <div className="mt-12 flex justify-center">
              <div className="relative h-32 w-96">
                <div className="absolute transform rotate-6 bg-white p-2 border-2 border-gray-200 shadow-md w-28 h-32 top-6 left-12">
                  <div className="bg-blue-100 h-20 w-full"></div>
                  <div className="h-8 w-full mt-1 flex justify-center items-center">
                    <div className="w-16 h-2 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="absolute transform -rotate-3 bg-white p-2 border-2 border-gray-200 shadow-md w-28 h-32 top-4 left-40">
                  <div className="bg-teal-100 h-20 w-full"></div>
                  <div className="h-8 w-full mt-1 flex justify-center items-center">
                    <div className="w-16 h-2 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="absolute transform rotate-12 bg-white p-2 border-2 border-gray-200 shadow-md w-28 h-32 top-0 left-64">
                  <div className="bg-amber-100 h-20 w-full"></div>
                  <div className="h-8 w-full mt-1 flex justify-center items-center">
                    <div className="w-16 h-2 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <footer className="mt-12 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Virtual Together • Create memories that last forever</p>
          </footer>
        </div>
      )}
    </main>
  );
}