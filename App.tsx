import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { useParallax } from './hooks/useParallax';
import { PROJECT_DATA, SKILLS_DATA, PROCESS_DATA, EXPERIMENTS_DATA, MASTERY_DATA, NAV_LINKS } from './constants';
import { Github, Linkedin, ArrowUpRight, ArrowRight, FlaskConical, Circle, Globe, Instagram, MessageCircle, ArrowUp, Download, ArrowDown, MousePointer2, Scan, Clock, MapPin, Radio, Terminal, Cpu, Layout, Lock, AlertCircle, CheckCircle, Printer, Network, Activity } from 'lucide-react';
import { Project } from './types';

// --- NEW ANIMATION COMPONENT ---
type RevealVariant = 'fade' | 'swipe-right' | 'swipe-up' | 'mask-reveal' | 'zoom' | '3d-flip' | 'paper-slide' | 'slot' | 'blur';

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  id?: string;
}

const Reveal: React.FC<RevealProps> = ({ children, variant = 'fade', delay = 0, className = '', id }) => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }); 

  const getStyles = () => {
    const baseTransition = `all 1000ms cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms`;

    switch (variant) {
      case 'swipe-right':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
          transition: baseTransition,
          willChange: 'transform, opacity'
        };
      case 'mask-reveal':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)', 
          transition: `all 1200ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
          willChange: 'transform, opacity'
        };
      case 'swipe-up':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: baseTransition,
          willChange: 'transform, opacity'
        };
      case 'zoom':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          filter: isVisible ? 'blur(0px)' : 'blur(5px)',
          transition: baseTransition,
          willChange: 'transform, opacity, filter'
        };
      case '3d-flip':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible 
            ? 'perspective(1000px) rotateX(0deg) translateY(0)' 
            : 'perspective(1000px) rotateX(45deg) translateY(50px)',
          transition: baseTransition,
          willChange: 'transform, opacity'
        };
      case 'paper-slide':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible 
            ? 'translateY(0) rotate(0deg)' 
            : 'translateY(100px) rotate(2deg)',
          transition: baseTransition,
          willChange: 'transform, opacity'
        };
      case 'blur':
        return {
          opacity: isVisible ? 1 : 0,
          filter: isVisible ? 'blur(0px)' : 'blur(10px)',
          transition: baseTransition,
          willChange: 'opacity, filter'
        };
      case 'slot':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
          transition: `all 800ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
          willChange: 'transform, opacity'
        };
      case 'fade':
      default:
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: baseTransition,
          willChange: 'transform, opacity'
        };
    }
  };

  return (
    <div 
      ref={elementRef} 
      id={id}
      className={`${className} ${variant === '3d-flip' ? 'transform-style-3d' : ''}`} 
      style={getStyles()}
    >
      {children}
    </div>
  );
};

// Typewriter Effect Component
const TypewriterEffect = ({ words, className }: { words: string[], className?: string }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(50);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = words[currentWordIndex];
      
      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(30);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(50);
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
        setTypingSpeed(1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setTypingSpeed(300);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, currentWordIndex, words, typingSpeed]);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse text-silver-500 ml-2">|</span>
    </span>
  );
};

// --- SCROLL PROGRESS COMPONENT ---
const ScrollProgress = () => {
    const [scrollWidth, setScrollWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setScrollWidth(scrollPercent);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 h-1 z-[200] bg-transparent w-full pointer-events-none">
            <div 
                className="h-full bg-silver-500 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(163,163,163,0.5)]"
                style={{ width: `${scrollWidth}%` }}
            ></div>
        </div>
    );
};

// --- LIVE CLOCK COMPONENT ---
const LiveClock = () => {
    const [time, setTime] = useState(new Date());
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit' });
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    const timeZone = time.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop();

    return (
        <div className="font-mono text-sm text-silver-400 flex items-center gap-1">
            <span>{hours}</span>
            <span className="animate-pulse">:</span>
            <span>{minutes}</span>
            <span className="animate-pulse">:</span>
            <span className="text-silver-500">{seconds}</span>
            <span className="text-[10px] ml-1 uppercase text-neutral-600 border border-neutral-800 px-1 rounded bg-black/50">{timeZone}</span>
        </div>
    );
};


// --- TOAST NOTIFICATION COMPONENT ---
interface ToastProps {
    message: string | null;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[150] animate-swipe-up">
            <div className="bg-neutral-900 border border-white/20 px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-md">
                <AlertCircle className="text-yellow-500 w-5 h-5" />
                <span className="text-sm font-mono text-white tracking-wide">{message}</span>
            </div>
        </div>
    );
};


// --- NEW TEXT-ONLY PROJECT CARD ---
interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: 'hero' | 'standard' | 'compact';
  className?: string;
  onProjectClick?: (project: Project) => void;
  theme?: 'dark' | 'light';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, variant = 'standard', className = '', onProjectClick, theme = 'dark' }) => {
  const displayIndex = String(index + 1).padStart(2, '0');
  const isHero = variant === 'hero';
  const isInDev = project.status === 'In Development';
  const isLight = theme === 'light';
  
  const handleClick = (e: React.MouseEvent) => {
    if (isInDev) {
        e.preventDefault();
        onProjectClick?.(project);
    }
  };

  // Theme-based Classes
  const bgClass = isLight 
    ? 'bg-white border-neutral-900/10 hover:bg-neutral-900 hover:text-white' 
    : 'bg-neutral-900/40 backdrop-blur-sm border-white/10 hover:bg-silver-100 hover:text-black';

  const separatorClass = isLight 
    ? 'border-neutral-900/10 group-hover:border-white/10' 
    : 'border-white/5 group-hover:border-black/5';

  return (
      <Reveal 
        variant={isHero ? "swipe-up" : "fade"} 
        className={`group relative flex flex-col justify-between border transition-all duration-500 overflow-hidden ${bgClass} ${className}`}
      >
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-current to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none -mr-20 -mt-20 blur-3xl rounded-full mix-blend-soft-light"></div>
         
         {/* Status Badge for In Dev */}
         {isInDev && (
            <div className="absolute top-4 right-4 z-30">
                <div className="bg-yellow-500/90 backdrop-blur-md text-black px-3 py-1.5 rounded-full shadow-lg border border-yellow-400/50 flex items-center gap-2 transition-transform duration-300 hover:scale-105 cursor-help">
                    <Clock size={12} className="animate-spin-slow" />
                    <span className="text-[10px] font-bold font-mono uppercase tracking-widest">In Development</span>
                </div>
            </div>
         )}

         {/* Top Meta: ID & Subtitle */}
         <div className={`relative z-10 w-full flex justify-between items-start p-6 md:p-8 border-b ${separatorClass} transition-colors`}>
            <div className="flex flex-col gap-1">
               <span className="font-mono text-xs tracking-widest uppercase opacity-60">
                  // {displayIndex}
               </span>
               <span className="font-display font-bold text-sm uppercase tracking-wider opacity-80">
                  {project.subtitle}
               </span>
            </div>
            {/* Animated Icon */}
            <div className={`w-10 h-10 border border-current rounded-full flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all duration-500 ${isInDev ? 'group-hover:rotate-0' : 'group-hover:rotate-45'}`}>
               {isInDev ? <Lock size={16} /> : <ArrowUpRight size={18} />}
            </div>
         </div>

         {/* Center: Title & Description */}
         <div className={`relative z-10 flex-1 p-6 md:p-8 flex flex-col ${isHero ? 'justify-end' : 'justify-center'}`}>
            <h3 
                className={`font-display font-black uppercase leading-[0.85] tracking-tighter mb-6 transition-transform duration-500 group-hover:translate-x-2 ${
                    isHero ? 'text-[12vw] md:text-[8vw]' : 'text-5xl md:text-6xl lg:text-7xl'
                } ${isInDev ? 'opacity-80' : 'opacity-100'}`}
            >
               {project.title}
            </h3>
            
            <div className={`flex flex-col gap-4 ${isHero ? 'md:flex-row md:items-end md:justify-between' : ''}`}>
                <p className={`font-serif leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity max-w-xl ${isHero ? 'text-xl md:text-2xl' : 'text-sm md:text-base'}`}>
                   <span className="font-bold mr-2 opacity-100">Brief:</span>
                   {project.description}
                </p>
                {isHero && !isInDev && (
                    <span className="hidden md:block font-mono text-xs uppercase tracking-widest opacity-40 group-hover:opacity-100 whitespace-nowrap">
                       — Read Case Study
                    </span>
                )}
            </div>
         </div>

         {/* Bottom: Tech Stack */}
         <div className={`relative z-10 p-6 md:p-8 border-t ${separatorClass} transition-colors`}>
             <div className="flex flex-wrap gap-2 md:gap-3">
                 {project.techStack.map((tech, i) => (
                     <div key={tech} className="flex items-center gap-2">
                        {i > 0 && <span className="opacity-30">/</span>}
                        <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider opacity-60 group-hover:opacity-100 group-hover:font-bold">
                            {tech}
                        </span>
                     </div>
                 ))}
             </div>
         </div>

         {/* Full Card Link with Logic */}
         <a 
            href={project.link} 
            target={isInDev ? undefined : "_blank"} 
            rel={isInDev ? undefined : "noopener noreferrer"}
            onClick={handleClick}
            className={`absolute inset-0 z-20 ${isInDev ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            aria-label={`View project: ${project.title}`}
         ></a>
      </Reveal>
  );
};

// Marquee Component
const TechMarquee = () => {
  const allSkills = SKILLS_DATA.flatMap(category => category.items);
  const items = [...allSkills, ...allSkills, ...allSkills, ...allSkills];
  const itemsReverse = [...items].reverse();

  return (
    <Reveal variant="zoom" className="w-full">
      <div 
        className="w-full border-y border-white/5 py-10 my-20 bg-black relative overflow-hidden flex flex-col gap-6"
        role="region"
        aria-label="Technologies and Skills Marquee"
      >
        <div className="absolute inset-0 bg-noise opacity-[0.05]"></div>
        
        <div className="mask-gradient w-full overflow-hidden group">
          <div 
            className="flex w-max animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]"
            style={{ animationDuration: '60s', willChange: 'transform' }}
            aria-hidden="true"
          >
            {items.map((skill, i) => (
              <span key={`fwd-${i}`} className="text-4xl md:text-7xl font-display font-bold px-12 text-neutral-800 group-hover:text-silver-500 uppercase select-none transition-colors duration-500">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mask-gradient w-full overflow-hidden group">
          <div 
            className="flex w-max animate-marquee-reverse whitespace-nowrap group-hover:[animation-play-state:paused]"
            style={{ animationDuration: '45s', willChange: 'transform' }}
            aria-hidden="true"
          >
            {itemsReverse.map((skill, i) => (
              <span key={`rev-${i}`} className="text-4xl md:text-7xl font-display font-bold px-12 text-neutral-800 group-hover:text-silver-500 uppercase select-none transition-colors duration-500">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

const App: React.FC = () => {
  // Parallax hooks
  const heroTitleOffset = useParallax(0.25); 
  const heroTextOffset = useParallax(0.5); 
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const textParallaxStyle = {
    transform: `translateY(${heroTextOffset}px) scale(${Math.max(0.9, 1 - heroTextOffset * 0.0005)})`,
    opacity: Math.max(0, 1 - heroTextOffset * 0.0025),
    filter: `blur(${Math.min(10, heroTextOffset * 0.02)}px)`,
    willChange: 'transform, opacity, filter',
    transition: 'transform 0.1s linear, opacity 0.1s linear, filter 0.1s linear'
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjectClick = (project: Project) => {
    if (project.status === 'In Development') {
        setToastMessage(`" ${project.title} " is currently in the lab. Check back soon.`);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-silver-500 selection:text-black bg-neutral-950 text-white overflow-x-hidden relative">
      <ScrollProgress />
      <Background />
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      
      {/* GLOBAL EDITORIAL GRID LINES */}
      <div className="fixed inset-0 pointer-events-none z-0 max-w-[1800px] mx-auto px-4 sm:px-8 flex justify-between opacity-5">
         <div className="w-px h-full bg-white"></div>
         <div className="w-px h-full bg-white hidden md:block"></div>
         <div className="w-px h-full bg-white hidden lg:block"></div>
         <div className="w-px h-full bg-white"></div>
      </div>
      
      {/* CENTRALIZED MASTHEAD HEADER */}
      <header className="w-full flex justify-center py-12 border-b border-white/5 relative z-50 bg-black/50 backdrop-blur-sm px-4">
        <div className="text-center">
            <h1 className="font-display font-bold text-5xl md:text-8xl lg:text-9xl tracking-tighter uppercase leading-none mb-4 text-white">
                Edidiong Mfon
            </h1>
            <div className="flex items-center justify-center gap-4 md:gap-8 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-neutral-500">
                <span>Frontend Engineer</span>
                <span className="w-1 h-1 bg-neutral-700 rounded-full"></span>
                <span>Portfolio Vol. III</span>
                <span className="w-1 h-1 bg-neutral-700 rounded-full"></span>
                <span>2025</span>
            </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section 
        className="min-h-[75vh] flex flex-col justify-start pt-24 pb-12 px-4 sm:px-8 max-w-[1800px] mx-auto relative z-20"
        aria-label="Hero Section"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full relative z-30 flex-1">
          <div className="flex flex-col justify-end pb-20">
             <div 
                className="mb-8 origin-bottom-left"
                style={textParallaxStyle}
             >
                {/* Staggered Badge - Silver Pulse */}
                <div className="flex items-center gap-3 mb-6 animate-reveal opacity-0" style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
                  <div className="w-2 h-2 bg-silver-500 rounded-full animate-pulse" aria-hidden="true"></div>
                  <span className="text-xs font-mono tracking-[0.2em] text-neutral-400 uppercase">Status: Available</span>
                </div>
                
                {/* Staggered Text */}
                <div className="overflow-hidden">
                    <h2 
                        className="text-2xl md:text-4xl text-neutral-200 font-light max-w-xl leading-[1.1] animate-reveal opacity-0" 
                        style={{ 
                            animationDelay: '300ms', 
                            animationFillMode: 'forwards',
                        }}
                    >
                      Crafting digital experiences with precision, soul, and high-performance engineering.
                    </h2>
                </div>
             </div>
          </div>
          <div className="flex flex-col justify-end items-end text-right pb-20">
             <div className="animate-reveal [animation-delay:600ms] opacity-0 flex flex-col items-end gap-4" style={{ animationFillMode: 'forwards' }}>
                <a 
                  href="#contact" 
                  className="group relative z-50 flex items-center gap-6 text-white hover:text-silver-400 transition-colors cursor-pointer"
                  aria-label="Scroll to contact section"
                >
                  <span className="text-xs font-mono uppercase tracking-[0.2em] hidden md:block group-hover:tracking-[0.3em] transition-all duration-300">Initiate Protocol</span>
                  <div className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center bg-transparent group-hover:bg-silver-500 group-hover:border-silver-500 group-hover:text-black transition-all duration-500 animate-glow-pulse">
                     <ArrowRight size={24} className="group-hover:-rotate-45 transition-transform duration-300" />
                  </div>
                </a>
             </div>
          </div>
        </div>

        <div className="animate-reveal [animation-delay:800ms] opacity-0 relative z-0 mt-auto">
          {/* Bottom decorative title with Typewriter */}
          <div 
            className="text-[8vw] leading-[0.75] font-display font-bold tracking-tighter text-white/5 mix-blend-overlay break-words -ml-1 select-none uppercase"
            style={{ transform: `translateY(${heroTitleOffset}px)`, willChange: 'transform' }}
          >
             <TypewriterEffect words={["FRONTEND ENGINEER", "FRONTEND DESIGNER", "UI/UX DESIGNER"]} />
          </div>
        </div>
      </section>

      {/* About Section - Editorial Layout with Halftone & Serif */}
      <Reveal id="about" className="relative px-4 sm:px-8 max-w-[1800px] mx-auto mb-24 pt-16 border-t border-white/10" variant="fade">
        {/* Newspaper Halftone Texture - Increased Opacity */}
        <div className="absolute inset-0 bg-halftone opacity-[0.15] pointer-events-none mix-blend-overlay"></div>
        
        {/* Subtle Radial Gradient Texture for Magazine Feel */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,212,212,0.1),_transparent_70%)] pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-4 border-r border-white/10 pr-8 hidden lg:block">
              <Reveal variant="swipe-right" delay={100}>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-32">(001) The Vision</span>
              </Reveal>
              <div className="h-px w-full bg-white/10 mb-8"></div>
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wide leading-relaxed">
                 Bridging the gap between brutalist aesthetics and functional engineering.
              </p>
           </div>
           
           <div className="lg:col-span-8 lg:pl-8">
              <div className="overflow-hidden">
                 <Reveal variant="mask-reveal" delay={200}>
                    <h2 className="text-[6vw] lg:text-[4vw] leading-none font-display font-bold uppercase text-white mb-6">
                      Engineering<br/>Motion
                    </h2>
                 </Reveal>
              </div>
              
              <div className="columns-1 md:columns-2 gap-8">
                 <Reveal variant="blur" delay={300}>
                   {/* CHANGED: Font serif for editorial body text */}
                   <p className="text-lg md:text-xl leading-relaxed font-serif text-neutral-400 mb-8 first-letter:float-left first-letter:text-7xl first-letter:font-display font-letter:font-bold first-letter:mr-3 first-letter:text-white first-letter:leading-[0.8] text-justify border-b border-white/5 pb-8">
                      I don't just write code; I engineer motion, interactivity, and accessibility into a unified digital language. My work sits at the intersection of brutalist aesthetics and high-performance engineering. With a deep foundation in computer science and a passion for visual arts, I bridge the gap between design and development.
                   </p>
                 </Reveal>
                 <Reveal variant="blur" delay={400}>
                   <p className="text-lg md:text-xl leading-relaxed font-serif text-neutral-400 mb-8 text-justify">
                      I specialize in the React ecosystem, but my curiosity leads me to explore WebGL, Rust, and AI agents. The web is a canvas that breathes. I believe in interfaces that react to the user, providing feedback that feels natural and organic. Performance is not an afterthought; it is the foundation of user experience.
                   </p>
                 </Reveal>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex gap-8">
                 <Reveal variant="slot" delay={500} className="flex gap-8">
                    <div className="flex items-center gap-2">
                        <Circle size={8} className="fill-silver-500 text-silver-500" />
                        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">React Ecosystem</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Circle size={8} className="fill-silver-500 text-silver-500" />
                        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">WebGL / 3D</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Circle size={8} className="fill-silver-500 text-silver-500" />
                        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">System Architecture</span>
                    </div>
                 </Reveal>
              </div>
           </div>
        </div>
      </Reveal>

      {/* --- SELECTED WORKS (DEEP COOL GREY BACKGROUND) --- */}
      <div className="w-full bg-zinc-900 text-white py-32 relative z-20">
          <section id="work" className="px-4 sm:px-8 max-w-[1800px] mx-auto">
            <Reveal variant="swipe-right" className="mb-12 flex items-end justify-between border-b border-white/10 pb-6">
               <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2 block">Exclusive Index</span>
                  <h2 className="text-[10vw] md:text-[8vw] leading-[0.8] font-display font-black uppercase text-white tracking-tighter">
                    Selected<br/>Works
                  </h2>
               </div>
               <div className="hidden md:flex flex-col items-end text-right">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Live Deployments</span>
                 </div>
                 <span className="font-serif italic text-neutral-500">Vol. III — Edition 2025</span>
               </div>
            </Reveal>

            {/* BRUTALIST GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 border-x border-white/10">
               
               {/* 1. HERO FEATURE (Full Width) */}
               <div className="lg:col-span-12 border-b border-white/10">
                   <ProjectCard project={PROJECT_DATA[0]} index={0} variant="hero" className="min-h-[60vh]" onProjectClick={handleProjectClick} theme="dark" />
               </div>

               {/* 2. THREE COLUMN ROW */}
               <div className="lg:col-span-4 border-b md:border-r border-white/10">
                   <ProjectCard project={PROJECT_DATA[1]} index={1} variant="standard" className="h-full min-h-[400px]" onProjectClick={handleProjectClick} theme="dark" />
               </div>
               <div className="lg:col-span-4 border-b md:border-r border-white/10">
                   <ProjectCard project={PROJECT_DATA[2]} index={2} variant="standard" className="h-full min-h-[400px]" onProjectClick={handleProjectClick} theme="dark" />
               </div>
               <div className="lg:col-span-4 border-b border-white/10">
                   <ProjectCard project={PROJECT_DATA[3]} index={3} variant="standard" className="h-full min-h-[400px]" onProjectClick={handleProjectClick} theme="dark" />
               </div>

               {/* 3. ASYMMETRIC BOTTOM ROW */}
               <div className="lg:col-span-7 border-b md:border-r border-white/10">
                   <ProjectCard project={PROJECT_DATA[4]} index={4} variant="hero" className="h-full min-h-[400px]" onProjectClick={handleProjectClick} theme="dark" />
               </div>
               <div className="lg:col-span-5 border-b border-white/10">
                   <ProjectCard project={PROJECT_DATA[5]} index={5} variant="standard" className="h-full min-h-[400px]" onProjectClick={handleProjectClick} theme="dark" />
               </div>

            </div>
            
            {/* FOOTER OF SECTION */}
            <div className="flex justify-between items-center py-4 border-b border-white/10">
               <span className="font-mono text-[10px] text-neutral-500 uppercase">End of Section</span>
               <div className="h-px flex-1 bg-white/10 mx-4"></div>
               <span className="font-mono text-[10px] text-neutral-500 uppercase">Page 04</span>
            </div>
          </section>
      </div>

      {/* Marquee Separator */}
      <TechMarquee />

      {/* The Laboratory - Technical Journal Grid */}
      <Reveal id="lab" className="relative px-4 sm:px-8 max-w-[1800px] mx-auto mb-24" variant="fade">
        {/* Technical Grid Texture for R&D Feel - Enhanced */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none mask-vertical-fade opacity-80"></div>
        {/* Fine Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-plus-lighter"></div>
        {/* Added Halftone Patch */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-halftone opacity-[0.1] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-end justify-between mb-8 border-b-2 border-white pb-6">
            <h2 className="text-[6vw] leading-none font-display font-bold uppercase text-white">The Lab</h2>
            <div className="hidden md:flex items-center gap-2 text-xl font-mono text-white">
                <FlaskConical className="animate-pulse text-silver-500" aria-hidden="true" />
                <span>Side Projects / WIP</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-white/10 bg-black/50 backdrop-blur-sm">
            {EXPERIMENTS_DATA.map((exp, i) => (
              <Reveal key={exp.id} variant="zoom" delay={i * 100} className="border-r border-b border-white/10">
                <div 
                    className="group p-8 flex flex-col hover:bg-white hover:text-black hover:shadow-lg transition-all duration-500 h-full justify-between min-h-[250px]"
                >
                  <div>
                      <div className="flex justify-between items-start mb-8">
                          <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 border border-current px-2 py-0.5 rounded-full text-neutral-400 group-hover:text-black">
                              {exp.type}
                          </span>
                          <span className="font-mono text-xs opacity-40 text-neutral-500 group-hover:text-silver-600">0{i+1}</span>
                      </div>
                      
                      <h3 className="text-2xl font-display font-bold mb-4 leading-tight group-hover:translate-x-1 transition-transform text-white group-hover:text-black">
                          {exp.title}
                      </h3>
                      
                      {/* CHANGED: Serif font for description */}
                      <p className="text-sm font-serif leading-relaxed opacity-70 mb-8 text-neutral-400 group-hover:text-neutral-800">
                          {exp.description}
                      </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 group-hover:border-black/10">
                      {exp.tech.map((t) => (
                          <span key={t} className="text-[10px] font-mono uppercase tracking-wider opacity-60 text-neutral-500 group-hover:text-silver-600">
                              {t}
                          </span>
                      ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Tech Stack Mastery - FIXED VISIBILITY (Removed nested scroll, now responsive grid) */}
      <section id="services" className="px-4 sm:px-8 max-w-[1800px] mx-auto mb-24 border-t border-white/10 pt-16">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Static Left Side */}
          <div className="lg:w-5/12 sticky top-32 h-fit self-start mb-12 lg:mb-0">
             <Reveal variant="swipe-right">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4 block">(004) Arsenal</span>
             </Reveal>
             <Reveal variant="mask-reveal" delay={200}>
               <h2 className="text-6xl md:text-8xl font-display font-bold mb-8 uppercase leading-none text-white">
                 Tech<br />Stack
               </h2>
             </Reveal>
             <Reveal variant="zoom" delay={400}>
               <p className="text-xl text-neutral-400 leading-relaxed max-w-md mb-8">
                 My toolkit is built for speed, scale, and maintainability. This isn't just a list of keywords—it's my daily arsenal.
               </p>
             </Reveal>
             <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm font-mono text-neutral-500">
                    <Globe size={16} aria-hidden="true" />
                    <span>Remote Capable</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-mono text-neutral-500">
                    <Circle size={16} className="text-silver-500 fill-silver-500" aria-hidden="true" />
                    <span>Available Now</span>
                </div>
             </div>
          </div>

          {/* Right Side - Expanded Grid for Better Visibility */}
          <div className="lg:w-7/12 border-l border-white/10 pl-0 lg:pl-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {MASTERY_DATA.map((item, idx) => (
                  <Reveal key={item.id} variant="fade" delay={idx * 50} className="group">
                     <div className="flex flex-col gap-4">
                        <span className="font-mono text-xs text-neutral-600 border-b border-white/5 pb-2 w-full block group-hover:text-silver-500 transition-colors">
                            {String(idx + 1).padStart(2, '0')} // {item.title}
                        </span>
                        <h3 className="text-2xl font-bold text-white group-hover:text-silver-400 transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-neutral-500 leading-relaxed text-sm">
                            {item.description}
                        </p>
                     </div>
                  </Reveal>
                ))}
              </div>
          </div>
        </div>
      </section>

      {/* Summarized Curriculum Vitae (CV) Section - DEEP COOL GREY BACKGROUND */}
      <div className="w-full bg-zinc-900 text-white py-32 relative z-20">
          <Reveal id="cv" variant="paper-slide" className="px-4 sm:px-8 max-w-[1800px] mx-auto">
            <div className="bg-black text-white p-6 md:p-10 relative overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border border-white/10">
               <div className="absolute top-0 left-0 w-full h-2 bg-white"></div>
               <div className="absolute top-8 right-8 text-xs font-mono uppercase tracking-widest text-neutral-500 border border-neutral-700 px-2 py-1">
                  Ref: CV-2025
               </div>

               <div className="flex flex-col lg:flex-row justify-between items-start mb-8 gap-8 border-b-2 border-white pb-8">
                  <div>
                     <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight mb-2">
                        EDIDIONG E. MFON
                     </h2>
                     <p className="font-mono text-sm uppercase tracking-widest text-neutral-400 mb-2">
                        Software Engineer
                     </p>
                     <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-500">
                        <span className="flex items-center gap-2"><MapPin size={12}/> Eket, Akwa Ibom, Nigeria</span>
                        <span className="flex items-center gap-2"><MessageCircle size={12}/> +234-8078391769</span>
                        <span className="flex items-center gap-2"><MousePointer2 size={12}/> templareddy@gmail.com</span>
                     </div>
                  </div>
                  <button 
                     onClick={() => window.print()}
                     className="group flex items-center gap-3 bg-white text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-silver-500 transition-colors"
                     aria-label="Print or Save Resume as PDF"
                  >
                     <span>Print / Save PDF</span>
                     <Printer size={18} className="group-hover:translate-y-1 transition-transform" />
                  </button>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Left Column: Bio & Skills */}
                  <div className="lg:col-span-4">
                     <h3 className="font-display font-bold text-lg uppercase mb-4 text-silver-400">About Me</h3>
                     <p className="text-neutral-400 mb-8 leading-relaxed font-serif text-sm text-justify">
                        Results-driven Software Engineer skilled in Python, JavaScript, React, and web application development. Experienced in delivering efficient solutions, collaborating in teams, and leveraging technology to solve complex problems, optimize processes, and drive business growth.
                     </p>
                     
                     <h3 className="font-display font-bold text-lg uppercase mb-4 text-silver-400">Technical Skills</h3>
                     <div className="flex flex-wrap gap-2 mb-8">
                        {['React', 'Node.js', 'Next.js', 'Python', 'SQL', 'Git', 'RESTful APIs', 'Figma', 'CI/CD', 'AI Integration', 'Performance Tuning', 'UX Research'].map(skill => (
                            <span key={skill} className="px-2 py-1 border border-neutral-700 text-xs font-mono uppercase text-neutral-400 hover:border-silver-500 hover:text-silver-400 transition-colors">
                                {skill}
                            </span>
                        ))}
                     </div>

                     <h3 className="font-display font-bold text-lg uppercase mb-4 text-silver-400">Soft Skills</h3>
                     <ul className="text-sm text-neutral-400 list-disc list-inside space-y-1 font-serif">
                        <li>Problem-Solving</li>
                        <li>Adaptability</li>
                        <li>Communication</li>
                        <li>Teamwork</li>
                     </ul>
                  </div>

                  {/* Right Column: Experience Table */}
                  <div className="lg:col-span-8">
                     <h3 className="font-display font-bold text-lg uppercase mb-6 text-silver-400">Work Experience</h3>
                     
                     <div className="space-y-6">
                        <div className="border-b border-neutral-800 pb-6">
                            <div className="flex justify-between items-baseline mb-2">
                                <span className="font-bold text-white text-lg">Full Stack Developer Intern</span>
                                <span className="font-mono text-xs text-neutral-500">2024 - 2025</span>
                            </div>
                            <div className="flex justify-between items-baseline mb-4">
                                <span className="font-serif text-sm text-silver-400 italic">Saiket Systems</span>
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed text-justify">
                                Worked as a Full-Stack Developer intern, developing and maintaining web applications used in the agency using React, Node.js, and MySQL. Collaborated with the team to implement new features, fix bugs, optimize application performance, and improve user experience.
                            </p>
                        </div>
                        
                        <div className="border-b border-neutral-800 pb-6">
                            <div className="flex justify-between items-baseline mb-2">
                                <span className="font-bold text-white text-lg">Volunteer Full Stack Developer</span>
                                <span className="font-mono text-xs text-neutral-500">2023 - 2025</span>
                            </div>
                            <div className="flex justify-between items-baseline mb-4">
                                <span className="font-serif text-sm text-silver-400 italic">Go with Fund.org</span>
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed text-justify">
                                Served as a Full-Stack Developer, improving the website’s UI for better user experience, assisting in the CI/CD pipeline to streamline deployment, and contributing to database design and optimization to enhance performance and reliability.
                            </p>
                        </div>
                     </div>

                     <div className="mt-8 pt-4">
                         <h3 className="font-display font-bold text-lg uppercase mb-6 text-silver-400">Education</h3>
                         <div className="border-l-2 border-white/20 pl-4">
                             <div className="flex justify-between items-baseline mb-1">
                                 <span className="font-bold text-white">Computer Science Under-Graduate</span>
                                 <span className="font-mono text-xs text-neutral-500">2024 - 2028</span>
                             </div>
                             <div className="mb-2">
                                 <span className="font-serif text-sm text-silver-400 italic">Covenant University</span>
                             </div>
                             <p className="text-xs text-neutral-500 leading-relaxed text-justify">
                                 Completed one year in Industrial Mathematics before transitioning to Computer Science. Built strong analytical skills and hands-on experience in programming, algorithms, and software development.
                             </p>
                         </div>
                     </div>
                  </div>
               </div>
            </div>
          </Reveal>
      </div>

      {/* NEW: How I Work Header */}
      <Reveal className="px-4 sm:px-8 max-w-[1800px] mx-auto mt-24 mb-8" variant="swipe-right">
         <h2 className="text-[8vw] leading-none font-display font-bold uppercase text-white">How I Work</h2>
      </Reveal>

      {/* Methodology - Slot Machine Reveal */}
      <section id="process" className="mb-24 bg-black text-white py-16 px-4 sm:px-8 border-y border-white/10">
         <div className="max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8" role="list">
              {PROCESS_DATA.map((step, idx) => (
                <div key={step.id} className="group relative overflow-hidden" role="listitem">
                  <Reveal variant="slot" delay={idx * 150}>
                    <div className="text-9xl font-display font-bold text-neutral-800 group-hover:text-silver-500 transition-colors duration-500 mb-8 select-none" aria-hidden="true">
                      {step.number}
                    </div>
                  </Reveal>
                  <Reveal variant="fade" delay={idx * 150 + 200}>
                    <h3 className="text-2xl font-bold mb-4 flex items-baseline gap-2 text-white">
                      <span className="text-sm font-mono opacity-50 sr-only">Step {step.number}:</span>
                      {step.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">{step.description}</p>
                    
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300 text-silver-500" aria-hidden="true">
                       <ArrowRight className="transform -rotate-45" size={32} />
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Contact Section - Bold Editorial Back-Cover Style */}
      <section id="contact" className="relative px-4 sm:px-8 py-20 max-w-[1800px] mx-auto min-h-[50vh] flex flex-col justify-end z-10 border-t-4 border-white">
         {/* Subtle Vignette Gradient for Contact Footer */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-silver-900/10 to-silver-800/20 pointer-events-none"></div>
         
         {/* Texture Overlay for Contact - Increased visibility */}
         <div className="absolute inset-0 bg-halftone opacity-[0.08] pointer-events-none"></div>

         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
             <div className="flex flex-col justify-start"> {/* CHANGED: Removed gap-12 to tighten spacing */}
                 <Reveal variant="swipe-right">
                     <div>
                         <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4 block">
                             (006) Correspondence
                         </span>
                         <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold uppercase leading-none tracking-tighter mb-2 text-white"> {/* Changed mb-4 to mb-6 */}
                             Get<br/>In Touch
                         </h2>
                     </div>
                 </Reveal>
                 
                 {/* Quote */}
                 <Reveal variant="zoom" delay={300} className="pl-4 border-l-2 border-silver-500 mt-4">
                     <p className="font-serif text-xl md:text-2xl italic text-neutral-400 max-w-sm">
                         "Design is intelligence made visible." <br/> <span className="text-sm not-italic mt-2 block text-neutral-500 font-mono tracking-widest uppercase">— Alina Wheeler</span>
                     </p>
                 </Reveal>

                 {/* NEW: Studio Information Panel to Fill Empty Space */}
                 <Reveal variant="fade" delay={400} className="mt-12 md:mt-24 max-w-sm">
                    <div className="border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 relative overflow-hidden group hover:border-white/20 transition-colors duration-500">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-silver-500/10 rounded-full blur-2xl group-hover:bg-silver-500/20 transition-colors"></div>
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">Studio Status: Online</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                           <div className="flex flex-col gap-1">
                               <div className="flex items-center gap-2 text-neutral-500 mb-1">
                                   <MapPin size={12} />
                                   <span className="font-mono text-[9px] uppercase tracking-widest">Base</span>
                               </div>
                               <span className="font-display font-bold text-lg">Eket, NG</span>
                           </div>
                           
                           <div className="flex flex-col gap-1">
                               <div className="flex items-center gap-2 text-neutral-500 mb-1">
                                   <Clock size={12} />
                                   <span className="font-mono text-[9px] uppercase tracking-widest">Local Time</span>
                               </div>
                               <LiveClock />
                           </div>

                           <div className="flex flex-col gap-1 col-span-2 pt-4 border-t border-white/5">
                               <div className="flex items-center gap-2 text-neutral-500 mb-1">
                                   <Radio size={12} />
                                   <span className="font-mono text-[9px] uppercase tracking-widest">Current Focus</span>
                               </div>
                               <span className="font-serif italic text-neutral-400">"Exploring generative UI systems and WebGL interactions."</span>
                           </div>
                        </div>
                    </div>
                 </Reveal>
             </div>

             <div className="flex flex-col justify-end items-start lg:items-end">
                 {/* FIXED: Changed from 'mask-reveal' to 'swipe-up' to prevent text clipping issues on some devices */}
                 <Reveal variant="swipe-up" delay={200}>
                    <a 
                      href="mailto:templareddy@gmail.com" 
                      className="group relative inline-block mb-12"
                    >
                      <div className="relative z-10 border border-white/10 bg-black/50 backdrop-blur-sm px-8 py-6 rounded-lg overflow-hidden transition-all duration-500 hover:bg-white hover:border-white">
                         <span className="font-display font-bold text-2xl md:text-4xl text-white group-hover:text-black transition-colors break-all">
                             templareddy@gmail.com
                         </span>
                         
                         {/* Shine Effect */}
                         <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-silver-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                      </div>
                    </a>
                 </Reveal>

                 {/* --- REVAMPED SOCIAL ICONS GRID --- */}
                 <div className="w-full mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {[
                         { name: 'Github', url: 'https://github.com/eddy-mfon', icon: Github, detail: '/EDDY-MFON' },
                         { name: 'LinkedIn', url: 'https://linkedin.com/in/edidiong-mfon', icon: Linkedin, detail: '/IN/EDIDIONG' },
                         { name: 'Instagram', url: 'https://instagram.com/templareddy', icon: Instagram, detail: '@TEMPLAREDDY' },
                         { name: 'WhatsApp', url: 'https://wa.me/2348078391769', icon: MessageCircle, detail: '+234-8078391769' }
                     ].map((social, idx) => (
                         <Reveal key={social.name} variant="zoom" delay={idx * 100} className="w-full">
                           <a 
                               href={social.url}
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="group relative flex flex-col justify-between p-6 h-48 border border-white/10 bg-black/40 hover:bg-white hover:text-black transition-all duration-500 overflow-hidden"
                           >
                               {/* Hover Background Accent - Silver Tint */}
                               <div className="absolute inset-0 bg-silver-500/0 group-hover:bg-silver-50/10 transition-colors duration-500"></div>
                               
                               {/* Top Row: Icon & Metadata */}
                               <div className="relative z-10 flex justify-between items-start">
                                  <div className="p-3 bg-white/5 rounded-none border border-white/10 group-hover:border-black/10 group-hover:bg-black/5 transition-colors text-white group-hover:text-black">
                                     <social.icon size={24} strokeWidth={1.5} />
                                  </div>
                                  <div className="flex flex-col items-end">
                                      <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 group-hover:text-neutral-400">
                                        LNK_0{idx + 1}
                                      </span>
                                      <div className="w-12 h-px bg-current mt-2 opacity-20"></div>
                                  </div>
                               </div>

                               {/* Bottom Row: Name & Handle */}
                               <div className="relative z-10">
                                  <h4 className="font-display font-bold text-2xl uppercase mb-2 tracking-tight group-hover:tracking-wide transition-all">
                                    {social.name}
                                  </h4>
                                  <div className="flex items-center justify-between pt-4 border-t border-white/10 group-hover:border-black/10 transition-colors">
                                     <span className="font-mono text-xs text-neutral-500 group-hover:text-neutral-600 truncate mr-4 tracking-wider">
                                       {social.detail}
                                     </span>
                                     <ArrowUpRight size={18} className="text-silver-500 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                                  </div>
                               </div>
                           </a>
                         </Reveal>
                     ))}
                 </div>

             </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay"></div>
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
           <div className="text-center md:text-left">
              <span className="font-display font-bold text-xl text-white block mb-2">EDIDIONG MFON</span>
              <p className="text-neutral-500 text-xs font-mono">
                ENGINEERING PORTFOLIO {new Date().getFullYear()} // v3.0
              </p>
           </div>

           <div className="flex flex-col md:flex-row items-center gap-8">
              <nav className="flex gap-8">
                 {NAV_LINKS.map(link => (
                    <a key={link.name} href={link.href} className="text-xs font-mono uppercase text-neutral-500 hover:text-silver-400 transition-colors">
                       {link.name}
                    </a>
                 ))}
              </nav>
              
              <button 
                onClick={scrollToTop}
                className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all group"
                aria-label="Back to Top"
              >
                 <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
              </button>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;