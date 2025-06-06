import React, { useState } from "react";
import Image from "next/image";

interface UserSelections {
  stripType: '4x1' | '3x2' | '6x1';
}

interface PhotoReviewProps {
  photos: string[];
  userSelections: UserSelections;
}

export default function PhotoReview({ photos = [], userSelections }: PhotoReviewProps) {
  const [userPhotoGrid] = useState<'4x1' | '3x2' | '6x1'>(userSelections.stripType);

  const getGridLayout = () => {
    switch (userPhotoGrid) {
      case '4x1':
        return { cols: 1, rows: 4 };
      case '3x2':
        return { cols: 2, rows: 3 };
      case '6x1':
        return { cols: 1, rows: 6 };
    }
  };

  const getCurrentDate = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    return `${month}.${day}.${year}`;
  };

  const layout = getGridLayout();
  const photoHeight = userPhotoGrid === '6x1' ? 'h-28' : userPhotoGrid === '3x2' ? 'h-36' : 'h-44';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="relative">
        {/* Main photo strip container */}
        <div className="bg-white relative shadow-2xl rounded-3xl overflow-hidden" style={{ width: '380px' }}>
          <div className="h-2 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300"></div>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 text-gray-700 p-6 text-center relative">
            <div className="absolute top-2 left-4 text-pink-400">♡</div>
            <div className="absolute top-2 right-4 text-blue-400">☆</div>
            <h1 className="text-lg font-black tracking-widest mb-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              CHINGUBOOTH
            </h1>
            <div className="text-xs text-gray-500 font-medium">{getCurrentDate()}</div>
            <div className="flex justify-center gap-1 mt-2">
              <div className="w-2 h-2 rounded-full bg-pink-300"></div>
              <div className="w-2 h-2 rounded-full bg-purple-300"></div>
              <div className="w-2 h-2 rounded-full bg-blue-300"></div>
            </div>
          </div>

          {/* Photo grid */}
          <div className="bg-white p-4">
            <div 
              className="grid gap-3" 
              style={{ 
                gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
                gridTemplateRows: `repeat(${layout.rows}, 1fr)`
              }}
            >
              {photos.slice(0, layout.cols * layout.rows).map((photo, index) => (
                <div key={index} className={`relative bg-gray-50 rounded-2xl overflow-hidden shadow-sm ${photoHeight}`}>
                  <Image 
                    src={photo} 
                    alt={`Photo ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Photo frame overlay */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-white shadow-inner pointer-events-none z-10"></div>
                  <div className="absolute top-1 right-1 text-xs text-white/70 z-10">
                    {index === 0 ? '♡' : index === 1 ? '☆' : index === 2 ? '♪' : '♢'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom section */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 text-gray-600 p-4 text-center relative">
            <div className="flex justify-center items-center gap-2 mb-2">
              <div className="text-pink-400">✧</div>
              <div className="text-blue-400">✧</div>
            </div>
          </div>
          <div className="h-2 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300"></div>

          <div className="absolute -left-3 top-1/4 bg-pink-200 rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
            <div className="text-xs text-pink-600">♡</div>
          </div>
          <div className="absolute -right-3 top-1/3 bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
            <div className="text-xs text-blue-600">☆</div>
          </div>
          <div className="absolute -left-3 bottom-1/4 bg-purple-200 rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
            <div className="text-xs text-purple-600">♪</div>
          </div>
          <div className="absolute -right-3 bottom-1/3 bg-pink-200 rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
            <div className="text-xs text-pink-600">✧</div>
          </div>
        </div>

        <div className="absolute -top-4 -left-4 text-2xl text-pink-300 animate-pulse">✧</div>
        <div className="absolute -top-6 -right-2 text-xl text-blue-300 animate-pulse" style={{ animationDelay: '0.5s' }}>☆</div>
        <div className="absolute -bottom-4 -left-2 text-xl text-purple-300 animate-pulse" style={{ animationDelay: '1s' }}>♡</div>
        <div className="absolute -bottom-6 -right-4 text-2xl text-pink-300 animate-pulse" style={{ animationDelay: '1.5s' }}>♪</div>
      </div>
    </div>
  );
}