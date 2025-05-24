import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import PhotoStrip from '../PhotoStrip';

const stripOptions = [
    { 
        type: '4x1' as const, 
        name: 'Classic Strip', 
        description: 'Traditional vertical photo strip',
        popular: true
    },
    { 
        type: '3x2' as const, 
        name: 'Grid', 
        description: 'Grid layout for 6 total photos',
        popular: false
    },
    { 
        type: '6x1' as const, 
        name: 'Long Strip', 
        description: 'Extended vertical strip',
        popular: false
    }
];

export default function PhotoSelection() {
    const [selectedStrip, setSelectedStrip] = useState<'4x1' | '3x2' | '6x1'>('4x1');
    const [hoveredStrip, setHoveredStrip] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-16 w-32 h-16 bg-gradient-to-r from-pink-50/30 to-rose-50/30 rounded-full blur-xl"></div>
                <div className="absolute top-40 left-12 w-24 h-12 bg-gradient-to-r from-orange-50/30 to-pink-50/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-32 right-20 w-28 h-14 bg-gradient-to-r from-rose-50/30 to-orange-50/30 rounded-full blur-xl"></div>
                
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: `
                            linear-gradient(45deg, transparent 40%, rgba(236, 72, 153, 0.1) 41%, rgba(236, 72, 153, 0.1) 59%, transparent 60%),
                            linear-gradient(-45deg, transparent 40%, rgba(249, 115, 22, 0.1) 41%, rgba(249, 115, 22, 0.1) 59%, transparent 60%)
                        `,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-1 h-8 bg-gradient-to-b from-pink-400 to-rose-400 rounded-full"></div>
                        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                            Choose Your Style
                        </h1>
                        <div className="w-1 h-8 bg-gradient-to-b from-rose-400 to-orange-400 rounded-full"></div>
                    </div>
                    <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                        Select your preferred photo strip layout to create lasting memories
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <Sparkles className="w-4 h-4 text-pink-400" />
                        <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
                        <Sparkles className="w-4 h-4 text-rose-400" />
                    </div>
                </div>

                {/* Strip Selection Grid */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {stripOptions.map((option) => (
                            <div
                                key={option.type}
                                className={`relative group cursor-pointer transition-all duration-300 ${
                                    selectedStrip === option.type 
                                        ? 'transform scale-105' 
                                        : hoveredStrip === option.type 
                                            ? 'transform scale-102' 
                                            : ''
                                }`}
                                onClick={() => setSelectedStrip(option.type)}
                                onMouseEnter={() => setHoveredStrip(option.type)}
                                onMouseLeave={() => setHoveredStrip(null)}
                            >
                                {/* Selection Card */}
                                <div className={`
                                    relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300
                                    ${selectedStrip === option.type 
                                        ? 'border-pink-300 shadow-xl shadow-pink-100/50' 
                                        : 'border-gray-100 hover:border-pink-200 hover:shadow-xl'
                                    }
                                `}>
                                    {/* Selection indicator */}
                                    <div className={`
                                        absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-all duration-200
                                        ${selectedStrip === option.type 
                                            ? 'bg-pink-400 border-pink-400' 
                                            : 'border-gray-300 group-hover:border-pink-300'
                                        }
                                    `}>
                                        {selectedStrip === option.type && (
                                            <Check className="w-4 h-4 text-white absolute top-0.5 left-0.5" />
                                        )}
                                    </div>

                                    {/* PhotoStrip Preview */}
                                    <div className="flex justify-center mb-6">
                                        <PhotoStrip stripType={option.type} />
                                    </div>

                                    {/* Option Info */}
                                    <div className="text-center space-y-3">
                                        <h3 className="text-xl font-bold text-gray-800 tracking-tight">
                                            {option.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed px-2">
                                            {option.description}
                                        </p>
                                    </div>
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-pink-200 to-transparent rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Button */}
                    <div className="text-center">
                        <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white font-bold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <span className="text-lg tracking-wide">Start Photo Session</span>
                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent ml-0.5"></div>
                            </div>
                        </button>
                        
                        {/* Selected option indicator */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                            <span>Selected style:</span>
                            <span className="font-medium text-pink-500">
                                {stripOptions.find(opt => opt.type === selectedStrip)?.name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent"></div>
        </div>
    );
}