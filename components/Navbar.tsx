import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Zap, Circle } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Update time for the "Live" feel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 
        FLOATING CONTROL DECK NAVBAR 
      */}
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex justify-center
          ${scrolled ? 'py-4' : 'py-6'}
        `}
        aria-label="Main Navigation"
      >
        <div 
          className={`
            relative bg-black/80 backdrop-blur-xl border border-white/5 text-neutral-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden
            ${scrolled ? 'w-[95%] rounded-full px-2 shadow-lg shadow-black/20' : 'w-[90%] md:w-[85%] max-w-6xl rounded-2xl px-0 shadow-md'}
          `}
        >
           {/* TEXTURE OVERLAY */}
           <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none mix-blend-overlay"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

           <div className="relative z-10 flex items-center justify-between h-14 md:h-16">
              
              {/* LEFT: BRAND IDENTITY */}
              <div className="flex items-center pl-6 pr-8 border-r border-white/5 h-full">
                 <a 
                    href="#" 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-3 group"
                 >
                    <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-display font-bold text-lg rounded-md group-hover:scale-90 transition-transform duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                       EM
                    </div>
                    <div className={`flex flex-col ${scrolled ? 'hidden md:flex' : 'flex'}`}>
                       <span className="font-display font-bold text-sm tracking-tight leading-none group-hover:text-silver-400 transition-colors">EDIDIONG MFON</span>
                       <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase leading-none mt-1">
                          v3.0 // {currentTime}
                       </span>
                    </div>
                 </a>
              </div>

              {/* CENTER: NAVIGATION LINKS (Desktop) */}
              <div className="hidden md:flex flex-1 items-center justify-center h-full px-4">
                 <ul className="flex items-center gap-1 bg-white/[0.02] rounded-full p-1 border border-white/5 shadow-inner">
                    {NAV_LINKS.map((link) => (
                       <li key={link.name}>
                          <a
                            href={link.href}
                            className="relative px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white hover:font-bold hover:bg-white/10 hover:shadow-sm hover:backdrop-blur-xl border border-transparent hover:border-white/5 transition-all duration-300 flex items-center gap-2 group"
                          >
                             <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-silver-500 transition-colors duration-300"></span>
                             {link.name}
                          </a>
                       </li>
                    ))}
                 </ul>
              </div>

              {/* RIGHT: ACTIONS */}
              <div className="flex items-center gap-4 pr-2 md:pr-4 pl-8 border-l border-white/5 h-full">
                 <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-silver-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-silver-500"></span>
                    </span>
                    <span className="hidden xl:inline">Available for hire</span>
                 </div>
                 
                 <a 
                    href="#contact"
                    className="hidden md:flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-silver-400 hover:text-black transition-all hover:scale-105 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                 >
                    <span>Connect</span>
                    <Zap size={14} className="fill-current" />
                 </a>

                 <button 
                    className="md:hidden p-3 hover:bg-white/10 rounded-full transition-colors"
                    onClick={() => setMobileMenuOpen(true)}
                 >
                    <Menu size={20} className="text-white" />
                 </button>
              </div>

           </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`
          fixed inset-0 z-[110] bg-neutral-950/95 backdrop-blur-xl text-white transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]
          ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
         <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none mix-blend-overlay"></div>
         
         <div className="relative flex flex-col h-full max-w-lg mx-auto border-x border-white/5 bg-black/50">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-display font-bold text-lg rounded-md">
                     EM
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest">Navigation</span>
               </div>
               <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 border border-white/10 rounded-full hover:bg-white hover:text-black transition-colors"
               >
                  <X size={20} />
               </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col justify-center px-8">
               {NAV_LINKS.map((link, idx) => (
                  <a 
                     key={link.name}
                     href={link.href}
                     onClick={() => setMobileMenuOpen(false)}
                     className="group flex items-center justify-between py-6 border-b border-white/5 hover:border-white transition-colors"
                  >
                     <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-neutral-500 group-hover:text-silver-400 transition-colors">0{idx + 1}</span>
                        <span className="text-4xl font-display font-bold uppercase group-hover:tracking-widest transition-all duration-300 group-hover:text-silver-400">
                           {link.name}
                        </span>
                     </div>
                     <ArrowUpRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-silver-400" />
                  </a>
               ))}
            </div>

            {/* Footer Info */}
            <div className="p-8 border-t border-white/5 bg-neutral-900/50">
               <div className="flex justify-between items-center mb-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Direct Line</p>
                  <a href="mailto:templareddy@gmail.com" className="font-display font-bold text-lg hover:text-silver-400 transition-colors">
                     templareddy@gmail.com
                  </a>
               </div>
               <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-silver-500">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-silver-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-silver-500"></span>
                      </span>
                      <span>System Online</span>
                   </div>
                   <span className="font-mono text-[10px] text-neutral-500">v3.0.0</span>
               </div>
            </div>
         </div>
      </div>
    </>
  );
};

export default Navbar;