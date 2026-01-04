import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  noPadding?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false, noPadding = false }) => {
  return (
    <div 
      className={`
        group relative overflow-hidden border border-white/5 bg-black/40 backdrop-blur-md shadow-sm
        ${hoverEffect ? 'transition-all duration-500 hover:border-silver-500/30 hover:bg-black/60 hover:shadow-lg hover:shadow-silver-500/5' : ''}
        ${className}
      `}
    >
      {/* Corner Accents for Tech Feel - Light */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/10 group-hover:border-silver-500/50 transition-colors"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/10 group-hover:border-silver-500/50 transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/10 group-hover:border-silver-500/50 transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/10 group-hover:border-silver-500/50 transition-colors"></div>

      {/* Subtle noise grain inside card */}
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none mix-blend-overlay"></div>

      {/* Hover Gradient Shine - Silver Tint */}
      {hoverEffect && (
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-silver-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      
      {/* Content wrapper */}
      <div className={`relative z-10 h-full ${noPadding ? '' : 'p-6'}`}>
        {children}
      </div>
    </div>
  );
};

export default GlassCard;