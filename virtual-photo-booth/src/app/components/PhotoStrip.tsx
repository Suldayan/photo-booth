import { Camera } from "lucide-react";
import React from "react";
import { STRIP_CONFIGS } from "../constants/stripConfigOptions";

interface PhotoStripProps {
    stripType?: '4x1' | '3x2' | '6x1';
}
export default function PhotoStrip({ stripType = '4x1' }: PhotoStripProps) {
  const layouts = STRIP_CONFIGS
  
  const layout = layouts[stripType];
  const totalPhotos = layout.rows * layout.cols;
  
  return (
    <div className={`
      flex ${layout.cols === 1 ? 'flex-col' : 'grid grid-cols-2'} 
      gap-1 p-2 bg-white border border-gray-200 rounded-lg shadow-sm
      ${layout.aspect === 'tall' ? 'h-32 w-20' : 
        layout.aspect === 'extra-tall' ? 'h-40 w-20' : 'h-24 w-32'}
    `}>
      {Array.from({ length: totalPhotos }).map((_, i) => (
        <div 
          key={i} 
          className="bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center"
        >
          <Camera className="w-3 h-3 text-gray-400" />
        </div>
      ))}
    </div>
  );
};