import React from "react";
import { FilterOptions } from "../types/types";

export interface FilterCardProps {
    cameraFilter: FilterOptions;
    index: number;
    isCameraReady: boolean;
    selectedFilter: FilterOptions;                   
    onFilterChange: (filter: FilterOptions) => void;
}

export default function FilterCard({ cameraFilter, index, isCameraReady, selectedFilter, onFilterChange }: FilterCardProps) {
    return (
        <button
            key={index}
            onClick={() => onFilterChange(cameraFilter)}
            disabled={!isCameraReady}
            className={`
                relative p-3 rounded-xl border-2 transition-all duration-300 transform
                ${selectedFilter.name === cameraFilter.name
                    ? 'border-pink-400 bg-pink-50 scale-105 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-pink-200 hover:scale-102'
                }
                ${!isCameraReady ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
            `}
        >
            {/* Filter Preview Circle */}
            <div className="relative mb-2">
                <div 
                    className={`
                        w-12 h-12 mx-auto rounded-full border-2 border-gray-300 
                        ${cameraFilter.name === 'None' 
                            ? 'bg-gradient-to-br from-gray-100 to-gray-200' 
                            : 'bg-gradient-to-br from-pink-200 to-purple-200'
                        }
                    `}
                    style={{
                        filter: cameraFilter.css,
                        background: cameraFilter.overlay || undefined
                    }}
                />
                {selectedFilter.name === cameraFilter.name && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                    </div>
                )}
            </div>
            
            {/* Filter Name */}
            <div className="text-center">
                <div className="text-xs font-semibold text-gray-800 mb-1 leading-tight">
                    {cameraFilter.name}
                </div>
                <div className="text-xs text-gray-500 leading-tight">
                    {cameraFilter.description}
                </div>
            </div>
        </button>
    )
}