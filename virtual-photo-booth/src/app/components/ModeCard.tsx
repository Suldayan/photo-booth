import React from "react";

interface ButtonConfig {
  text: string;
  icon?: React.ComponentType<{ className?: string }>;
  primary: boolean;
  onClick: () => void;
}

interface ModeCardProps {
  mode: string;
  subtitle: string;
  description: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
  isSelected: boolean;
  onClick: () => void;
  buttons: ButtonConfig[];
}

export default function ModeCard({ mode, subtitle, description, subtext, icon: Icon, isSelected, onClick, buttons }: ModeCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-300 group ${
        isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
      }`}
    >
      {/* Main film strip container */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        
        {/* Top brand strip */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center py-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=')] opacity-30"></div>
          <div className="relative z-10 font-black text-sm tracking-[0.2em] uppercase">{mode}</div>
          <div className="relative z-10 font-medium text-xs opacity-90 mt-1">VIRTUAL BOOTH</div>
        </div>

        {/* Photo frames section */}
        <div className="p-6 space-y-4">
          {/* Main large photo frame */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-8 h-40 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-cyan-50/50"></div>
            <div className={`relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isSelected 
                ? 'bg-gradient-to-br from-teal-500 to-cyan-500 shadow-xl' 
                : 'bg-gradient-to-br from-gray-200 to-gray-300 group-hover:from-teal-200 group-hover:to-cyan-200'
            }`}>
              <Icon className={`w-10 h-10 transition-colors duration-300 ${
                isSelected ? 'text-white' : 'text-gray-600 group-hover:text-teal-600'
              }`} />
            </div>
            
            <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-teal-400"></div>
            <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-teal-400"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-teal-400"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-teal-400"></div>
          </div>

          {/* Smaller photo frames grid */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg h-20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 to-cyan-50/30"></div>
                <div className="relative z-10 w-6 h-6 bg-teal-200 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 text-center">
          <h3 className="text-2xl font-black text-gray-800 mb-2 tracking-tight uppercase">{subtitle}</h3>
          <p className="text-gray-600 mb-2 font-medium text-sm">{description}</p>
          <p className="text-xs text-gray-500 font-medium">{subtext}</p>
        </div>
        
        {/* Buttons */}
        <div className="px-6 pb-6 space-y-3">
          {buttons.map((button, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                button.onClick();
              }}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 ${
                button.primary
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-cyan-600 transform hover:scale-[1.02]'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 hover:border-gray-300'
              }`}
            >
              {button.icon && <button.icon className="w-4 h-4" />}
              <span>{button.text}</span>
            </button>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 border-t border-gray-200">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-teal-100 to-cyan-100 px-4 py-1 rounded-full border border-teal-200">
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-4 bottom-4 w-3 flex flex-col justify-between">
        {Array.from({length: 8}).map((_, i) => (
          <div key={i} className="w-3 h-3 bg-teal-300 rounded-sm"></div>
        ))}
      </div>
      <div className="absolute right-0 top-4 bottom-4 w-3 flex flex-col justify-between">
        {Array.from({length: 8}).map((_, i) => (
          <div key={i} className="w-3 h-3 bg-teal-300 rounded-sm"></div>
        ))}
      </div>
    </div>
)}