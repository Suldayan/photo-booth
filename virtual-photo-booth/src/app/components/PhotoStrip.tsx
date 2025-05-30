import { Camera } from "lucide-react";
import React from "react";
import { PhotoStripProps } from "../types/types";
import { STRIP_CONFIGS } from "../constants/stripConfigOptions";

export default function PhotoStrip({ stripType = '4x1' }: PhotoStripProps) {
    const config = STRIP_CONFIGS[stripType];
    
    const renderPhotos = () => {
        const photos = Array.from({ length: config.photoCount }, (_, i) => (
            <div 
                key={i} 
                className={`${config.photoWidth} ${config.photoHeight} bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 rounded-sm border-2 border-white shadow-sm relative overflow-hidden`}
                style={{
                    background: 'linear-gradient(135deg, #fef7f7 0%, #fef2f2 30%, #fef3e2 70%, #fef7ed 100%)'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-pink-100/20 to-orange-100/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-rose-300" />
                </div>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full opacity-50"></div>
            </div>
        ));

        if (config.layout === 'vertical') {
            return <div className="space-y-1">{photos}</div>;
        } else if (config.layout === 'grid') {
            return (
                <div className="grid gap-1" style={{ 
                    gridTemplateColumns: `repeat(${config.gridCols}, 1fr)`,
                    gridTemplateRows: `repeat(${config.gridRows}, 1fr)`
                }}>
                    {photos}
                </div>
            );
        }
    };

    return (
        <div className="relative">
            <div 
                className={`bg-gradient-to-b from-gray-50 to-gray-100 p-2 rounded-xl shadow-xl border-4 border-white ${config.stripWidth} relative overflow-hidden`}
                style={{
                    background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
                }}
            >
                <div className="absolute top-1 left-1 w-1 h-1 bg-rose-200 rounded-full opacity-60"></div>
                <div className="absolute top-1 right-1 w-1 h-1 bg-pink-200 rounded-full opacity-60"></div>
                <div className="absolute bottom-1 left-1 w-1 h-1 bg-orange-200 rounded-full opacity-60"></div>
                <div className="absolute bottom-1 right-1 w-1 h-1 bg-rose-200 rounded-full opacity-60"></div>
                
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, #ec4899 1px, transparent 1px), radial-gradient(circle at 75% 75%, #f97316 1px, transparent 1px)`,
                        backgroundSize: '8px 8px'
                    }}></div>
                </div>
                
                <div className="relative z-10">
                    {renderPhotos()}
                </div>
                
                <div className="mt-3 text-center relative z-10">
                    <div 
                        className="text-xs font-bold tracking-wider text-gray-500 opacity-80"
                        style={{ 
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            letterSpacing: '0.1em'
                        }}
                    >
                        {stripType}
                    </div>
                    <div className="w-6 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent mx-auto mt-1"></div>
                </div>
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-100/20 via-transparent to-orange-100/20 -z-10 blur-sm"></div>
        </div>
    );
}