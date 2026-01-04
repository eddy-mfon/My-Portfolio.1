import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-neutral-950">
      {/* Dark Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-neutral-900"></div>
      
      {/* EDITORIAL COLLAGE LAYER: B&W City & Textures */}
      
      {/* 1. Abstract Architecture (Top Right) */}
      <div className="absolute top-[-10%] right-[-5%] w-[45vw] h-[60vh] opacity-[0.07] mix-blend-overlay rotate-12 overflow-hidden">
        <img 
            src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200&auto=format&fit=crop" 
            alt="City Architecture" 
            className="w-full h-full object-cover grayscale contrast-125 mask-vertical-fade animate-pan-vertical"
        />
      </div>

      {/* 2. Abstract Typography/Text Texture (Bottom Left) */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[70vh] opacity-[0.05] mix-blend-screen -rotate-6 overflow-hidden">
         <img 
            src="https://images.unsplash.com/photo-1555449372-b8833917d52f?q=80&w=1200&auto=format&fit=crop" 
            alt="Typography Texture" 
            className="w-full h-full object-cover grayscale contrast-150 invert mask-gradient animate-pan-slow"
        />
      </div>

      {/* 3. Central Grain/Detail (Middle) */}
      <div className="absolute top-[30%] left-[20%] w-[60vw] h-[40vh] opacity-[0.03] mix-blend-soft-light pointer-events-none overflow-hidden">
        <img 
             src="https://images.unsplash.com/photo-1516733972624-9b5756c6b447?q=80&w=1200&auto=format&fit=crop"
             alt="Concrete Texture"
             className="w-full h-full object-cover grayscale animate-pan-slow"
        />
      </div>

      {/* Subtle Silver Blobs - Reduced opacity to blend with images */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-silver-900/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-silver-800/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>
      
      {/* Floating Dust Particles - Atmospheric Effect */}
      <div className="absolute inset-0 z-10 opacity-30">
          {[...Array(20)].map((_, i) => (
             <div 
               key={i}
               className="absolute rounded-full bg-white opacity-20 animate-drift"
               style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  animationDuration: `${Math.random() * 20 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`
               }}
             ></div>
          ))}
      </div>

      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]"></div>
      
      {/* Heavy Noise Texture for Paper Feel - Animated */}
      <div className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay animate-grain"></div>
    </div>
  );
};

export default Background;